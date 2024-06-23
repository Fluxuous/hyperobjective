'use client'

import * as React from 'react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import useUserStore from '@/stores/use-user-store'
import CycleDropdownMenu from '@/components/menus/cycles-dropdown-menu'
import { Cycle } from '@/lib/types'

interface Props {
  cycle?: Cycle
}

export const CycleDialog = ({ cycle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const createCycle = useUserStore((state) => state.createCycle)
  const updateCycle = useUserStore((state) => state.updateCycle)
  const deleteCycle = useUserStore((state) => state.deleteCycle)

  const activeProject = useUserStore((state) => state.activeProject)

  const FormSchema = z.object({
    quarter: z.coerce.number(),
    year: z.coerce.number(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quarter: cycle?.quarter ?? 1,
      year: cycle?.year ?? 2024,
    },
  })

  const onClickSave = async () => {
    setIsLoading(true)

    const valid = await form.trigger()
    if (!valid) {
      return
    }

    const { quarter, year } = form.getValues()
    if (cycle?.id) {
      await updateCycle({ ...cycle, quarter, year })
    } else {
      await createCycle({
        quarter,
        year,
        projectId: activeProject?.id ?? '',
      })
    }

    setIsLoading(false)
    setOpen(false)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('onSubmit', data)
  }

  if (activeProject) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
              {cycle?.id ? (
                <CycleDropdownMenu
                  setOpen={setOpen}
                  deleteCycle={async () => {
                    await deleteCycle(cycle?.id)
                    setOpen(false)
                  }}
                />
              ) : (
                <Button
                  className="m-0"
                  variant="default"
                  onClick={() => setOpen(true)}
                >
                  New Cycle
                </Button>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{cycle?.id ? 'Edit' : 'New'} Cycle</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="quarter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quarter</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription></FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                {cycle?.id ? (
                  <Button
                    variant="destructive"
                    disabled={isLoading}
                    onClick={async () => {
                      await deleteCycle(cycle.id)
                      setOpen(false)
                    }}
                  >
                    Delete
                  </Button>
                ) : null}
                <div className="xs:block md:hidden mt-2"></div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={onClickSave}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    )
  }
}
