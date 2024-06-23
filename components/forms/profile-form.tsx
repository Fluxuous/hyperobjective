'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useUserStore from '@/stores/use-user-store'

const profileFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  wallet: z.string().optional(),
  private: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { user, updateUser, billingAccount } = useUserStore((state) => state)

  const defaultValues: Partial<ProfileFormValues> = {
    email: '',
    name: '',
    //private: billingAccount?.private ? 'true' : 'false',
    private: 'true',
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onPrivateChange(value: string) {
    if (user) {
      updateUser({ ...user, private: value === 'true' })
      toast.success('Updated profile')
    }
  }

  //useEffect(() => {
  //  if (user) {
  //    form.reset({ name: user.name, email: user.email, private: user.private })
  //  }
  //}, [user])

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled placeholder="oberlin" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={'0'}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'0'}>{user?.email}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your account
                settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="private"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select
                onValueChange={onPrivateChange}
                value={true ? 'true' : 'false'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'false'}>Public</SelectItem>
                  <SelectItem value={'true'}>Private</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your profile will be private on the network.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
