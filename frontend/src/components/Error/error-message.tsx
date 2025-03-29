type Props = {
  children: string;
};

export const ErrorMessage = ({ children }: Props): React.JSX.Element => {
  return <div className="text-red-500">{children}</div>;
};
