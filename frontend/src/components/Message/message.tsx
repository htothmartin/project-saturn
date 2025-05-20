import { User } from "@/model/user";
import { UserAvatar } from "../UserAvatar";
import { getFullName } from "@/lib/utils";

type Props = {
  content: string;
  author: User;
};

export const Message = ({ content, author }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded bg-slate-700 p-4">
      <div className="flex items-center gap-2">
        <UserAvatar
          imageUrl={author.profilePictureUrl}
          fullName={getFullName(author)}
        />
        <div>{getFullName(author)}</div>
      </div>

      <div className="ml-8">{content}</div>
    </div>
  );
};
