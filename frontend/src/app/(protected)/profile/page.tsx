"use client";

import { updateUser, uploadProfileImage } from "@/api/user";
import { ErrorMessage } from "@/components/Error/error-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserDetialsSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ConnectedAccounts } from "./components/connected-accounts";
import { Separator } from "@/components/ui/separator";
import { getMonogram } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { setCurrentUser } from "@/lib/store/features/session/session-slice";

const Profile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadError, setImageUploadError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useAppSelector(selectSession);

  const updateUserDetailsForm = useForm<
    z.infer<typeof updateUserDetialsSchema>
  >({
    resolver: zodResolver(updateUserDetialsSchema),
    defaultValues: {
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
    },
  });

  const values = useWatch({ control: updateUserDetailsForm.control });

  const hasChangedValue = useMemo(() => {
    return (
      values.firstname !== currentUser?.firstname ||
      values.lastname !== currentUser?.lastname
    );
  }, [values, currentUser]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageUploadError(false);
      setFile(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) {
      setImageUploadError(true);
      return;
    }

    try {
      if (!currentUser) return;
      const { data } = await uploadProfileImage(file);

      dispatch(
        setCurrentUser({
          ...currentUser,
          profilePictureUrl: data.profilePictureUrl,
        }),
      );

      setFile(null);
      toast("Image upload", {
        description: "Image succesfully uploaded",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e) {
      console.error(e);
      toast("Image upload error", {
        description: "An error occured",
      });
    }
  };

  const onSave = async (values: z.infer<typeof updateUserDetialsSchema>) => {
    try {
      setIsEditing(false);
      const { data } = await updateUser(values);
      dispatch(setCurrentUser(data));
      toast.success("Successfully updated profile data");
    } catch (error) {
      console.error(error);
    }
  };

  if (currentUser === null) {
    return <></>;
  }

  return (
    <div className="mt-12 flex h-full w-full justify-center">
      <div className="flex w-1/2 flex-col items-center gap-4">
        <div className="flex h-[250px] w-[250px] items-center justify-center overflow-hidden rounded-full border bg-purple-900">
          {!currentUser.profilePictureUrl ? (
            <div className="text-center text-7xl">
              {getMonogram(currentUser.fullName)}
            </div>
          ) : (
            <Image
              src={currentUser.profilePictureUrl ?? ""}
              alt="Profile picture"
              width={250}
              height={250}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>{currentUser.fullName}</div>
        <div>Upload new profile image</div>
        <div className="flex flex-row gap-2">
          <Input
            ref={fileInputRef}
            className="w-80"
            type="file"
            onChange={handleFileChange}
          />
          <Button onClick={uploadImage}>
            <Upload />
          </Button>
        </div>
        {imageUploadError && (
          <ErrorMessage>Please select an image before upload</ErrorMessage>
        )}
      </div>
      <div className="flex w-1/2 flex-col items-center gap-2 p-12">
        <Form {...updateUserDetailsForm}>
          <form
            method="POST"
            onSubmit={updateUserDetailsForm.handleSubmit(onSave)}
            className="max-w-[50%]"
          >
            <FormField
              control={updateUserDetailsForm.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={updateUserDetailsForm.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="my-4 flex items-center justify-center gap-4">
              <Button type="submit" disabled={!hasChangedValue}>
                Save
              </Button>
              <Button type="button" onClick={() => setIsEditing(!isEditing)}>
                Edit
              </Button>
            </div>
          </form>
        </Form>
        <Separator />
        <ConnectedAccounts connectedAccounts={currentUser.connectedAccounts} />
      </div>
    </div>
  );
};

export default Profile;
