import MarketingMain from '@/components/marketing/marketing-main'

export default function Page() {
  return (
    <MarketingMain>
      <section className="container flex flex-col  gap-6 py-8 md:max-w-5xl md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Contact
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Please contact us at{' '}
            <a className="underline" href="mailto:hello@hyperobjective.capital">
              hello@hyperobjective.capital
            </a>
            .
          </p>
        </div>
      </section>
    </MarketingMain>
  )
}
