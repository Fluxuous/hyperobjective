'use server'

import {
  ReActAgent,
  Document,
  QueryEngineTool,
  VectorStoreIndex,
  Settings,
  LLMEndEvent,
} from 'llamaindex'
import { log } from '@logtail/next'

import {
  postTweetFT,
  searchTweetsFT,
  getTwitterAccountStatusFT,
} from '@/lib/marketplace/twitter'
import {
  getShopifyStatusFT,
  getShopifyShopFT,
  getShopifyAnalyticsFT,
} from '@/lib/marketplace/shopify'
import {
  getPrintifyStatusFT,
  createAndPublishPrintifyTeeFT,
} from '@/lib/marketplace/printify'
import { getBingSearchFT } from '@/lib/marketplace/bing'
import { routeLlm } from '@/lib/ai/router'
import { traceChat } from '@/lib/helpers'
import { generateObjectiveAgentTaskPrompt } from '@/lib/ai/generators/project'
import { createBlob, getBlob, deleteBlob } from '@/lib/vendor/vercel'
import { AgentContext, Task } from '@/lib/types'
import { maybeRateLimitError } from '@/lib/vendor/stripe'

const verbose = false

const getPreviousOutput = async (
  runContext: AgentContext
): Promise<{ previousOutput: string; previousOutputUrl: string }> => {
  if (runContext.taskStep === 0) {
    return { previousOutput: '', previousOutputUrl: '' }
  } else {
    const previousOutputUrl = runContext.run.outputUrl
    const previousOutput = await getBlob(previousOutputUrl)
    return { previousOutput, previousOutputUrl }
  }
}

export async function runObjectiveAgent(
  agentContext: AgentContext
): Promise<AgentContext | null | { error: string }> {
  // TODO: Clean this up
  const error = await maybeRateLimitError(agentContext.objective.userId)
  if (error) {
    return { error }
  }

  const { previousOutput, previousOutputUrl } =
    await getPreviousOutput(agentContext)
  const vectorIndex = await VectorStoreIndex.fromDocuments([
    new Document({
      text: JSON.stringify({ context: agentContext, output: previousOutput }),
    }),
  ])

  const queryEngineTool = new QueryEngineTool({
    queryEngine: vectorIndex.asQueryEngine(),
    metadata: {
      name: 'project_objective_agent_run_context_query_engine',
      description:
        'A query engine for the current project objective agent run context and output',
    },
  })

  const { llm, costPerMInputToken, costPerMOutputToken } = await routeLlm({
    skill: 'tools',
    content: '',
    modelUri: 'LlamaIndex:OpenAI:gpt-4o',
  })

  Settings.callbackManager.on('llm-end', async (event: LLMEndEvent) => {
    await traceChat(
      event,
      agentContext.objective.userId,
      agentContext.billingAccount.stripeSubscriptionId ?? '',
      [],
      costPerMInputToken,
      costPerMOutputToken,
      agentContext.run.projectId,
      agentContext.objective.id,
      agentContext.run.id
    )
  })

  // TODO: Enforce API limits

  const agent = new ReActAgent({
    llm,
    tools: [
      queryEngineTool,
      await getBingSearchFT(),
      await getShopifyShopFT(),
      await searchTweetsFT(),
      await getTwitterAccountStatusFT(),
      await postTweetFT(),
      await getShopifyStatusFT(),
      await getPrintifyStatusFT(),
      await createAndPublishPrintifyTeeFT(),
      await getShopifyAnalyticsFT(),
    ],
  })

  let sentinel = true

  const sortedTasks = (agentContext.run.tasks as Task[]).sort(
    (a, b) => a.step - b.step
  )
  const task = sortedTasks[agentContext.taskStep]
  if (!task) {
    throw new Error('Task not found')
  }

  const outputs = [
    `### Task ${task.step}: ${task.task}\n\n*${task.reason}*\n\n`,
  ]

  try {
    const generatedTask = await generateObjectiveAgentTaskPrompt(
      agentContext.project,
      task
    )
    const agentTask = agent.createTask(generatedTask)
    for await (const stepOutput of agentTask as any) {
      if (stepOutput?.output?.message?.content) {
        outputs.push(`${stepOutput.output.message.content}\n`)
      }

      if (verbose) {
        console.log(stepOutput)
      }
    }
  } catch (error: any) {
    const { message } = error
    console.error(error)
    log.error(message)
    outputs.push(`Error: ${message}\n`)
    sentinel = false
  }

  const output = outputs.join('\n')
  const outputUrl = await createBlob(
    previousOutput.length > 0 ? `${previousOutput}\n${output}` : output,
    'md'
  )
  if (previousOutputUrl.length > 0) {
    await deleteBlob(previousOutputUrl)
  }

  return {
    ...agentContext,
    sentinel,
    run: { ...agentContext.run, outputUrl },
  }
}
