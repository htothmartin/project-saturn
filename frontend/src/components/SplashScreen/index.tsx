import { SaturnLogo } from '@/assets';

export const SplashScreen = (): JSX.Element => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-login">
      <div className="flex w-screen flex-col items-center justify-center bg-black bg-opacity-10 pb-6 backdrop-blur-md">
        <SaturnLogo size={250} />
        <div className="text-6xl text-white">
          <h1>Project Saturn</h1>
        </div>
      </div>
    </div>
  );
};
