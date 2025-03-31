"use client";

import { SaturnLogo } from "@/assets";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { ModalTypes } from "@/enums/ModalTypes";
import { UserAvatar } from "@/components/UserAvatar";
import { Logout } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logout } from "@/lib/store/features/session/session-slice";
import { selectSession } from "@/lib/store/features/session/session-selectors";

export const Header = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { getModalUrl } = useModal();
  const { currentUser } = useAppSelector(selectSession);

  const handleLogout = async () => {
    await Logout();
    router.push("/login");
    dispatch(logout());
  };

  if (!currentUser) {
    return <></>;
  }

  return (
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
              href={getModalUrl(ModalTypes.CreateProject)}
              legacyBehavior
              passHref
            >
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
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <ThemeToggle />
        <UserAvatar
          imageUrl={currentUser.profilePictureUrl}
          fullName={currentUser.fullName}
        />
      </div>
    </div>
  );
};
