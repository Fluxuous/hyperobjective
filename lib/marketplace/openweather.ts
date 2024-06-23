'use server'

import { FunctionTool } from 'llamaindex'
import OpenWeatherMap from 'openweathermap-ts'

const openWeather = new OpenWeatherMap({
  apiKey: process.env.WEATHER_API_KEY || '',
})

export const getWeatherFT = new FunctionTool(
  async ({ cityName, state }: { cityName: string; state: string }) => {
    const res = await openWeather.getCurrentWeatherByCityName({
      cityName,
      state,
    })
    return JSON.stringify(res)
  },
  {
    name: 'getWeather',
    description: 'Use this function to get the weather',
    parameters: {
      type: 'object',
      properties: {
        cityName: {
          type: 'string',
          description: 'The city name',
        },
        state: {
          type: 'string',
          description: 'The state',
        },
      },
      required: ['cityName', 'state'],
    },
  }
)
