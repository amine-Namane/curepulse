'use client'

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import Link from "next/link";

const Header = () => {
  const [isPatient, setIsPatient] = useState(false)
  
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            id="logo-87"
            viewBox="0 0 202 40"
            fill="none"
            className="text-white"
            src="/assets/icons/logo-full.svg"
          />
            {/* ... keep your existing SVG paths ... */}
          <span className="sr-only">Healthcare Logo</span>
        </Link>

        {/* Navigation */}
        {!isPatient && (
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/Patient"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-blue-700 text-white data-[state=open]:bg-blue-700">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] p-2 bg-white rounded-lg shadow-xl">
                    <div className="flex flex-col gap-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/Booking"
                          className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors"
                        >
                          Book Appointment
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/Bloodtest"
                          className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors"
                        >
                          Analyze Tests
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              href="/doctors"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Doctors
            </Link>
            
            <Link
              href="/contact"
              className="text-white hover:text-blue-100 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </nav>
        )}

        {/* Profile Dropdown */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent p-0">
                <Avatar className="border-2 border-white hover:border-blue-200 transition-colors">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-blue-100 text-blue-800">CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[160px] p-2 bg-white rounded-lg shadow-xl">
                <div className="flex flex-col gap-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/profile"
                      className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors"
                    >
                      Profile
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors"
                    >
                      Log Out
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;