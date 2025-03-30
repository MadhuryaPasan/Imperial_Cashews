import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Logo from "@/components/layouts/Logo";

const navbar = () => {
  return (
    <>
      <div className="shadow-lg py-2 px-5 z-10 sticky top-0 animate-in slide-in-from-top ease-in-out duration-700 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="h-[50px]">
            <Logo />
          </div>

          {navbarMenu()}
          {navbarUserOptions()}

          {/* mobile menue */}
          <div className="md:hidden ">{mobileTrigger()}</div>
        </div>
      </div>
    </>
  );
};

export default navbar;

// menu items

const categories = [
  {
    name: "All",
    description: "All cashew products",
    link: "/shop",
  },
];

const navbarMenu = () => {
  return (
    <>
      <NavigationMenu className=" hidden md:block ">
        <NavigationMenuList className="gap-x-3.5">
          {/* Home */}
          <NavigationMenuItem>
            <Link to="/home">
              <NavigationMenuLink className=" font-medium hover:text-primary">
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* Shop */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-medium  p-0 bg-transparent hover:bg-transparent ">
              <div className="hover:text-primary">Shop</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent  >
              {categories.map((category, index) => (
                <Link to="/shop">
                  <NavigationMenuLink
                    className="w-[350px] my-3 p-4 hover:shadow-lg hover:bg-primary/10  hover:outline-1  outline-primary/50 "
                    key={index}
                  >
                    <div className="font-medium ">{category.name}</div>
                  
                    <p className=" font-normal opacity-50">
                      {category.description}
                    </p>
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact us */}
          <NavigationMenuItem>
            <Link to="/contact">
              <NavigationMenuLink className=" font-medium hover:text-primary">
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* About */}
          <NavigationMenuItem>
            <NavigationMenuLink className=" font-medium hover:text-primary">
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

// mobile menu
const navbarMenu_Mobile = () => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Link to="/home">Home</Link>
          </AccordionTrigger>
          {/* <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent> */}
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shop</AccordionTrigger>
          <AccordionContent>
            {categories.map((category, index) => (
              <div
                className=" my-3 mx-2 p-4 hover:shadow-lg hover:bg-primary/10  hover:outline-1  outline-primary/50 rounded-md"
                key={index}
              >
                <div className="font-medium ">{category.name}</div>

                <p className=" font-normal opacity-50">
                  {category.description}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Contact Us</AccordionTrigger>
          {/* <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent> */}
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>About</AccordionTrigger>
          {/* <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent> */}
        </AccordionItem>
      </Accordion>
    </>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { link } from "fs";

// user options
const navbarUserOptions = () => {
  return (
    <>
      <div className=" hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="py-0">Name text</DropdownMenuLabel>
            <DropdownMenuLabel className="opacity-50 py-0">(Admin)</DropdownMenuLabel>
            <DropdownMenuLabel className=" font-medium opacity-50">email@gmail.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User/>
              Profile
              </DropdownMenuItem>
            <DropdownMenuItem>
              <LayoutDashboard/>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut/>
              Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

const navbarUserOptions_mobile = () => {
  return (
    <>
      <div>
        <Avatar className=" size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

const mobileTrigger = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>

          <SheetDescription>
            {navbarMenu_Mobile()}
            {/* This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers. */}
          </SheetDescription>
        </SheetHeader>
        <div className=" absolute bottom-0 w-full ">
          <div className="px-10 py-3 flex items-center  gap-5">
            <div>{navbarUserOptions_mobile()}</div>

            <div>
              <div className="font-bold text-lg">This is your name</div>
              <p>Position</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
