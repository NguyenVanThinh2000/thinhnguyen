import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { useUserContext } from '@/hooks/context'
import { cn } from '@/lib/utils'
import { path } from '@/router'

const LoginSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
})

const Login = () => {
  const navigator = useNavigate()
  const {
    state: { isAuth },
    actions: { login },
  } = useUserContext()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    login(data)
  })

  useEffect(() => {
    if (isAuth) {
      console.log('isAuth', isAuth)
      // navigator(path.task)
    }
  }, [isAuth])

  return (
    <div className={cn('flex min-h-screen items-center justify-center')}>
      <Card className={cn('w-[380px]')}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
