"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createProjectSchema } from "@/lib/schemas";
import { useState } from "react";
import { createNewProject } from "@/api/project/project";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { fetchProjects } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch } from "@/lib/store/hooks";

export const CreateProject = (): React.JSX.Element => {
  type Inputs = z.infer<typeof createProjectSchema>;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const projectForm = useForm<Inputs>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      key: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    try {
      await createNewProject({
        name: data.name,
        description: data.description ?? "",
        key: data.key,
      });

      toast("Project successfuly created");
      dispatch(fetchProjects());
      router.push(pathname);
    } catch {
      toast("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...projectForm}>
      <form method="POST" onSubmit={projectForm.handleSubmit(onSubmit)}>
        <FormField
          control={projectForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project key</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex justify-center">
          <Button type="submit" disabled={isLoading} className="w-52">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
