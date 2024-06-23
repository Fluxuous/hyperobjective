import { FunctionTool } from 'llamaindex'
import moment from 'moment'

import { getWallet, mintErc404, ipfsProjectUpload } from '@/lib/vendor/web3'
import { nanoid } from '@/lib/utils'
import {
  generateProjectObjectives,
  generateObjectiveKeyResults,
  generateProjectValidation,
} from '@/lib/ai/generators/project'
import {
  unsafeFetchProject,
  unsafeFetchProjectRuns,
  unsafeFetchProjectObjectives,
  unsafeFetchProjectKeyResults,
  unsafeFetchGlobalProjects,
  unsafeFetchGlobalAccounts,
  unsafeCreateProject,
  unsafeCreateObjective,
  unsafeCreateKeyResult,
  unsafeCreateRunHelper,
  unsafeUpdateProject,
  unsafeFetchProjectId,
} from '@/lib/db/unsafe'
import { manifest } from '@/lib/manifests/apps'

export const getPlatformStatusFT = async () =>
  FunctionTool.from(
    async () => {
      try {
        const project = await unsafeFetchGlobalProjects()
        const accounts = await unsafeFetchGlobalAccounts()
        return JSON.stringify({
          apps: manifest.items.map(
            ({ name: title, description, category, cost }) => ({
              title,
              description,
              category,
              cost,
            })
          ),
          project: project.map(
            ({ name, vision, strategy, budget, private: isPrivate }) => ({
              name,
              vision,
              strategy,
              budget,
              private: isPrivate,
            })
          ),
          users: accounts.map(({ private: isPrivate, createdAt }) => ({
            name: isPrivate ? 'Private' : 'Private',
            joined: moment(new Date(Number(createdAt))).fromNow(),
          })),
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'getPlatformStatus',
      description: 'Use this function to get Hyperobjective platform status',
    }
  )

export const getAccountStatusFT = async () =>
  FunctionTool.from(
    async () => {
      try {
        return JSON.stringify({
          user: '',
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'getAccountStatus',
      description: 'Use this function to get the user account status',
    }
  )

export const validateProjectFT = async () =>
  FunctionTool.from(
    async ({
      name,
      vision,
      strategy,
      budget,
      userId,
      private: isPrivate,
      subscriptionUsageId,
    }: {
      name: string
      vision: string
      strategy: string
      budget: number
      userId: string
      private: boolean
      subscriptionUsageId: string
    }) => {
      try {
        const validation: string = await generateProjectValidation({
          name,
          vision,
          strategy,
          budget,
          userId,
          private: isPrivate,
          subscriptionUsageId,
        })
        return JSON.stringify({ validation })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ error: error.message })
      }
    },
    {
      name: 'validateProject',
      description:
        'Use this function to validate an project name, vision, strategy, visibility, budget and visibility',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The project name',
          },
          vision: {
            type: 'string',
            description: 'The project vision',
          },
          strategy: {
            type: 'string',
            description: 'The project strategy',
          },
          budget: {
            type: 'number',
            description: 'The project budget',
          },
          userId: {
            type: 'string',
            description: 'The user ID',
          },
          private: {
            type: 'boolean',
            description:
              'The project visibility status which is either public or private',
          },
          subscriptionUsageId: {
            type: 'string',
            description: 'The subscription usage ID',
          },
        },
        required: [
          'name',
          'vision',
          'strategy',
          'budget',
          'userId',
          'private',
          'subscriptionUsageId',
        ],
      },
    }
  )

export const createProjectFT = async () =>
  FunctionTool.from(
    async ({
      name,
      vision,
      strategy,
      budget,
      userId,
      private: isPrivate,
    }: {
      name: string
      vision: string
      strategy: string
      budget: number
      userId: string
      private: boolean
    }) => {
      try {
        const symbol = nanoid().slice(0, 4)
        const data = {
          name,
          vision,
          strategy,
          budget,
          userId,
          resourceIds: [],
          memberIds: [],
          private: isPrivate,
        }

        let ipfsUri = ''
        let contractAddress = ''

        const blockchain = false
        if (blockchain) {
          const wallet = await getWallet()
          ipfsUri = await ipfsProjectUpload(data as any)
          contractAddress = await mintErc404(
            symbol,
            symbol,
            18,
            1000,
            wallet.address
          )
        } else {
          ipfsUri = ''
          contractAddress = ''
        }

        const { id } = await unsafeCreateProject(userId, {
          ...data,
          contractAddress,
          ipfsUri,
        })
        return JSON.stringify({
          projectId: id,
          name,
          vision,
          strategy,
          ipfsUri,
          symbol,
          private: isPrivate,
          contractUrl: `https://basescan.org/token/${contractAddress}`,
          liquidityUrl: `https://app.uniswap.org/add/ETH/${contractAddress}/10000`,
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'createProject',
      description: 'Use this function to create a project',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The user ID',
          },
          name: {
            type: 'string',
            description: 'The project name',
          },
          vision: {
            type: 'string',
            description: 'The project vision',
          },
          strategy: {
            type: 'string',
            description: 'The project strategy',
          },
          budget: {
            type: 'number',
            description: 'The project budget',
          },
          private: {
            type: 'boolean',
            description: 'The project visibility status',
          },
        },
        required: ['name', 'vision', 'strategy', 'userId', 'budget', 'private'],
      },
    }
  )

export const updateProjectFT = async () =>
  FunctionTool.from(
    async ({
      projectId,
      name,
      vision,
      strategy,
      budget,
      private: isPrivate,
    }: {
      projectId: string
      name: string
      vision: string
      strategy: string
      budget: number
      private: boolean
    }) => {
      try {
        const data = {
          id: projectId,
          name,
          vision,
          strategy,
          budget,
          private: isPrivate,
        }
        const project = await unsafeFetchProject(projectId)
        const { contractAddress } = await unsafeUpdateProject({
          ...project,
          ...data,
        })
        return JSON.stringify({
          ...data,
          contractUrl: `https://basescan.org/token/${contractAddress}`,
          liquidityUrl: `https://app.uniswap.org/add/ETH/${contractAddress}/10000`,
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'updateProject',
      description: 'Use this function to update an project',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The project ID',
          },
          name: {
            type: 'string',
            description: 'The project name',
          },
          vision: {
            type: 'string',
            description: 'The project vision',
          },
          strategy: {
            type: 'string',
            description: 'The project strategy',
          },
          budget: {
            type: 'number',
            description: 'The project budget',
          },
          private: {
            type: 'boolean',
            description: 'The project visibility status',
          },
        },
        required: [
          'projectId',
          'name',
          'vision',
          'strategy',
          'budget',
          'private',
        ],
      },
    }
  )

export const getProjectStatusFT = async () =>
  FunctionTool.from(
    async ({ projectId }: { projectId: string }) => {
      try {
        const project = await unsafeFetchProject(projectId)
        if (!project) {
          throw new Error('project does not exist')
        }
        const objectives = await unsafeFetchProjectObjectives(projectId)
        if (objectives.length < 1) {
          throw new Error('project objectives do not exist')
        }

        const keyResults = await unsafeFetchProjectKeyResults(projectId)
        if (keyResults.length < 1) {
          throw new Error('project  key results do not exist')
        }

        const runs = await unsafeFetchProjectRuns(projectId)
        if (runs.length < 1) {
          throw new Error('project objective runs do not exist')
        }

        return JSON.stringify({
          status: 'project objectives are ready to run',
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ status: error.message })
      }
    },
    {
      name: 'getProjectStatus',
      description: 'Use this function to get the status of an project',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The project ID',
          },
        },
        required: ['projectId'],
      },
    }
  )

export const createProjectObjectivesFT = async () =>
  FunctionTool.from(
    async ({
      projectId,
      subscriptionUsageId,
    }: {
      projectId: string
      subscriptionUsageId: string
    }) => {
      try {
        if (!projectId) {
          throw new Error('projectId is required')
        }

        const project = await unsafeFetchProject(projectId)
        if (!project) {
          throw new Error('project not found')
        }

        const objectives = []
        const generatedObjectives = await generateProjectObjectives(
          project,
          project.userId,
          subscriptionUsageId
        )
        for (const generatedObjective of generatedObjectives) {
          const objective = await unsafeCreateObjective(project.userId, {
            outcome: generatedObjective.outcome,
            labelId: '',
            parentId: '',
            cycleId: '',
            progress: 0,
            interval: '',
            projectId,
          })
          objectives.push(objective)
        }

        return JSON.stringify({
          success: true,
          objectives,
        })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'createProjectObjectives',
      description: 'Use this function to create project objectives',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The project ID',
          },
          subscriptionUsageId: {
            type: 'string',
            description: 'The subscription usage ID',
          },
        },
        required: ['projectId', 'subscriptionUsageId'],
      },
    }
  )

export const createProjectKeyResultsFT = async () =>
  FunctionTool.from(
    async ({
      projectId,
      subscriptionUsageId,
    }: {
      projectId: string
      subscriptionUsageId: string
    }) => {
      const keyResults = []
      try {
        if (!projectId) {
          throw new Error('projectId is required')
        }

        const project = await unsafeFetchProject(projectId)
        if (!project) {
          throw new Error('project not found')
        }

        const objectives = await unsafeFetchProjectObjectives(projectId)
        if (objectives.length < 1) {
          throw new Error('project objectives do not exist')
        }

        for (const objective of objectives) {
          const generatedKeyResults = await generateObjectiveKeyResults(
            project,
            objective,
            project.userId,
            subscriptionUsageId
          )
          for (const generatedKeyResult of generatedKeyResults) {
            const keyResult = await unsafeCreateKeyResult(project.userId, {
              projectId,
              objectiveId: objective.id,
              name: generatedKeyResult.name,
              type: 'number',
              value: 0,
            })
            keyResults.push(keyResult)
          }
        }
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }

      return JSON.stringify({
        keyResults,
      })
    },
    {
      name: 'createProjectKeyResults',
      description: 'Use this function to create project key results',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The project ID',
          },
          subscriptionUsageId: {
            type: 'string',
            description: 'The subscription usage ID',
          },
        },
        required: ['projectId', 'subscriptionUsageId'],
      },
    }
  )

export const createProjectObjectiveRunsFT = async () =>
  FunctionTool.from(
    async ({ projectId }: { projectId: string }) => {
      try {
        if (!projectId) {
          throw new Error('projectId is required')
        }

        const project = await unsafeFetchProject(projectId)
        if (!project) {
          throw new Error('Project does not exist')
        }

        const objectives = await unsafeFetchProjectObjectives(projectId)
        if (objectives.length < 1) {
          throw new Error('project objectives do not exist')
        }

        const runs = []
        for (const objective of objectives) {
          const run = await unsafeCreateRunHelper(objective.id)
          runs.push(run)
          if (!run) {
            throw new Error('project objective run not created')
          }
        }
        return JSON.stringify({ runs })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'createProjectObjectiveRuns',
      description: 'Use this function to create project objective runs',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The project ID',
          },
        },
        required: ['projectId'],
      },
    }
  )

export const getProjectIdFT = async () =>
  FunctionTool.from(
    async ({ name }: { name: string }) => {
      try {
        if (!name) {
          throw new Error('name is required')
        }

        const project = await unsafeFetchProjectId(name)
        if (!project) {
          throw new Error('Project does not exist')
        }

        return JSON.stringify({ projectId: project.id })
      } catch (error: any) {
        console.error(error)
        return JSON.stringify({ message: error.message })
      }
    },
    {
      name: 'getProjectId',
      description: 'Use this function to get the project ID',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The project name',
          },
        },
        required: ['name'],
      },
    }
  )
