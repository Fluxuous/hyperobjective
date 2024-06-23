'use server'

import { FunctionTool } from 'llamaindex'

export const getShopifyStatusFT = async () => {
  return new FunctionTool(
    async () => {
      const res = {
        status: 'online',
        message: 'Shopify is online and functioning correctly.',
        integrations: [
          {
            name: 'Printify',
            status: 'online',
            message:
              'Printify integration is online and functioning correctly.',
          },
        ],
      }
      return JSON.stringify(res)
    },
    {
      name: 'getShopifyStatus',
      description: 'Use this function to get the status of Shopify',
    }
  )
}

export const getShopifyShopFT = async () => {
  return new FunctionTool(
    async () => {
      const res = {
        status: 'online',
        message: 'The Shopify store is setup and ready to use.',
      }
      return JSON.stringify(res)
    },
    {
      name: 'getShopifyShop',
      description: 'Use this function to get the status of Shopify',
    }
  )
}

export const getShopifyAnalyticsFT = async () => {
  return new FunctionTool(
    async () => {
      const res = {
        sales: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalOrders: 0,
      }
      return JSON.stringify(res)
    },
    {
      name: 'getShopifyAnalyticsFT',
      description: 'Use this function to get Shopify analytics',
    }
  )
}
