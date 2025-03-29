import { User } from "@/model/user";
import { UserAvatar } from "../UserAvatar";

type Props = {
  content: string;
  author: User;
};

export const Message = ({ content, author }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div>{content}</div>
      <UserAvatar
        imageUrl={author.profilePictureUrl}
        fullName={author?.fullName ?? ""}
      />
    </div>
  );
};
