import { suite, expect, test } from 'vitest'

import {
  getShops,
  getBlueprints,
  getOrders,
  getByBlueprintId,
  getAllProducts,
  createProduct,
  uploadImage,
  publishProduct,
  createAndPublishTee,
} from '@/lib/marketplace/printify'
import { getDefaultProduct } from '@/lib/marketplace/printify/helpers'
import { nanoid } from '@/lib/utils'

suite.skip('unit.marketplace.printify', () => {
  // Hardcoded for testing purposes need to be updated
  const shopId = 15484944
  const americanApparelBlueprintId = 167
  const url = 'https://hyperobjective.xyz/favicon.ico'
  const imageId = '662058085184611c6bd95a33'
  const productId = '662134fcfceba6802001ea26'

  test('getShops', async () => {
    const res = await getShops()
    expect(res.data).toBeDefined()
  })

  test('getBlueprints', async () => {
    const res = await getBlueprints()
    expect(res.data).toBeDefined()
  })

  test('getBlueprintById', async () => {
    const res = await getByBlueprintId(americanApparelBlueprintId)
    expect(res.data).toBeDefined()
  })

  test('getAllProducts', async () => {
    const res = await getAllProducts(shopId)
    expect(res.data).toBeDefined()
  })

  test('getOrders', async () => {
    const res = await getOrders(shopId)
    expect(res.data).toBeDefined()
  })

  test('uploadImage', async () => {
    const res = await uploadImage(url)
    expect(res.data).toBeDefined()
  })

  test('createProduct', async () => {
    const product = getDefaultProduct(nanoid(), imageId)
    const res = await createProduct(shopId, product)
    expect(res.data).toBeDefined()
  })

  test('publishProduct', async () => {
    const payload = {
      title: true,
      description: true,
      images: true,
      variants: true,
      tags: true,
      keyFeatures: true,
      shipping_template: true,
    }
    const res = await publishProduct(shopId, productId, payload)
    expect(res.data).toBeDefined()
  })

  test('createAndPublishTee', async () => {
    const title = nanoid()
    const res = await createAndPublishTee(shopId, title, url)
    expect(res.data).toBeDefined()
  })
})
