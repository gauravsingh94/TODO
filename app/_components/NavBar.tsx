"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import LogoSvg from "@/public/assets/Logo.svg";
import HamBurgerSvg from "@/public/assets/HamBurger.svg";
import ProfileSvg from "@/public/assets/Profile.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavLinksTypes {
  name: string;
  link: string;
}
const NavBar = () => {
  const NavLinks: NavLinksTypes[] = [
    {
      name: "List Todo",
      link: "/list-todo",
    },

    {
      name: "Kanban View",
      link: "/kanban",
    },
  ];
  return (
    <nav className="fixed w-full flex justify-between bg-black px-8 py-2 border-b border-[#27272A] items-center">
      <div className="flex items-center gap-2">
        <Image src={LogoSvg} alt="Logo" height={26} />
        <p className="font-bold">Todo</p>
      </div>
      {/*Nav Links */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {NavLinks.map((item) => (
              <NavigationMenuItem key={item.link}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="">
                <div className="h-7 w-7 rounded-full bg-black">
                  <Image src={ProfileSvg} alt="Profile Svg" />
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-48 p-2 bg-black  border-b border-[#27272A] text-white rounded-md shadow-lg ">
                <ul className="space-y-2">
                  <ul className="w-48 p-2 rounded-md shadow-lg">
                    <li className="px-2 py-1 hover:text-black hover:bg-white rounded">
                      Profile
                    </li>
                    <li className="px-2 py-1 hover:text-white hover:bg-red-500  rounded">
                      Log Out
                    </li>
                  </ul>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/*Mobile Navigation */}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Image src={HamBurgerSvg} alt="Hamburger Logo" height={16} />
          </SheetTrigger>
          <SheetContent className="bg-black w-72 border-[#27272A]">
            <nav className="flex flex-col gap-4">
              {NavLinks.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="text-lg font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t  border-[#27272A]">
                <p className="text-lg font-medium mb-2">User Menu</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/profile"
                      className="text-sm hover:text-primary"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout" className="text-sm hover:text-primary">
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
