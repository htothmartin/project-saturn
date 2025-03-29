'use client';

import { BrandSection } from '@/components/BrandSection';
import { Button } from '@/components/ui/button';
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
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { AuthLayout } from '@/components/AuthLayout/AuthLayout';
import { LoginReq } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Auth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import { Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const loginSchema = z.object({
  email: z.string().email('This is not a valid email address.'),
  password: z.string(),
});

const Login = () => {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const data = await LoginReq(values.email, values.password);
      setAuth((prev: Auth) => ({ ...prev, accessToken: data.accessToken }));

      router.push('/projects');
    } catch (error) {
      console.error(error);
      toast('Login', {
        description: 'Login failed.',
      });
    }
    setIsLoading(false);
  };

  const getProviderLoginUrl = (provider: 'google' | 'github') => {
    return (
      process.env.NEXT_PUBLIC_API_URL + `/oauth2/authorization/${provider}`
    );
  };

  return (
    <AuthLayout>
      <>
        <BrandSection />
        <div className="m-auto flex w-3/4 max-w-md flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
          <h1 className="pb-4 text-4xl font-bold">Sign In</h1>
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

          <div className="flex flex-col gap-y-2 pt-4">
            <Link href={getProviderLoginUrl('google')}>
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full gap-2">
                <FcGoogle /> Google
              </Button>
            </Link>
            <Link href={getProviderLoginUrl('github')}>
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full gap-2">
                <FaGithub /> GitHub
              </Button>
            </Link>
          </div>
          <p className="mt-2 text-center">
            You don&apos;t have an account? Register{' '}
            <Link className="underline" href="/register">
              here
            </Link>{' '}
            !
          </p>
        </div>
      </>
    </AuthLayout>
  );
};

export default Login;
