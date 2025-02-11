import Link from 'next/link'

import MarketingMain from '@/components/marketing/marketing-main'
import { IconCheck } from '@/components/icons'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Open Source Models'],
    },
    {
      name: 'Pro',
      price: '$249',
      features: ['Marketplace', 'Beta Feature Access'],
    },
    {
      name: 'Enterprise',
      price: 'Call',
      features: ['Custom Development', 'Alpha Feature Access'],
    },
  ]

  return (
    <MarketingMain>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Simple and transparent pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Unlock all features including unlimited posts for your blog.
          </p>
        </div>
        {plans.map((plan, i) => (
          <div
            key={i}
            className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]"
          >
            <div className="grid gap-6">
              <h3 className="text-xl font-bold sm:text-2xl">
                What&apos;s included in the {plan.name} plan
              </h3>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <IconCheck className="mr-2 size-4" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 text-center">
              <div>
                <h4 className="text-5xl font-bold">{plan.price}</h4>
                <p className="text-sm font-medium text-muted-foreground">
                  Billed Monthly
                </p>
              </div>
              <Link
                href="/signup"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                Get Started
              </Link>
            </div>
          </div>
        ))}
        <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            <strong>You can change your plan at any time.</strong>
          </p>
        </div>
      </section>
    </MarketingMain>
  )
}
