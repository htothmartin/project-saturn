"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterReq } from "@/api/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { HttpErrorResponse } from "@/model/http-error-response";
import { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HttpErrorMessage } from "@/components/Error/http-error-message";
import { registerSchema } from "@/lib/schemas";

export const RegisterForm = (): React.JSX.Element => {
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<HttpErrorResponse | null>(null);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      await RegisterReq(
        values.email,
        values.firstname,
        values.lastname,
        values.password,
      );
      toast.success("Sucessfully registered.");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error?.response?.data as HttpErrorResponse;
        if (errors) {
          setErrors(errors);
        }
      } else {
        toast.error("Register failed");
      }
    }
    setIsLoading(false);
  };
  return (
    <Form {...registerForm}>
      <form
        method="POST"
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="my-4"
      >
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
        {errors && <HttpErrorMessage data={errors} className="mt-2" />}
        <div className="mx-auto my-4">
          <Button className="w-full text-xl" type="submit" disabled={isLoading}>
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};
