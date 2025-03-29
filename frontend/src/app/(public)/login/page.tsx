import { BrandSection } from "@/components/BrandSection";
import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { LoginForm } from "./components/login-form";

const Login = () => {
  return (
    <AuthLayout>
      <BrandSection />
      <div className="m-auto flex w-full max-w-lg flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
        <h1 className="pb-4 text-4xl font-bold">Sign In</h1>
        <LoginForm />
        <p className="mt-2 text-center">
          You don&apos;t have an account? Register{" "}
          <Link className="underline" href="/register">
            here
          </Link>
          !
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
