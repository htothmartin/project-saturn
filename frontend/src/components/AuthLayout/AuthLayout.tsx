import type { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export const AuthLayout = ({ children }: Props): JSX.Element => {
  return (
    <div className="grid h-screen w-screen grid-cols-1 overflow-y-auto bg-login md:grid-cols-2">
      {children}
    </div>
  );
};
