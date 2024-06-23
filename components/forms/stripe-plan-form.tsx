'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useState } from 'react'

import { SubscriptionPlan } from '@/lib/types'
import { IconSpinner } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: SubscriptionPlan | null
  subscriptionPlans: SubscriptionPlan[]
}

export function StripeBillingForm({
  subscriptionPlan,
  subscriptionPlans,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formSchema = z.object({
    plan: z.string(),
  })

  type FormValues = z.infer<typeof formSchema>

  const defaultValues: Partial<FormValues> = {
    plan: subscriptionPlan?.stripePriceId ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  })

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(!isLoading)

    const response = await fetch('/api/users/stripe', {
      method: 'POST',
      body: JSON.stringify({
        stripePriceId: form.getValues('plan'),
        mode: 'subscription',
      }),
    })

    if (!response?.ok) {
      setIsLoading(false)
      return toast.error('Please refresh the page and try again.')
    }

    // Redirect to the Stripe session checkout page for initial upgrade
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Select
                  disabled={!!subscriptionPlan?.stripePriceId}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptionPlans.map((plan) => (
                      <SelectItem
                        key={plan.stripePriceId}
                        value={plan.stripePriceId}
                      >
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || !form.getValues('plan')}>
          {isLoading && <IconSpinner className="mr-2 size-4 animate-spin" />}
          Update Plan
        </Button>
      </form>
    </Form>
  )
}
