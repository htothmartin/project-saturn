import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMonogram } from "@/lib/utils";
import Image from "next/image";

type Props = {
  imageUrl: string;
  fullName: string;
  onClick?: () => void;
};

export const UserAvatar = ({ imageUrl, fullName, onClick }: Props) => {
  return (
    <Avatar onClick={onClick}>
      <AvatarImage src={imageUrl} alt="Profile picture" asChild>
        {imageUrl && (
          <Image
            unoptimized
            src={imageUrl}
            width={60}
            height={90}
            alt="Profile picture"
          />
        )}
      </AvatarImage>
      <AvatarFallback>{getMonogram(fullName)}</AvatarFallback>
    </Avatar>
  );
};
