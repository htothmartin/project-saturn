"use client";

import { createSprint } from "@/api/sprint/sprint";
import { DatePicker } from "@/components/Input/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSprintSchema } from "@/lib/schemas";
import { selectSprints } from "@/lib/store/features/project/projectSelectors";
import { updateSprint } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Matcher } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const CreateSprintForm = () => {
  const sprints = useAppSelector(selectSprints);
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const createSprintForm = useForm<z.infer<typeof createSprintSchema>>({
    resolver: zodResolver(createSprintSchema),
    defaultValues: {
      name: "",
    },
  });

  const disabledDates = useMemo(() => {
    if (!sprints || sprints.length === 0) {
      return [];
    }
    const matchers: Matcher[] = [];
    sprints.forEach((sprint) => {
      matchers.push({ after: sprint.startDate, before: sprint.endDate });
    });

    return matchers;
  }, [sprints]);

  const handleSubmit = async (values: z.infer<typeof createSprintSchema>) => {
    try {
      const startDate = new Date(values.startDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(values.endDate);
      endDate.setHours(0, 0, 0, 0);

      const data = await createSprint({
        ...values,
        startDate,
        endDate,
        projectId,
      });
      createSprintForm.reset();
      toast.success("Sprint added successfully");
      dispatch(updateSprint(data));
    } catch (error) {
      console.error(error);
      toast.error("There was an error during sprint creation");
    }
  };

  return (
    <Form {...createSprintForm}>
      <form
        method="POST"
        onSubmit={createSprintForm.handleSubmit(handleSubmit)}
        className="m-2 flex w-[90%] flex-col gap-4"
      >
        <FormField
          control={createSprintForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sprint name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={createSprintForm.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  disabledDates={disabledDates}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={createSprintForm.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  disabledDates={disabledDates}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="mt-2" type="submit">
          Add sprint
        </Button>
      </form>
    </Form>
  );
};
