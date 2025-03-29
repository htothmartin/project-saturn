'use client';

import { LoginReq } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Auth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { HttpErrorResponse } from '@/model/http-error-response';
import { HttpErrorMessage } from '@/components/Error/http-error-message';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { OAuthLogin } from './oauth-login';

export const LoginForm = (): JSX.Element => {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [errors, setErrors] = useState<HttpErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const data = await LoginReq(values.email, values.password);
      setAuth((prev: Auth) => ({ ...prev, accessToken: data.accessToken }));

      router.push('/projects');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error?.response?.data as HttpErrorResponse;
        if (errors) {
          setErrors(errors);
        }
      } else {
        toast.error('Login failed');
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form {...loginForm}>
        <form
          method="POST"
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="my-4">
          <FormField
            control={loginForm.control}
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
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="password"
                    {...field}
                    className="text-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors && <HttpErrorMessage data={errors} className="mt-2" />}
          <div className="mx-auto my-4">
            <Button
              className="w-full text-xl"
              type="submit"
              disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="rounded bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <OAuthLogin isLoading={isLoading} />
    </>
  );
};
