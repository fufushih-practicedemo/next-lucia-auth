'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const SignInForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
          email: '',
          password: ''
      },
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                type='email'
                                placeholder='Enter your email...'
                                {...field}
                            />
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
                            <Input
                                type='password'
                                placeholder="Enter your password..."
                                {...field}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim();
                                    field.onChange(e);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type='submit' className='self-start'>
                Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
