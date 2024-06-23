'use client'

import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DocumentForm } from '@/components/forms/document-form'
import { Button } from '@/components/ui/button'
import { DocumentUpload } from '@/lib/types'

interface Props {
  document?: DocumentUpload
  className?: string
}

export default function DocumentSheet({ document }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        {document?.id ? (
          'Hi'
        ) : (
          <Button className="m-0 button">New Document</Button>
        )}
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{document?.id ? 'Edit' : 'New'} Document</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <DocumentForm setOpen={setOpen} document={document} />
      </SheetContent>
    </Sheet>
  )
}
