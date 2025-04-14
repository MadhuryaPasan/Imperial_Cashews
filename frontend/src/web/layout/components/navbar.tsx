import React from 'react'
import { Link } from "react-router-dom";
import Logo from "@/web/logo/Logo"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "#link" },
  { name: "Contact Us", href: "#link" },
  { name: "Dashboard", href: "/dashboard" },

]

const Navbar = () => {
  const [menuState, setMenuState] = React.useState(false)

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          " w-full backdrop-blur-lg transition-colors duration-150 shadow-lg bg-white/70"
        )}
      >
        <div className=" px-6 transition-all duration-300  w-full">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link to="/" aria-label="home" className="flex items-center space-x-2">
                <div className="flex h-10 w-10">
                  <Logo />
                </div>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className={cn("m-auto size-6 duration-200", menuState && "opacity-0 scale-0 rotate-180")} />
                <X className={cn("absolute inset-0 m-auto size-6 scale-0 opacity-0 -rotate-180 duration-200", menuState && "opacity-100 scale-100 rotate-0")} />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span className=' font-medium'>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white/50 in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <Link to="#">
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="#">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
