import { SaturnLogo } from "@/assets";

export const BrandSection = (): React.JSX.Element => {
  return (
    <>
      <div className="d relative mx-auto hidden md:block">
        <SaturnLogo size={300} />
        <p className="text-3xl font-bold md:text-6xl">Project Saturn</p>
        <p className="p-4 text-3xl">For the best projects.</p>
      </div>
      <p className="m-auto text-5xl font-bold md:hidden">Project Saturn</p>
    </>
  );
};
