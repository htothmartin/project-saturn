import { HttpErrorResponse } from "@/model/http-error-response";
import { ErrorMessage } from "./error-message";

type Props = {
  data: HttpErrorResponse;
  className?: string;
};

export const HttpErrorMessage = ({
  data,
  className = "",
}: Props): React.JSX.Element => {
  return (
    <div className={`flex flex-col ${className}`}>
      {data.message && <ErrorMessage>{data.message}</ErrorMessage>}
      {data.errors &&
        Object.entries(data.errors).map(([key, value]) => (
          <ErrorMessage key={key}>{`${key}: ${value}`}</ErrorMessage>
        ))}
      {data.generalErrors &&
        data.generalErrors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
    </div>
  );
};
