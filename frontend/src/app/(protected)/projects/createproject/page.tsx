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
import { useState } from 'react';
import { useUploadThing } from '@/utils/uploadthing';
import { createNewProject } from '@/api/project';
import { toast } from 'sonner';

const CreateProject = (): JSX.Element => {
  type Inputs = z.infer<typeof createProjectSchema>;
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const projectForm = useForm<Inputs>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: '',
      projectDescription: '',
      projectImage: undefined,
      projectKey: '',
    },
  });

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: (files) => {
      setImageUrl(files[0].url);
      console.log('uploaded successfully!');
    },
    onUploadError: () => {
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      console.log('upload has begun for');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    try {
      if (file) {
        await startUpload([file]);
      }

      await createNewProject({
        name: data.projectName,
        description: data.projectDescription ?? '',
        imageUrl: imageUrl,
        key: data.projectKey,
      });
      toast('Project successfuly created');
    } catch {
      toast('An error occured');
    } finally {
      setIsLoading(false);
    }
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
                      <Input {...field} />
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
                name="projectImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project description</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                          setFile(file);
                        }}
                      />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
