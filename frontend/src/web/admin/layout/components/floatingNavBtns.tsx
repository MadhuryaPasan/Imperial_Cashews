import { FloatingDock } from "@/components/ui/floating-dock";
import {
  ChartCandlestick,
  CircleDollarSign,
  Handshake,
  Home,
  LayoutDashboard,
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
  // {
  //   title: "Dashboard",
  //   icon: (
  //     <LayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  //   ),
  //   href: "/admin/dashboard",
  // },

  {
    title: "Finance",
    icon: (
      <ChartCandlestick className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/admin/finance/balance-sheet",
  },
  {
    title: "Inventory",
    icon: (
      <Warehouse className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/admin/inventory/raw-material-stock",
  },
  {
    title: "Quality Control",
    icon: (
      <PackageCheck className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/admin/quality-control/raw-material-check-list",
  },

  {
    title: "Sales",
    icon: (
      <CircleDollarSign className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/admin/sales/clients-management",
  },
  {
    title: "Staff",
    icon: (
      <Handshake className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/admin/staff/staff-management",
  },
];

const floatingNavBtns = () => {
  return (
    // <div className="absolute bottom-0 h-screen w-screen right-0 z-30 flex items-center justify-center overflow-hidden bg-amber-300 ">
<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 pb-3 flex justify-center items-center">
     {/* <div className=" absolute bottom-0 items-center justify-center w-full pb-3  "> */}
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
