import { BrandSection } from "@/components/BrandSection";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { RegisterForm } from "./components/register-form";

const Register = (): React.JSX.Element => {
  return (
    <AuthLayout>
      <BrandSection />
      <div className="m-auto flex w-full max-w-lg flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
        <h1 className="pb-4 text-4xl font-bold">Register</h1>
        <RegisterForm />
        <p className="text-center">
          You already have an account? Login{" "}
          <Link className="underline" href="/login">
            here
          </Link>
          !
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
