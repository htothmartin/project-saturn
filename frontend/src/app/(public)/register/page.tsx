'use client';

import { BrandSection } from '@/components/BrandSection';
import Link from 'next/link';
import { z } from 'zod';
import {
  lowerCaseRegex,
  numberRegex,
  specialRegex,
  upperCaseRegex,
} from './constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AuthLayout } from '@/components/AuthLayout/AuthLayout';
import { RegisterReq } from '@/api/auth';

const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address!'),
    firstname: z.string().min(1, 'Please enter your firstname.'),
    lastname: z.string().min(1, 'Please enter your lastname.'),
    password: z
      .string()
      .min(1, 'Please enter a password!')
      .min(8, 'Password should minimum 8 characther!')
      .refine((value) => lowerCaseRegex.test(value), {
        message: 'The password must contain atleast one lowercase character.',
      })
      .refine((value) => upperCaseRegex.test(value), {
        message: 'The password must contain atleast one uppercase character.',
      })
      .refine((value) => numberRegex.test(value), {
        message: 'The password must contain atleast one number.',
      })
      .refine((value) => specialRegex.test(value), {
        message: 'The password must contain atleast one special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  });

const Register = (): JSX.Element => {
  const { toast } = useToast();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>): void => {
    RegisterReq(
      values.email,
      values.firstname,
      values.lastname,
      values.password,
    );

    toast({
      title: 'Register',
      description: 'Sucessfully registered.',
    });
  };

  return (
    <AuthLayout>
      <>
        <BrandSection />
        <div className="m-auto flex w-3/4 max-w-md flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
          <h1 className="pb-4 text-4xl font-bold">Register</h1>
          <Form {...registerForm}>
            <form
              method="POST"
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="my-4">
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Firstname</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Lastname</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="text-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="text-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mx-auto my-4">
                <Button className="text-xl" type="submit">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center">
            You already have an account? Login{' '}
            <Link className="underline" href="/login">
              here
            </Link>
            !
          </p>
        </div>
      </>
    </AuthLayout>
  );
};

export default Register;
