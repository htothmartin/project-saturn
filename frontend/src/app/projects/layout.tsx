'use client';

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
import { useRouter } from 'next/navigation';
import { UserIcon } from '@/assets/icons/UserIcon';
import { AuthProvider } from '@/context/AuthProvider';
import useAuth from '@/hooks/useAuth';
import { getProjectForUser } from '@/api/project';

export default function Layout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  const logout = async () => {
    await Logout();
    setCurrentUser(undefined);
    router.push('/login');
  };

  return (
    <AuthProvider>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex w-screen flex-row items-center bg-background">
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
                <Link href="/projects/createproject" legacyBehavior passHref>
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
            <Button
              variant="outline"
              onClick={async () => console.log(await getProjectForUser())}>
              <UserIcon />
              Profile
            </Button>
          </div>
        </div>
        {children}
      </div>
    </AuthProvider>
  );
}
