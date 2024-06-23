'use client'

import * as React from 'react'

import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CheckInForm } from '@/components/forms/checkin-form'
import { Objective, KeyResult } from '@/lib/types'

interface Props {
  objective: Objective
  keyResults: KeyResult[]
  onClose: any
}

export const CheckInDialog = ({ objective, keyResults, onClose }: Props) => {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogTrigger asChild>
        <Link href="" className="w-full flex flex-col flex-full">
          Check-in
        </Link>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Objective Check-in</DialogTitle>
          <DialogDescription>Check-in on your objective.</DialogDescription>
        </DialogHeader>
        <CheckInForm objective={objective} keyResults={keyResults} />
      </DialogContent>
    </Dialog>
  )
}
