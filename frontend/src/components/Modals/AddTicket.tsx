import { createTicket } from '@/api/ticket';
import { IssueType } from '@/enums/IssueType';
import { TicketPriority } from '@/enums/TicketPriority';
import { addTicketSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useParams } from 'next/navigation';

export const AddTicket = (): JSX.Element => {
  type Inputs = z.infer<typeof addTicketSchema>;
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const ticketForm = useForm<Inputs>({
    resolver: zodResolver(addTicketSchema),
    defaultValues: {
      ticketTitle: '',
      ticketDescription: '',
      ticketPriority: TicketPriority.MEDIUM,
      issueType: IssueType.TASK,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await createTicket({
        title: data.ticketTitle,
        description: data.ticketDescription ?? '',
        priority: data.ticketPriority,
        type: data.issueType,
        projectId: Number(projectId),
      });
      toast('Ticket successfully added');
    } catch {
      toast('An error occured');
    }
  };

  return (
    <Form {...ticketForm}>
      <form method="POST" onSubmit={ticketForm.handleSubmit(onSubmit)}>
        <FormField
          control={ticketForm.control}
          name="ticketTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ticketForm.control}
          name="ticketDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ticketForm.control}
          name="ticketPriority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(TicketPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={ticketForm.control}
          name="issueType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    {Object.values(IssueType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex justify-center">
          <Button type="submit" className="w-52">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
