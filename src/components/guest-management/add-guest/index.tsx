import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { THost, TRole } from '@/context/guest'
import { useGuestContext } from '@/hooks/context/useGuestContext'
import { TAddGuestsRequest } from '@/types'

const roleList = ['ông', 'bà', 'anh', 'chị', 'em', 'thầy', 'cô', 'bạn']
const hostList = ['thoan', 'thinh']

const GuestSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  nameInInvitation: z.string().min(1, {
    message: 'Name in invitation is required',
  }),
  host: z.custom<THost>(
    (value) => {
      if (hostList.includes(value)) return value
      return undefined
    },
    {
      message: 'Host is required',
    },
  ),
  role: z.custom<TRole>(
    (value) => {
      if (roleList.includes(value)) return value
      return undefined
    },
    {
      message: 'Role is required',
    },
  ),
})

type GuestSchemaType = z.infer<typeof GuestSchema>

const defaultValues: GuestSchemaType = {
  name: '',
  nameInInvitation: '',
  host: 'thoan',
  role: 'bạn',
}

const AddGuest = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    state: { isLoading },
    actions: { addGuest },
  } = useGuestContext()
  const form = useForm<z.infer<typeof GuestSchema>>({
    resolver: zodResolver(GuestSchema),
    defaultValues,
  })

  const handleSubmit = form.handleSubmit((data) => {
    const postData: TAddGuestsRequest = {
      ...data,
      isAttending: null,
      wishes: '',
    }
    addGuest(postData, {
      onSuccess: () => {
        form.reset(defaultValues)
        setIsDialogOpen(false)
      },
    })
  })

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Guest</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Guest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter guest name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameInInvitation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name in invitation*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name in invitation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role*</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleList.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host*</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select host" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hostList.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button disabled={isLoading} loading={isLoading} onClick={handleSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddGuest
