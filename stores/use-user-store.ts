import Pusher from 'pusher-js'
import { create } from 'zustand'

import {
  safeCreateChat,
  safeCreateCycle,
  safeCreateDocumentUpload,
  safeCreateKeyResult,
  safeCreateLabel,
  safeCreateObjective,
  safeCreateProject,
  safeCreatePrompt,
  safeCreateRun,
  safeFetchRuns,
  safeFetchNotifications,
  safeFetchProjects,
  safeFetchBillingAccount,
  safeFetchChats,
  safeFetchCycles,
  safeFetchDocumentUploads,
  safeFetchKeyResults,
  safeFetchLabels,
  safeFetchObjectives,
  safeFetchPrompts,
  safeUpdateAppIds,
  safeUpdateChat,
  safeUpdateCycle,
  safeUpdateKeyResult,
  safeUpdateLabel,
  safeUpdateObjective,
  safeUpdateProject,
  safeUpdatePrompt,
  safeUpdateRun,
  safeUpdateUser,
  safeDeleteCycle,
  safeDeleteKeyResult,
  safeDeleteLabel,
  safeDeleteObjective,
  safeDeletePrompt,
  safeDeleteRun,
  safeDeleteProject,
  safeDeleteChat,
  safeDeleteDocumentUpload,
} from '@/lib/db/safe'
import { createClient } from '@/lib/supabase/client'
import { safeFetchGlobal, safeFetchUserTokenStats } from '@/lib/db/helpers'
import {
  Cycle,
  Chat,
  Prompt,
  Label,
  Objective,
  KeyResult,
  Run,
  Project,
  ProjectViewConfig,
  Notification,
  BillingAccount,
  DocumentUpload,
  TokenStats,
  ChatConfig,
  ChatUsage,
  CreatePrompt,
  CreateKeyResult,
  CreateLabel,
  CreateCycle,
  CreateObjective,
  CreateRun,
  CreateChat,
  CreateProject,
  CreateDocument,
} from '@/lib/types'

// TODO: Persist store https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md
type Store = {
  // Utils
  initialized: boolean
  init: (override?: boolean) => Promise<void>
  refresh: () => Promise<void>
  // Local storage
  chatConfig: ChatConfig
  setChatConfig: (config: Partial<ChatConfig>) => void
  projectViewConfig: ProjectViewConfig
  setProjectViewConfig: (config: Partial<ProjectViewConfig>) => void
  // TODO: Remove active project
  activeProject: Project | null
  setActiveProject: (project: Project) => void
  // WSS
  channels: Pusher
  // Auth
  user: { email: string; id: string } | null
  // DB
  beta: boolean
  labels: Label[] | null
  cycles: Cycle[] | null
  objectives: Objective[] | null
  keyResults: KeyResult[] | null
  runs: Run[] | null
  chats: Chat[] | null
  projects: Project[] | null
  notifications: Notification[] | null
  billingAccount: BillingAccount | null
  documents: DocumentUpload[] | null
  prompts: Prompt[] | null
  userTokenStats: TokenStats[] | null
  chatUsages: ChatUsage[] | null
  // Create
  createPrompt: (data: CreatePrompt) => Promise<Prompt>
  createCycle: (data: CreateCycle) => Promise<Cycle>
  createObjective: (data: CreateObjective) => Promise<Objective>
  createKeyResult: (data: CreateKeyResult) => Promise<KeyResult>
  createLabel: (data: CreateLabel) => Promise<Label>
  createRun: (data: CreateRun) => Promise<Run>
  createChat: (data: CreateChat) => Promise<Chat>
  createProject: (data: CreateProject) => Promise<Project>
  createDocument: (data: CreateDocument) => Promise<DocumentUpload>
  // Read
  readUsageStats: () => Promise<TokenStats[]>
  readChats: () => Promise<Chat[]>
  readCycles: () => Promise<Cycle[]>
  readKeyResults: () => Promise<KeyResult[]>
  readLabels: () => Promise<Label[]>
  readObjectives: () => Promise<Objective[]>
  readProjects: () => Promise<Project[]>
  readRuns: () => Promise<Run[]>
  readNotifications: () => Promise<Notification[]>
  readBillingAccount: () => Promise<BillingAccount>
  readDocuments: () => Promise<DocumentUpload[]>
  readPrompts: () => Promise<Prompt[]>
  // Update
  updateUser: (data: any) => void
  updateKeyResult: (keyResult: KeyResult) => Promise<KeyResult>
  updateLabel: (label: Label) => Promise<Label>
  updateObjective: (objective: Objective) => Promise<Objective>
  updateProject: (project: Project) => Promise<Project>
  updateChat: (chat: Chat) => Promise<Chat>
  updateCycle: (cycle: Cycle) => Promise<Cycle>
  updatePrompt: (prompt: Prompt) => Promise<Prompt>
  updateRun: (run: Run) => Promise<Run>
  updateBillingAccount: (
    billingAccount: BillingAccount
  ) => Promise<BillingAccount>
  // Delete
  deletePrompt: (id: string) => Promise<void>
  deleteChat: (id: string) => Promise<void>
  deleteCycle: (id: string) => Promise<void>
  deleteKeyResult: (id: string) => Promise<void>
  deleteLabel: (id: string) => Promise<void>
  deleteObjective: (id: string) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  deleteRun: (id: string) => Promise<void>
  deleteDocument: (id: string) => Promise<void>
}

Pusher.logToConsole = false

const useUserStore = create<Store>((set) => ({
  // Utils
  initialized: false,
  activeProject: null,
  beta: false,
  setActiveProject: (project) => set({ activeProject: project }),
  init: async (override = false) => {
    const { initialized } = useUserStore.getState()
    if (initialized && !override) {
      return
    }

    let user
    try {
      const { data, error } = await createClient().auth.getUser()
      if (error) {
        throw new Error(error.message)
      }

      const { id, email } = data.user
      if (id && email) {
        user = { id, email }
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      console.error(error)
      set({ initialized: true })
      return
    }

    const {
      userTokenStats,
      billingAccount,
      projects,
      objectives,
      labels,
      keyResults,
      runs,
      prompts,
      chats,
      cycles,
      documents,
      notifications,
      chatUsages,
    } = await safeFetchGlobal()

    const { channels } = useUserStore.getState()
    channels.subscribe(user.id).bind('event', function (event: any) {
      const { message } = event
      if (message.action === 'updated' && message.run) {
        const { runs } = useUserStore.getState()
        set({
          runs: [
            ...(runs ?? []).filter((r) => r.id !== message.run.id),
            message.run,
          ],
        })
      }
    })

    set({
      initialized: true,
      userTokenStats,
      billingAccount,
      projects,
      objectives,
      labels,
      keyResults,
      runs,
      prompts,
      chats,
      cycles,
      documents,
      notifications,
      chatUsages,
      user,
    })
  },
  userTokenStats: null,
  refresh: async () => {
    const { init } = useUserStore.getState()
    await init(true)
  },
  chatConfig: {
    temperature: [0.5],
    costToPerformanceRatio: [0.5],
    skill: 'chat',
    modelUri: '',
  },
  setChatConfig: (config: Partial<ChatConfig>) => {
    const { chatConfig } = useUserStore.getState()
    set({ chatConfig: { ...chatConfig, ...config } })
  },
  projectViewConfig: {
    view: 'all',
  },
  setProjectViewConfig: (config: Partial<ProjectViewConfig>) => {
    const { projectViewConfig } = useUserStore.getState()
    set({ projectViewConfig: { ...projectViewConfig, ...config } })
  },
  // WSS
  channels: new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '',
  }),
  // Database
  user: null,
  cycles: null,
  objectives: null,
  labels: null,
  keyResults: null,
  runs: null,
  chats: null,
  projects: null,
  notifications: null,
  billingAccount: null,
  documents: null,
  prompts: null,
  chatUsages: null,
  // Create
  createPrompt: async (data: CreatePrompt) => {
    const { prompts } = useUserStore.getState()
    const prompt = await safeCreatePrompt(data)
    set({ prompts: [...(prompts ?? []), prompt] })
    return prompt
  },
  createKeyResult: async (data: CreateKeyResult) => {
    const { keyResults } = useUserStore.getState()
    const keyResult = await safeCreateKeyResult(data)
    set({ keyResults: [...(keyResults ?? []), keyResult] })
    return keyResult
  },
  createLabel: async (data: CreateLabel) => {
    const { labels } = useUserStore.getState()
    const label = await safeCreateLabel(data)
    set({ labels: [...(labels ?? []), label] })
    return label
  },
  createCycle: async (data: CreateCycle) => {
    const { cycles } = useUserStore.getState()
    const cycle = await safeCreateCycle(data)
    set({ cycles: [...(cycles ?? []), cycle] })
    return cycle
  },
  createObjective: async (data: CreateObjective) => {
    const { objectives } = useUserStore.getState()
    const objective = await safeCreateObjective(data)
    set({ objectives: [...(objectives ?? []), objective] })
    return objective
  },
  createRun: async (data: CreateRun) => {
    const { runs } = useUserStore.getState()
    const run = await safeCreateRun(data)
    if (!run) {
      throw new Error('Failed to create run')
    }
    set({ runs: [...(runs ?? []), run] })
    return run
  },
  createChat: async (data: CreateChat) => {
    const { chats } = useUserStore.getState()
    const chat = await safeCreateChat(data)
    set({ chats: [...(chats ?? []), chat] })
    return chat
  },
  createProject: async (data: CreateProject) => {
    const { projects } = useUserStore.getState()
    const project = await safeCreateProject(data)
    set({ projects: [...(projects ?? []), project] })
    return project
  },
  createDocument: async (data: CreateDocument) => {
    const document = await safeCreateDocumentUpload(data)
    const { documents } = useUserStore.getState()
    set({ documents: [...(documents ?? []), document] })
    return document
  },
  // Read
  readUsageStats: async () => {
    const userTokenStats = await safeFetchUserTokenStats()
    set({ userTokenStats })
    return userTokenStats
  },
  readBillingAccount: async () => {
    const billingAccount = await safeFetchBillingAccount()
    set({ billingAccount })
    return billingAccount
  },
  readPrompts: async () => {
    const prompts = await safeFetchPrompts()
    set({ prompts })
    return prompts
  },
  readKeyResults: async () => {
    const keyResults = await safeFetchKeyResults()
    set({ keyResults })
    return keyResults
  },
  readRuns: async () => {
    const runs = await safeFetchRuns()
    set({ runs })
    return runs
  },
  readDocuments: async () => {
    const documents = await safeFetchDocumentUploads()
    set({ documents })
    return documents
  },
  readCycles: async () => {
    const cycles = await safeFetchCycles()
    set({ cycles })
    return cycles
  },
  readObjectives: async () => {
    const objectives = await safeFetchObjectives()
    set({ objectives })
    return objectives
  },
  readLabels: async () => {
    const labels = await safeFetchLabels()
    set({ labels })
    return labels
  },
  readChats: async () => {
    const chats = await safeFetchChats()
    set({ chats })
    return chats
  },
  readProjects: async () => {
    const projects = await safeFetchProjects()
    set({ projects })
    return projects
  },
  readNotifications: async () => {
    const notifications = await safeFetchNotifications()
    set({ notifications })
    return notifications
  },
  // Update
  updateUser: async (data: Partial<any>) => {
    const user = await safeUpdateUser({
      beta: data.beta ?? false,
      private: data.private ?? false,
    })
    //set({ user: 'x' })
  },
  updatePrompt: async (prompt: Prompt) => {
    const { prompts } = useUserStore.getState()
    await safeUpdatePrompt(prompt)
    set({
      prompts: [...(prompts ?? []).filter((p) => p.id !== prompt.id), prompt],
    })
    return prompt
  },
  updateObjective: async (objective: Objective) => {
    const { objectives } = useUserStore.getState()
    await safeUpdateObjective(objective)
    set({
      objectives: [
        ...(objectives ?? []).filter((o) => o.id !== objective.id),
        objective,
      ],
    })
    return objective
  },
  updateKeyResult: async (keyResult: KeyResult) => {
    const { keyResults } = useUserStore.getState()
    await safeUpdateKeyResult(keyResult)
    set({
      keyResults: [
        ...(keyResults ?? []).filter((k) => k.id !== keyResult.id),
        keyResult,
      ],
    })
    return keyResult
  },
  updateLabel: async (label: Label) => {
    const { labels } = useUserStore.getState()
    await safeUpdateLabel(label)
    set({ labels: [...(labels ?? []).filter((l) => l.id !== label.id), label] })
    return label
  },
  updateBillingAccount: async (billingAccount: BillingAccount) => {
    const updatedBillingAccount = await safeUpdateAppIds(billingAccount.appIds)
    set({ billingAccount: updatedBillingAccount })
    return updatedBillingAccount
  },
  updateProject: async (project: Project) => {
    const { projects } = useUserStore.getState()
    await safeUpdateProject(project)
    set({
      projects: [
        ...(projects ?? []).filter((p) => p.id !== project.id),
        project,
      ],
    })
    return project
  },
  updateChat: async (chat: Chat) => {
    const { chats } = useUserStore.getState()
    await safeUpdateChat(chat)
    set({ chats: [...(chats ?? []).filter((c) => c.id !== chat.id), chat] })
    return chat
  },
  updateRun: async (run: Run) => {
    const { runs } = useUserStore.getState()
    await safeUpdateRun(run)
    set({ runs: [...(runs ?? []).filter((r) => r.id !== run.id), run] })
    return run
  },
  updateCycle: async (cycle: Cycle) => {
    const { cycles } = useUserStore.getState()
    await safeUpdateCycle(cycle)
    set({ cycles: [...(cycles ?? []).filter((c) => c.id !== cycle.id), cycle] })
    return cycle
  },
  // Delete
  deleteCycle: async (id: string) => {
    const { cycles } = useUserStore.getState()
    await safeDeleteCycle(id)
    set({ cycles: (cycles ?? []).filter((o) => o.id !== id) })
  },
  deleteObjective: async (id: string) => {
    const { objectives, readObjectives, keyResults } = useUserStore.getState()
    const objectiveKeyResults = keyResults?.filter((k) => k.objectiveId === id)
    if (objectiveKeyResults?.length) {
      await Promise.all(
        objectiveKeyResults?.map((k) => safeDeleteKeyResult(k.id))
      )
    }
    await safeDeleteObjective(id)
    set({ objectives: (objectives ?? []).filter((o) => o.id !== id) })
    // TODO: Improve this. If last key result for objective, need to redraw table which requires refreshing objectives
    await readObjectives()
  },
  deleteKeyResult: async (id: string) => {
    const { keyResults, readObjectives } = useUserStore.getState()
    await safeDeleteKeyResult(id)
    set({
      keyResults: [...(keyResults ?? []).filter((k) => k.id !== id)],
    })
    // TODO: Improve this. If last key result for objective, need to redraw table which requires refreshing objectives
    await readObjectives()
  },
  deleteLabel: async (id: string) => {
    const { labels } = useUserStore.getState()
    await safeDeleteLabel(id)
    set({ labels: (labels ?? []).filter((o) => o.id !== id) })
  },
  deleteRun: async (id: string) => {
    const { runs } = useUserStore.getState()
    await safeDeleteRun(id)
    set({ runs: (runs ?? []).filter((o) => o.id !== id) })
  },
  deleteChat: async (id: string) => {
    const { chats } = useUserStore.getState()
    await safeDeleteChat(id)
    set({ chats: (chats ?? []).filter((c) => c.id !== id) })
  },
  deleteProject: async (id: string) => {
    const { activeProject, projects, objectives, keyResults, cycles, runs } =
      useUserStore.getState()

    await Promise.all([
      cycles
        ?.filter((c) => c.projectId === id)
        .map((c) => safeDeleteCycle(c.id)),
      keyResults
        ?.filter((k) => k.projectId === id)
        .map((k) => safeDeleteKeyResult(k.id)),
      runs?.filter((r) => r.projectId === id).map((r) => safeDeleteRun(r.id)),
      objectives
        ?.filter((o) => o.projectId === id)
        .map((o) => safeDeleteObjective(o.id)),
    ])

    await safeDeleteProject(id)
    set({ projects: (projects ?? []).filter((p) => p.id !== id) })

    if (id === activeProject?.id) {
      set({ activeProject: null })
    }
  },
  deleteDocument: async (id: string) => {
    const { documents } = useUserStore.getState()
    await safeDeleteDocumentUpload(id)
    set({ documents: (documents ?? []).filter((d) => d.id !== id) })
  },
  deletePrompt: async (id: string) => {
    const { prompts } = useUserStore.getState()
    await safeDeletePrompt(id)
    set({ prompts: (prompts ?? []).filter((p) => p.id !== id) })
  },
}))

export default useUserStore
