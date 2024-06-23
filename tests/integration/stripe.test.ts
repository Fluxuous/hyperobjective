import { suite, expect, test } from 'vitest'

import {
  createCustomerSubscription,
  createCustomer,
  deleteCustomer,
  getProPlan,
  createAndAttachPaymentMethod,
  getCustomer,
  getCustomerPaymentMethods,
  updateCustomer,
  getCustomerSubscriptionPriceId,
  cancelSubscription,
  createCreditMeterEvent,
  getCreditMeterUsage,
  getSubscriptionUsageId,
  getCustomerTotalTokenUsage,
  getSubscriptionId,
  maybeRateLimitError,
} from '@/lib/vendor/stripe'
import { user } from '@/tests/mocks/user'
import { MISSING_BILLING_ACCOUNT } from '@/lib/constants'

suite.skip('integration.stripe', () => {
  let customerId: string
  let paymentMethodId: string
  let subscriptionId: string
  let subscriptionUsageId: string

  test('maybeRateLimitError', async () => {
    const error = await maybeRateLimitError('1')
    expect(error).toBe(MISSING_BILLING_ACCOUNT)
  })

  test('maybeRateLimitError', async () => {
    const error = await maybeRateLimitError(user.id)
    expect(error).toBeUndefined()
  })

  test('createCustomer', async () => {
    const customer = await createCustomer('test@hyperobjective.capital')
    expect(customer).not.toBeNull()
    customerId = customer.id
  })

  test('attachPaymentMethod', async () => {
    const paymentMethod = await createAndAttachPaymentMethod(customerId, {
      token: 'tok_visa',
    })
    expect(paymentMethod.id).toBeDefined()
    paymentMethodId = paymentMethod.id
  })

  test('updateCustomer', async () => {
    const updatedCustomer = await updateCustomer(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })
    expect(updatedCustomer.invoice_settings.default_payment_method).toBe(
      paymentMethodId
    )
  })

  test('getCustomer', async () => {
    const customer = await getCustomer(customerId)
    expect(customer.id).toBe(customerId)
  })

  test('getCustomerPaymentMethods', async () => {
    const paymentMethods = await getCustomerPaymentMethods(customerId)
    expect(paymentMethods.data.length).toBe(1)
  })

  test('createSubscription', async () => {
    const proPlan = await getProPlan()
    const subscription = await createCustomerSubscription(
      customerId,
      proPlan.stripePriceId
    )
    expect(subscription.id).toBeDefined()
    subscriptionId = subscription.id
    subscriptionUsageId = subscription.items.data[0].id
  })

  test('getSubscriptionId', async () => {
    const id = await getSubscriptionId(customerId)
    expect(id).toBe(subscriptionId)
  })

  test('getSubscriptionUsageId', async () => {
    const id = await getSubscriptionUsageId(subscriptionId)
    expect(id).toBe(subscriptionUsageId)
  })

  test('getCustomerSubscription', async () => {
    const proPlan = await getProPlan()
    const subscriptionPriceId = await getCustomerSubscriptionPriceId(customerId)
    expect(subscriptionPriceId).toBe(proPlan.stripePriceId)
  })

  test('createCreditMeterEvent', async () => {
    const meterEvent = await createCreditMeterEvent(subscriptionUsageId, 9)
    expect(meterEvent.quantity).toBe(9)
    const finalMeterEvent = await createCreditMeterEvent(subscriptionUsageId, 1)
    expect(finalMeterEvent.quantity).toBe(10)
  })

  test('getCreditMeterUsage', async () => {
    const meterUsage = await getCreditMeterUsage(subscriptionUsageId)
    expect(meterUsage.data[0].total_usage).toBe(10)
  })

  test('getTotalCustomerMeterUsage', async () => {
    const totalUsage = await getCustomerTotalTokenUsage(customerId)
    expect(totalUsage).toBe(10)
  })

  test('rateLimitUsage', async () => {
    expect(true).toBe(true)
  })

  test('cancelSubscription', async () => {
    const res = await cancelSubscription(subscriptionId)
    expect(res.canceled_at).toBeDefined()
  })

  test('deleteCustomer', async () => {
    const res = await deleteCustomer(customerId)
    expect(res.deleted).toBe(true)
  })
})
