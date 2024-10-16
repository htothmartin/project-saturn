'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createProjectSchema } from '@/lib/schemas';
import { CreateNewProjectAction } from './_actions';

const CreateProject = (): JSX.Element => {
  type Inputs = z.infer<typeof createProjectSchema>;

  const projectForm = useForm<Inputs>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(projectForm);
    console.log(data);
    const result = CreateNewProjectAction(data);
    console.log('finish');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-login">
      <Card className="w-6/12">
        <CardHeader>
          <CardTitle>Create a new project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...projectForm}>
            <form method="POST" onSubmit={projectForm.handleSubmit(onSubmit)}>
              <FormField
                control={projectForm.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={projectForm.control}
                name="projectDescription"
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
                name="projectKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project key</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6 flex justify-center">
                <Button
                  type="submit"
                  disabled={projectForm.formState.isLoading}
                  className="w-52">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
