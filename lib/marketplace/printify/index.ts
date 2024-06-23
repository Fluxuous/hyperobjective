'use server'

import { FunctionTool } from 'llamaindex'
import { PrintifyClient } from 'printify-nodejs'

import {
  Product,
  GetBlueprintsResponse,
  GetAllProductsResponse,
  GetShopsResponse,
  PublishProductResponse,
  PublishProductPayload,
} from '@/lib/marketplace/printify/types'
import { getDefaultProduct } from '@/lib/marketplace/printify/helpers'
import { PrintifyError } from '@/lib/marketplace/printify/errors'

import { nanoid } from '@/lib/utils'

const client = new PrintifyClient({
  token: process.env.PRINTIFY_API_TOKEN as string,
  version: 'v1',
  debug: false,
})

export const getOrders = async (shopId: number) => {
  return await client.getOrders(shopId)
}

export const getShops = async (): Promise<{
  data: GetShopsResponse | null
  error: PrintifyError | null
}> => {
  return await client.getShops()
}

export const getBlueprints = async (): Promise<{
  data: GetBlueprintsResponse | null
  error: PrintifyError | null
}> => {
  return await client.getBlueprints()
}

export const getAllProducts = async (
  shopId: number
): Promise<{
  data: GetAllProductsResponse | null
  error: PrintifyError | null
}> => {
  return await client.getAllProducts(shopId)
}

export const getByBlueprintId = async (blueprintId: number): Promise<any> => {
  return await client.getBlueprintById(blueprintId)
}

export const uploadImage = async (url: string) => {
  return await client.uploadImage({ url, file_name: nanoid() })
}

export const createAndPublishTee = async (
  shopId: number,
  title: string,
  imageUrl: string
) => {
  const imageRes = await uploadImage(imageUrl)
  if (!imageRes.data) {
    throw new Error('Image upload failed')
  }

  const product = getDefaultProduct(title, imageRes.data.id)
  const productRes = await createProduct(shopId, product)
  if (!productRes.data) {
    throw new Error('Product creation failed')
  }

  const payload = {
    title: true,
    description: true,
    images: true,
    variants: true,
    tags: true,
    keyFeatures: true,
    shipping_template: true,
  }

  return await publishProduct(shopId, productRes.data.id, payload)
}

export const createProduct = async (
  shoptId: number,
  product: any
): Promise<{
  data: Product | null
  error: PrintifyError | null
}> => {
  return await client.createProduct(shoptId, product)
}

export const publishProduct = async (
  shoptId: number,
  productId: string,
  payload: PublishProductPayload
): Promise<{
  data: PublishProductResponse | null
  error: PrintifyError | null
}> => {
  return await client.publishProduct(shoptId, productId, payload)
}

export const createAndPublishPrintifyTeeFT = async () => {
  return new FunctionTool(
    async ({ title, imageUrl }: { title: string; imageUrl: string }) => {
      // TODO: Get the shopId dynamically instead of hardcoded
      const shopId = 15484944
      const res = await createAndPublishTee(shopId, title, imageUrl)
      if (res.error) {
        return JSON.stringify(res.error)
      }
      return JSON.stringify(res)
    },
    {
      name: 'createAndPublishTee',
      description:
        'Use this function to create and publish a T-shirt on your Shopify store using Printify.',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'The tee product title',
          },
          imageUrl: {
            type: 'string',
            description: 'The URL for the image used on the T-shirt',
          },
        },
        required: ['title', 'imageUrl'],
      },
    }
  )
}

export const getPrintifyStatusFT = async () => {
  return new FunctionTool(
    async () => {
      const res = {
        status: 'online',
        message: 'Printify is online and functioning correctly.',
      }
      return JSON.stringify(res)
    },
    {
      name: 'getPrintifyStatus',
      description: 'Use this function to get the status of Printify',
    }
  )
}
