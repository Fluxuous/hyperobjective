import { suite, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import * as PricingPage from '@/app/(marketing)/pricing/page'

suite('component', () => {
  test.skip('pricing', async () => {
    render(<PricingPage.default />)
    expect(screen.getByRole('banner')).toBeDefined()
  })
})
