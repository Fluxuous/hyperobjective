'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import localFont from 'next/font/local'
import 'reveal.js/dist/reveal.css'

import Image from 'next/image'

const manrope = localFont({
  src: '../../fonts/manrope-variable.ttf',
  variable: '--font-manrope',
})

export function Deck() {
  const deckDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clientSideInitialization = async () => {
      const Reveal = (await import('reveal.js')).default
      Reveal.initialize({
        autoPlayMedia: true,
      })
      const Markdown = (await import('reveal.js/plugin/markdown/markdown.esm'))
        .default
      const deck = new Reveal({
        plugins: [Markdown],
      })
      deck.initialize()
    }
    clientSideInitialization()
  })

  return createPortal(
    <div
      className="reveal bg-background text-foreground text-2xl"
      ref={deckDivRef}
    >
      <div className="p-4 text-lg text-zinc-500 absolute top-0 left-0 text-center w-full">
        Confidential and Subject to Change
      </div>
      <div className={`slides ${manrope.className}`}>
        <section data-auto-animate>
          <div className="bg-gradient-to-r from-green-600 via-yellow-600 to-pink-600 dark:from-green-300 dark:via-yellow-300 dark:to-pink-300 text-transparent bg-clip-text inline-block">
            <span className="text-6xl" style={{ lineHeight: '1.5' }}>
              Hyperobjective{' '}
            </span>
          </div>
          <div className="flex justify-center items-center">
            Build, Fund and Trade Projects
          </div>
        </section>
        <section>
          OpenAI CEO Sam Altman says we are not far from a{' '}
          <a
            className="underline"
            href="https://twitter.com/alexisohanian/status/1752760832751239328?s=20"
            target="_blank"
          >
            one-person Unicorn
          </a>
          ... but what happens after that?
        </section>
        <section data-auto-animate>
          How about a self-sovereign Project Unicorn?
        </section>
        <section>🤔 🤩 🫠</section>
        <section>
          Problem: How do you support the next generation of builders, VCs and
          LPs in creating the future economy?
        </section>
        <section>
          Exponential innovation, an unpredictable future and technical
          projectlity make this difficult.
        </section>
        <section>Solution: Project RLHF network infrastructure</section>
        <section>
          We provide the tools users need to effectively build, fund and trade
          Project.
        </section>
        <section>Where is the 10x innovation here?</section>
        <section>
          Our core technology consists of a vendor agnostic, intent-based LLM
          router where users can program tokenized Project using natural
          language, measure and manage Project cost and performance, and provide
          liquidity to power the entire network.
        </section>
        <section>
          &quot;Kind of like if{' '}
          <a className="underline" href="https://jup.ag" target="_blank">
            Jupiter
          </a>{' '}
          and <a href="https://opensea.io">OpenSea</a> had a baby, but for
          AI&quot;
        </section>
        <section>
          <a
            className="underline"
            target="_blank"
            href="https://vimeo.com/944467993"
          >
            Demo
          </a>
        </section>
        <section>Who is the team?</section>
        <section>
          Hi, this is{' '}
          <a
            className="underline"
            href="https://t.me/oberlinstands"
            target="_blank"
          >
            @oberlinstands
          </a>
          , programmer, entrepreneur and investor working on AI and crypto
          startups since 2016.
        </section>
        <section>What do we need?</section>
        <section>
          Hyperobjective is seeking builders, partnerships, and strategic LPs or
          ecosystem grants for our active closed beta.
        </section>
        <section>
          <div className="text-xs">
            The information contained in this pitch deck is confidential and
            proprietary to Hyperobjective Capital Management LLC (&quot;The
            Company&quot;). It is intended solely for the use of the recipient
            and should not be shared, distributed, or reproduced without the
            express written consent of The Company. The content provided is for
            informational purposes only and does not constitute an offer to sell
            or a solicitation of an offer to buy any securities. The Company
            does not make any representations or warranties, express or implied,
            as to the accuracy, completeness, or reliability of the information
            contained herein. Any investment or business decisions made based on
            this information are the sole responsibility of the recipient. The
            Company shall not be liable for any direct, indirect, incidental,
            consequential, or special damages arising out of or in connection
            with the use of this pitch deck or its contents.
          </div>
        </section>
        <section>Thanks!</section>
        <section>Notes</section>
        <section>
          Where does the name &quot;Hyperobjective&quot; come from?
        </section>
        <section>
          <a
            className="underline"
            href="https://hyperobjective.xyz/share/chat/clwj8xisl00pv681znlh0zb9w"
            target="_blank"
          >
            Hyperobjects
          </a>{' '}
          are complex systems or concepts that transcend individual human
          experiences and categories. &quot;Hyperobjective&quot; is a play on
          words combining &quot;hyperobject&quot; and &quot;objective&quot; from
          the{' '}
          <a
            className="underline"
            href="https://hyperobjective.xyz/share/chat/clwj8wi4100po681z6l0794zh"
            target="_blank"
          >
            OKR
          </a>{' '}
          management science methodology.
        </section>
        <section>
          <span className="w-full flex items-center justify-center">
            <Image alt="logo" src="/logo.png" height={200} width={200} />
          </span>
        </section>
      </div>
      <div className="p-4 text-lg text-zinc-500 absolute bottom-0 left-0 text-center w-full">
        © 2024 Hyperobjective Capital Management LLC 2024
      </div>
    </div>,
    document.body
  )
}
