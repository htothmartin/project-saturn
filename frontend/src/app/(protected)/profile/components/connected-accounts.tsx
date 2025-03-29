import { Separator } from "@/components/ui/separator";
import { ConnectedAccount } from "@/model/connected-accounts";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props = {
  connectedAccounts: ConnectedAccount[];
};

export const ConnectedAccounts = ({
  connectedAccounts,
}: Props): React.JSX.Element => {
  const getProviderIcon = (provider: "google" | "github") => {
    switch (provider) {
      case "github":
        return (
          <div className="flex items-center gap-4">
            <FaGithub />
            <p>Google</p>
          </div>
        );
      case "google":
        return (
          <div className="flex items-center gap-4">
            <FcGoogle />
            <p>Google</p>
          </div>
        );
    }
  };

  if (connectedAccounts.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-2xl">Connected accounts</h2>
      {connectedAccounts.map((connectedAccount, index) => (
        <div key={`connected-account-${index}`}>
          <div className="mx-6 flex justify-between gap-4">
            <div>{getProviderIcon(connectedAccount.provider)}</div>
            <div>
              Connected at:{" "}
              {new Date(connectedAccount.createdAt).toDateString()}
            </div>
          </div>
          {index !== connectedAccounts.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
};
