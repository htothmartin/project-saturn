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
import { getProjectForUser } from '@/api/project';

export default function Layout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  const router = useRouter();

  const logout = async () => {
    await Logout();
    router.push('/login');
  };

  return (
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
            onClick={async () => {
              try {
                console.log(await getProjectForUser());
              } catch (er) {
                console.log('asd');
              }
            }}>
            <UserIcon />
            Profile
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
