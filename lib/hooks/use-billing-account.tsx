import * as React from 'react'
import { useState, useEffect, useContext, createContext } from 'react'

import { safeFetchOrCreateBillingAccount } from '@/lib/db/helpers'
import { BillingAccount } from '@/lib/types'

interface BillingAccountContext {
  billingAccount: BillingAccount | null
  isLoading: boolean
}

const BillingAccountContext = createContext<BillingAccountContext | undefined>(
  undefined
)

export function useBillingAccount() {
  const context = useContext(BillingAccountContext)
  if (!context) {
    throw new Error(
      'useBillingAccount must be used within a BillingAccountProvider'
    )
  }
  return context
}

interface Props {
  children: React.ReactNode
}

export function BillingAccountProvider({ children }: Props) {
  const [isLoading, setLoading] = useState(true)
  const [billingAccount, setBillingAccount] = useState<BillingAccount | null>(
    null
  )

  useEffect(() => {
    try {
      safeFetchOrCreateBillingAccount()
        .then((billingAccount) => {
          setBillingAccount(billingAccount)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching billing account', error)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.error('Error fetching billing account', error)
      setLoading(false)
    }
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <BillingAccountContext.Provider
      value={{
        billingAccount,
        isLoading,
      }}
    >
      {children}
    </BillingAccountContext.Provider>
  )
}
