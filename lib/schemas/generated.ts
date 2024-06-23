export const generatedObjectivesSchema = {
  properties: {
    objectives: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          outcome: {
            type: 'string',
            description: 'The project objective outcome',
          },
          reason: {
            type: 'string',
            description: 'The reason for choosing the objective',
          },
        },
      },
    },
  },
}

export const generatedResourcesSchema = {
  properties: {
    resources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The resource id',
          },
          title: {
            type: 'string',
            description: 'The resource title',
          },
          reason: {
            type: 'string',
            description: 'The reason for choosing the reource',
          },
        },
      },
    },
  },
}

export const generatedKeyResultsSchema = {
  type: 'object',
  properties: {
    keyResults: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The key result name',
          },
          reason: {
            type: 'string',
            description: 'The reason for choosing this key result',
          },
        },
        required: ['name', 'name', 'reason'],
      },
    },
  },
  required: ['keyResults'],
} as const

export const generatedTasksSchema = {
  type: 'object',
  properties: {
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          task: {
            type: 'string',
            description: 'The task',
          },
          reason: {
            type: 'string',
            description: 'The reason for choosing this task',
          },
          step: {
            type: 'number',
            description: 'The task step index',
          },
        },
      },
    },
  },
}

export const generatedMarketingFeaturesSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user: {
            type: 'string',
            description: 'The user persona name',
          },
          description: {
            type: 'string',
            description: 'Why the user persona needs the product',
          },
          features: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The feature name',
                },
                description: {
                  type: 'string',
                  description: 'A brief description of the feature',
                },
              },
            },
          },
        },
      },
    },
  },
}
