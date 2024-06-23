'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { z } from 'zod'
import { useAccount, useConfig } from 'wagmi'
import { writeContract } from '@wagmi/core'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { manifest } from '@/lib/manifests/templates'
import { nanoid } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { abi } from '@/lib/abi/Factory.json'
import { getContractAddressFromTx, ipfsProjectUpload } from '@/lib/vendor/web3'
import { Project } from '@/lib/types'
import useUserStore from '@/stores/use-user-store'

interface Props {
  project?: Project
  setOpen: any
}

export function ProjectForm({ project = {} as Project, setOpen }: Props) {
  const { address } = useAccount()
  const config = useConfig()

  const [isLoading, setIsLoading] = useState(false)

  const { createProject, updateProject, beta, deleteProject } = useUserStore(
    (state) => state
  )

  const defaultValues: Partial<Project> = {
    ...project,
  }

  const formSchema = z.object({
    name: z.string().min(1, 'Please enter a name.'),
    vision: z.string().min(1, 'Please enter a vision.'),
    strategy: z.string().min(1, 'Please enter a strategy.'),
    budget: z.number().min(1, 'Please enter a budget.'),
    resourceIds: z.array(z.string()),
  })

  const form = useForm<Project>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const createProjectAndMaybeContracts = async (data: Project) => {
    if (address && config && beta) {
      const symbol = nanoid().slice(0, 4)
      const ipfsUri = await ipfsProjectUpload(data)
      const hash = await writeContract(config as unknown as any, {
        address: process.env
          .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'mint',
        args: ['', symbol, symbol, 18, BigInt(1000000000)],
      })

      const contractAddress = await getContractAddressFromTx(hash)
      await createProject({ ...data, ipfsUri, contractAddress })
    } else {
      await createProject(data)
    }

    setOpen(false)
  }

  const onSubmit = async (data: Project) => {
    const valid = await form.trigger()
    if (!valid) {
      return
    }

    if (project.id) {
      toast.promise(updateProject({ ...project, ...data }), {
        loading: 'Updating Project...',
        success: 'Updated Project',
        error: 'Error updating project',
      })
    } else {
      toast.promise(createProjectAndMaybeContracts(data), {
        loading: 'Creating project...',
        success: 'Created project',
        error: 'Error creating project',
      })
    }
  }

  const onProjectlyTemplate = (value: string) => {
    const template = manifest.projects[parseInt(value)]
    form.setValue('name', template.name)
    form.setValue('vision', template.vision)
    form.setValue('strategy', template.strategy)
    form.setValue('budget', template.budget)
    form.setValue('resourceIds', template.resourceIds)
    form.setValue('memberIds', template.memberIds)
  }

  const renderTemplateSelect = () => (
    <FormItem>
      <FormLabel>Template</FormLabel>
      <FormControl>
        <Select onValueChange={onProjectlyTemplate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Apply template" />
          </SelectTrigger>
          <SelectContent>
            {manifest.projects.map((template: any, i) => (
              <SelectItem key={`template-${i}`} value={`${i}`}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription></FormDescription>
      <FormMessage />
    </FormItem>
  )

  const renderNameField = () => (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter a name" {...field} />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const renderVisionField = () => (
    <FormField
      control={form.control}
      name="vision"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex">Vision</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter a vision"
              className="resize-none h-24"
              {...field}
            />
          </FormControl>
          <FormDescription>
            This vision encompasses where the project sees itself in the future
            and its overarching goals. It serves as a north star, guiding the
            development of Objectives that are ambitious and aligned with the
            project aspirations.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const renderStrategyField = () => (
    <FormField
      control={form.control}
      name="strategy"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex">Strategy</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter a strategy"
              className="resize-none h-24"
              {...field}
            />
          </FormControl>
          <FormDescription>
            The strategy outlines the high-level approach the project will take
            to achieve its objectives. It includes the tactical steps,
            milestones, and the expected outcomes.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  const renderBudgetField = () => (
    <FormField
      control={form.control}
      name="budget"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex">Budget</FormLabel>
          <FormControl>
            <Input
              type="number"
              value={field.value}
              onChange={(e) => {
                form.setValue('budget', e.target.valueAsNumber)
              }}
              placeholder="Enter a budget"
            />
          </FormControl>
          <FormDescription>
            The maximum credit usage for this project.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
  const renderSaveButton = () => (
    <div className="flex justify-between space-x-2">
      <div className="flex flex-start"></div>
      <div className="flex justify-end">
        {project.id ? (
          <Button
            variant="destructive"
            disabled={isLoading}
            className="mr-2"
            onClick={async () => {
              setIsLoading(true)
              await deleteProject(project.id)
              setIsLoading(false)
              setOpen(false)
            }}
          >
            Delete
          </Button>
        ) : null}
        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
      </div>
    </div>
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {project.id ? null : renderTemplateSelect()}
        {renderNameField()}
        {renderVisionField()}
        {renderStrategyField()}
        {renderBudgetField()}
        {renderSaveButton()}
      </form>
    </Form>
  )
}
