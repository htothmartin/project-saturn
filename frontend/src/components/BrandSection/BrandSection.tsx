import { SaturnLogo } from '@/assets';

export const BrandSection = (): JSX.Element => {
  return (
    <div className="d relative mx-auto">
      <SaturnLogo size={300} />
      <p className="text-6xl font-bold">Project Saturn</p>
      <p className="p-4 text-3xl">For the best projects.</p>
    </div>
  );
};
