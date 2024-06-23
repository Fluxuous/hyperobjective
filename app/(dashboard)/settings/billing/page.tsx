import { Separator } from '@/components/ui/separator'
import { StripeBillingForm } from '@/components/forms/stripe-plan-form'
import { getSubscriptionPlans } from '@/lib/vendor/stripe'
import { getUserSubscriptionPlan } from '@/lib/helpers'
import { tryUserId } from '@/lib/db/safe'

export default async function Page() {
  const userId = await tryUserId()
  const subscriptionPlan = await getUserSubscriptionPlan(userId)
  const subscriptionPlans = await getSubscriptionPlans()
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>
      <Separator />
      <StripeBillingForm
        subscriptionPlan={subscriptionPlan}
        subscriptionPlans={subscriptionPlans}
      />
    </div>
  )
}
