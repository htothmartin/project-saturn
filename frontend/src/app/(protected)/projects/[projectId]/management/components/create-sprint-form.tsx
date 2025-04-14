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
import { z } from "zod";

export const CreateSprintForm = () => {
  const sprints = useAppSelector(selectSprints);
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const createSprintForm = useForm<z.infer<typeof createSprintSchema>>({
    resolver: zodResolver(createSprintSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
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
      const data = await createSprint({ ...values, projectId });
      dispatch(updateSprint(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...createSprintForm}>
      <form
        method="POST"
        onSubmit={createSprintForm.handleSubmit(handleSubmit)}
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
            <FormItem>
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
            <FormItem>
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
        <Button type="submit">Add sprint</Button>
      </form>
    </Form>
  );
};
