import { changePassword } from "@/api/user/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const PasswordReset = (): React.JSX.Element => {
  const passwordResetForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      await changePassword({ ...values });
      toast.success("Password successfully changed");
    } catch (_) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="my-4 text-xl">Password reset</h3>
      <Form {...passwordResetForm}>
        <form
          method="POST"
          onSubmit={passwordResetForm.handleSubmit(handleSubmit)}
        >
          <FormField
            control={passwordResetForm.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={passwordResetForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={passwordResetForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center">
            <Button className="my-4" type="submit">
              Change password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
