import { ActiveProject } from "@/model/project";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { comapreFields } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { updateProjectSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/api/project/project";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  fetchActiveProjectSuccess,
  fetchProjects,
} from "@/lib/store/features/project/projectSlice";
import { toast } from "sonner";
import { Select } from "@/components/Input/Select";
import { ProjectStatus } from "@/enums/ProjectStatus";
import { SelectOption } from "@/components/Input/type";

type Props = {
  activeProject: ActiveProject;
  className?: string;
};

export const UpdateProjectForm = ({
  activeProject,
  className,
}: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const updateProjectForm = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: activeProject.name,
      description: activeProject.description,
      key: activeProject.key,
      status: activeProject.status,
    },
  });

  const values = useWatch({ control: updateProjectForm.control });

  const isValuesChanged = useMemo(() => {
    return !comapreFields(
      activeProject,
      values,
      Object.keys(updateProjectSchema.shape) as (keyof z.infer<
        typeof updateProjectSchema
      >)[],
    );
  }, [values, activeProject]);

  const onSave = async (values: z.infer<typeof updateProjectSchema>) => {
    try {
      setIsEditing(false);
      const { data } = await updateProject(activeProject.id, values);
      dispatch(fetchActiveProjectSuccess(data));
      dispatch(fetchProjects());
      toast.success("Successfully updated the project");
    } catch (error) {
      console.error(error);
    }
  };

  const projectStatusOptions: SelectOption<string>[] = Object.values(
    ProjectStatus,
  ).map((status) => ({
    id: status,
    data: status,
  }));

  return (
    <Form {...updateProjectForm}>
      <form
        method="POST"
        className={className}
        onSubmit={updateProjectForm.handleSubmit(onSave)}
      >
        <FormField
          control={updateProjectForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={updateProjectForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project description</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={!isEditing} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={updateProjectForm.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project key</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={updateProjectForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project status</FormLabel>
              <FormControl>
                <Select
                  label=""
                  placeholder="Select status"
                  selectedValue={{ id: field.value, data: field.value }}
                  options={projectStatusOptions}
                  onSelect={field.onChange}
                  disabled={!isEditing}
                ></Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="my-4 flex items-center justify-center gap-4">
          <Button type="submit" disabled={!isValuesChanged}>
            Save
          </Button>
          <Button type="button" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
};
