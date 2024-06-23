// Inngest
export const INNGEST_APP_ID = 'hyperobjective-app'

export const PREPARE_RUNS_HEARTBEAT_ID = 'prepare-runs-heartbeat'

export const GET_NEXT_RUNS_ID = 'get-next-runs'
export const GET_NEXT_RUNS_EVENT = 'prod/get.next.runs'

export const READ_OBJECTIVES_ID = 'read-objectives'
export const READ_OBJECTIVES_EVENT = 'app/read.objectives'

export const CREATE_RUN_EVENT_EVENT = 'prod/create.run.event'

export const CREATE_OBJECTIVE_RUN_ID = 'create-objective-run'
export const CREATE_OBJECTIVE_RUN_EVENT = 'app/create.objective.run'

export const RUN_OBJECTIVE_ID = 'run-objective'
export const RUN_OBJECTIVE_EVENT = 'prod/run.objective'

export const READ_RUN_CONTEXT_ID = 'read-run-context'
export const READ_RUN_CONTEXT_EVENT = 'app/read.run.context'

export const GENERATE_TASKS_ID = 'generate-tasks'
export const RUN_OBJECTIVE_AGENT_ID = 'run-objective-agent'

export const UPDATE_RUN_ID = 'update-run'
export const UPDATE_OBJECTIVE_LAST_RUN_AT_ID = 'update-objective-last-run-at'

export const CO_DIR = './content/co'

// Local storage selectors
export const ROUTER_MODELS = 'router-models'
export const ROUTER_COST_TO_PERFORMANCE_RATIO =
  'router-cost-to-performance-ratio'
export const ROUTER_TEMPERATURE = 'router-temperature'
export const ROUTER_LATENCY = 'router-latency'
export const ROUTER_SKILLS = 'router-skills'

// TODO: Should move to types
export const CRON_INTERVALS = [
  { display: 'Minute', value: '* * * * *' },
  { display: 'Hour', value: '0 * * * *' },
  { display: 'Day', value: '0 0 * * *' },
  { display: 'Week', value: '0 0 * * 0' },
  { display: 'Month', value: '0 0 1 * *' },
  { display: 'Year', value: '0 0 1 1 *' },
]

export const MISSING_BILLING_ACCOUNT =
  'Please select a billing plan to use this feature'
