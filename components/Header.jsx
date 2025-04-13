// 'use client'
// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuList,
//   NavigationMenuLink,
// } from "@/components/ui/navigation-menu";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseclient";
// import { useRouter } from "next/navigation";

// const Header = () => {
//   const [isPatient, setIsPatient] = useState(false);
//   const router = useRouter();

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push("/Patient"); // Redirect after logout
//   };

//   return (
//     <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
//           <img
//             id="logo-87"
//             className="text-white"
//             src="/assets/icons/logo-full.svg"
//             alt="Healthcare Logo"
//           />
//         </Link>

//         {/* Navigation */}
//         {!isPatient && (
//           <nav className="hidden lg:flex items-center gap-8">
//             <Link href="/Patient" className="text-white hover:text-blue-100 transition-colors font-medium">
//               Home
//             </Link>

//             <NavigationMenu>
//               <NavigationMenuList>
//                 <NavigationMenuItem>
//                   <NavigationMenuTrigger className="bg-transparent hover:bg-blue-700 text-white">
//                     Services
//                   </NavigationMenuTrigger>
//                   <NavigationMenuContent className="min-w-[200px] p-2 bg-white rounded-lg shadow-xl">
//                     <div className="flex flex-col gap-2">
//                       <NavigationMenuLink asChild>
//                         <Link href="/Booking" className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors">
//                           Book Appointment
//                         </Link>
//                       </NavigationMenuLink>
//                       <NavigationMenuLink asChild>
//                         <Link href="/Bloodtest" className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors">
//                           Analyze Tests
//                         </Link>
//                       </NavigationMenuLink>
//                     </div>
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               </NavigationMenuList>
//             </NavigationMenu>

//             <Link href="/doctors" className="text-white hover:text-blue-100 transition-colors font-medium">
//               Doctors
//             </Link>
//             <Link href="/contact" className="text-white hover:text-blue-100 transition-colors font-medium">
//               Contact Us
//             </Link>
//           </nav>
//         )}

//         {/* Profile Dropdown */}
//         <NavigationMenu>
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger className="bg-transparent hover:bg-transparent p-0">
//                 <Avatar className="border-2 border-white hover:border-blue-200 transition-colors">
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback className="bg-blue-100 text-blue-800">CN</AvatarFallback>
//                 </Avatar>
//               </NavigationMenuTrigger>
//               <NavigationMenuContent className="min-w-[160px] p-2 bg-white rounded-lg shadow-xl">
//                 <div className="flex flex-col gap-2">
//                   <NavigationMenuLink asChild>
//                     <Link href="/profile" className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors">
//                       Profile
//                     </Link>
//                   </NavigationMenuLink>
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors text-left w-full"
//                   >
//                     Log Out
//                   </button>
//                 </div>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import Button

const Header = () => {
  const [user, setUser] = useState(null);
  const [isPatient, setIsPatient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkPatientStatus = async (userId) => {
      const { data, error } = await supabase
        .from('patients')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      return !!data && !error;
    };

    const fetchUser = async () => {
      const { data: authData, error } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const patientStatus = await checkPatientStatus(authData.user.id);
        setIsPatient(patientStatus);
      } else {
        setUser(null);
        setIsPatient(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        const patientStatus = await checkPatientStatus(session.user.id);
        setIsPatient(patientStatus);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setIsPatient(false);
        router.push("/");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/Patient"); // Redirect after logout
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 shadow-lg">
<div className="max-w-7xl mx-auto flex items-center justify-between">
  {/* Logo */}
  <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
    <img id="logo-87" className="text-white" src="/assets/icons/logo-full.svg" alt="Healthcare Logo" />
  </Link>

  {/* Center Navigation */}
  {user && isPatient && (
    <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
      <Link href="/Home" className="text-white hover:text-blue-100 transition-colors font-medium">
        Home
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-blue-700 text-white">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[200px] p-2 bg-white rounded-lg shadow-xl">
              <div className="flex flex-col gap-2">
                <NavigationMenuLink asChild>
                  <Link href="/Booking" className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors">
                    Book Appointment
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/Bloodtest" className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors">
                    Analyze Tests
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/Doctors" className="text-white hover:text-blue-100 transition-colors font-medium">
        Doctors
      </Link>
      <Link href="/contact" className="text-white hover:text-blue-100 transition-colors font-medium">
        Contact Us
      </Link>
    </nav>
  )}

  {/* Right Section */}
  <div className="flex items-center gap-4">
    {!user ? (
      <>
        <Button asChild variant="outline" className="bg-white text-blue-800 hover:bg-blue-100">
          <Link href="/Patient">Login</Link>
        </Button>
        <Button asChild className="bg-white text-blue-800 hover:bg-blue-100">
          <Link href="/Signup">Sign Up</Link>
        </Button>
      </>
    ) : user && isPatient ? (
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
                  <button
                    onClick={handleLogout}
                    className="text-left w-full px-4 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors"
                  >
                    Log Out
                  </button>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ) : (
      // if user exists but is not a patient
      <Button
        variant="outline"
        onClick={handleLogout}
        className="px-4 py-2 bg-white text-blue-800 hover:bg-blue-100 rounded-full"
      >
        Log out
      </Button>
    )}
  </div>
</div>

    </header>
  );
};

export default Header;
