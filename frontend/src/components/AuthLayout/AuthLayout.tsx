import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <div className="grid h-screen w-screen grid-cols-1 overflow-y-auto bg-login md:grid-cols-2">
      {children}
    </div>
  );
};
