'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useBillingAccount } from '@/lib/hooks/use-billing-account'

export default function Modals() {
  const router = useRouter()
  const pathname = usePathname()

  const [showModal, setShowModal] = useState(true)

  const [pendingOpen, setPendingOpen] = useState(false)
  const [billingOpen, setBillingOpen] = useState(false)

  const { billingAccount, isLoading } = useBillingAccount()

  useEffect(() => {
    if (!showModal) {
      return
    }

    const handleUnapprovedAccount = () => {
      if (pathname !== '/pending') {
        router.push('/pending')
      } else {
        setPendingOpen(true)
        setShowModal(false)
      }
    }

    const handleApprovedAccountWithoutSubscription = () => {
      if (pathname !== '/settings/billing') {
        router.push('/settings/billing')
      } else {
        setBillingOpen(true)
        setShowModal(false)
      }
    }

    const redirectToSignIn = () => {
      router.push('/signin')
    }

    if (billingAccount) {
      if (!billingAccount.approved) {
        handleUnapprovedAccount()
      } else if (!billingAccount.stripeSubscriptionId) {
        handleApprovedAccountWithoutSubscription()
      }
    } else if (!isLoading) {
      redirectToSignIn()
    }
  }, [
    pendingOpen,
    billingOpen,
    showModal,
    billingAccount,
    pathname,
    router,
    isLoading,
  ])

  function PendingDialog() {
    return (
      <AlertDialog open={pendingOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approval Pending</AlertDialogTitle>
            <AlertDialogDescription>
              Thank your signing up for closed beta. We are currently reviewing
              your request and will be in touch to discuss your needs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setPendingOpen(false)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  function BillingDialog() {
    return (
      <AlertDialog open={billingOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Billing Pending</AlertDialogTitle>
            <AlertDialogDescription>
              Your account has been approved. To get started, please select a
              billing plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setBillingOpen(false)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <>
      <PendingDialog />
      <BillingDialog />
    </>
  )
}
