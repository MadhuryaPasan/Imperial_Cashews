import { FloatingDock } from "@/components/ui/floating-dock";
import {
  ChartCandlestick,
  CircleDollarSign,
  Handshake,
  Home,
  PackageCheck,
  Warehouse,
} from "lucide-react";

const links = [
  {
    title: "Home",
    icon: (
      <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },

  {
    title: "Finance",
    icon: (
      <ChartCandlestick className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/finance",
  },
  {
    title: "Inventory",
    icon: (
      <Warehouse className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Quality Control",
    icon: (
      <PackageCheck className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Sales",
    icon: (
      <CircleDollarSign className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Staff",
    icon: (
      <Handshake className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

const floatingNavBtns = () => {
  return (
    // <div className="absolute bottom-0 h-screen w-screen right-0 z-30 flex items-center justify-center overflow-hidden bg-amber-300 ">

    <div className=" absolute bottom-0 items-center justify-center w-full pb-3  ">
      <div className="  w-full relative flex justify-end">
      <FloatingDock
        mobileClassName=" w-fit" // only for demo, remove for production
        desktopClassName=" w-fit" // only for demo, remove for production
        items={links}
      />
      </div>
    </div>
    // </div>
  );
};

export default floatingNavBtns;
