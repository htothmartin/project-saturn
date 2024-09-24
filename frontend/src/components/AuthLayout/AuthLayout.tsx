import SkyBackground from '@/app/login/sky';

type Props = {
    children: JSX.Element;
};

export const AuthLayout = ({ children }: Props): JSX.Element => {
    return (
        <SkyBackground>
            <div className="grid h-screen w-screen grid-cols-2 overflow-hidden bg-cover bg-no-repeat">
                {children}
            </div>
        </SkyBackground>
    );
};
