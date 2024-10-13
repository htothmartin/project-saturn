'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { z } from 'zod';
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
import { createProject } from '@/api/project';
import { Project } from '@/model/project';

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    // Max 5MB
    message: 'A fájl mérete nem lehet több, mint 5MB',
  })
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Csak JPEG vagy PNG formátumú fájlokat fogadunk el',
  });

const createProjectSchema = z.object({
  projectName: z.string().min(1, 'The project name is required.'),
  projectDescription: z.string().optional(),
  projectIcon: fileSchema,
  projectKey: z
    .string()
    .min(2, 'The project key is required.')
    .max(6, "The porject key can't be longer than 6 character."),
});

const CreateProject = (): JSX.Element => {
  const [pending, setPending] = useState<boolean>(false);
  const createProjectForm = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: '',
      projectDescription: '',
      projectIcon: undefined,
      projectKey: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    setPending(true);
    const newProject: Project = {
      name: values.projectName,
      description: values.projectDescription ?? '',
      imageUrl: '',
      key: values.projectKey,
    };
    await createProject(newProject);
    console.log(values);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-login">
      <Card className="w-6/12">
        <CardHeader>
          <CardTitle>Create a new project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createProjectForm}>
            <form
              method="POST"
              onSubmit={createProjectForm.handleSubmit(onSubmit)}>
              <FormField
                control={createProjectForm.control}
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
                control={createProjectForm.control}
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
                control={createProjectForm.control}
                name="projectIcon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project icon</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createProjectForm.control}
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
                <Button type="submit" disabled={pending} className="w-52">
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
