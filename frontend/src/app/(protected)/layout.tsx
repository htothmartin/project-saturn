'use client';

import { Modal } from '@/components/Modals';
import StoreProvider from '@/context/StoreProvider';
import useAuth from '@/hooks/useAuth';
import { SaturnLogo } from '@/assets';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavigationMenuList } from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { Logout } from '@/api/auth';
import { usePathname, useRouter } from 'next/navigation';
import { ModalTypes } from '@/enums/ModalTypes';
import { UserAvatar } from '@/components/UserAvatar';

export default function Layout({
  children,
}: Readonly<{ children: JSX.Element }>) {
  const { setAuth } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const { auth } = useAuth();

  const logout = async () => {
    await Logout();
    setAuth({ user: null, accessToken: '' });
    router.push('/login');
  };

  return (
    <StoreProvider>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex w-full flex-row items-center border-b-2 bg-background">
          <NavigationMenu className="bg-background p-4">
            <NavigationMenuList className="flex flex-row items-center gap-4">
              <div className="mr-4">
                <SaturnLogo size={56} />
              </div>

              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/home/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href={`${pathname}?modal=${ModalTypes.CreateProject}`}
                  legacyBehavior
                  passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    New Project
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="">
                <Link href="/home/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto mr-4 flex flex-row gap-4">
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
            <ThemeToggle />
            <UserAvatar
              imageUrl={auth.user?.profilePictureUrl ?? ''}
              fullName={auth.user?.fullName ?? ''}
            />
          </div>
        </div>
        {children}
      </div>
      <Modal />
    </StoreProvider>
  );
}
