import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

type Props = {
  isLoading: boolean;
};

export const OAuthLogin = ({ isLoading }: Props): React.JSX.Element => {
  const getProviderLoginUrl = (provider: "google" | "github") => {
    return (
      process.env.NEXT_PUBLIC_API_URL + `/oauth2/authorization/${provider}`
    );
  };
  return (
    <div className="flex flex-col gap-y-2 pt-4">
      <Link href={getProviderLoginUrl("google")}>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full gap-2"
        >
          <FcGoogle /> Google
        </Button>
      </Link>
    </div>
  );
};
