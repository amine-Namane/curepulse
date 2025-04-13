// 'use client'
// import React, { useState, useEffect } from 'react';
// import MainHeader from '@/components/ui/MainHeader';
// import Doctorcard from '@/components/ui/Doctorcard';
// import Search from '@/components/ui/Search';
// import { redirect } from 'next/navigation';
// import { useRouter } from "next/navigation"
// import { supabase } from '@/lib/supabaseclient'; // Ensure correct import
// import { getAuthenticatedUser } from '@/lib/auth'; // Adjust if needed

// export default function Home() {
//  const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const router = useRouter();
//   useEffect(() => {
//     async function checkAuth() {
//     const user = await getAuthenticatedUser(); // Use the server function
//          if (!user) {
//            router.push("/Home"); // Redirect if not authenticated
//            return;
//          }
//          setUser(user);
//          setLoading(false);



//       // Check if the user is a doctor
//       const { data: userInfo, error: roleError } = await supabase
//         .from("patients")
//         .select("*")
//         .eq("user_id", user.id) // Change 'id' to correct column name
//         .single();

//       if (roleError || !userInfo || userInfo.role !== "patient") {
//         router.push("/Admin"); // Redirect unauthorized users
//         return;
//       }
//       console.log(userInfo)
//       setUser(userInfo);
//       setLoading(false);
//     }

//     checkAuth();
//   }, [router]);
// console.log(user)
//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-12 gap-16 max-w-7xl mx-auto">
//         <MainHeader
//           h1="We Care<br />About Your Health"
//           p="Good health is the state of mental, physical and social well-being and it does not just mean absence of diseases."
//           button="Book an Appointment →"
//           button2="Sign Up"
//         />
//         <Doctorcard />
//       </section>

//       {/* Services Section */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Our Medical <span className="text-[#0098ff]">Services</span>
//           </h1>
//           <p className="text-lg text-[#A7A7A7] mb-12">
//             We are dedicated to provide you the best medical services
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
//             {['Online appointment', 'Analyse tests', 'Smart health portal'].map((service, index) => (
//               <div 
//                 key={index}
//                 className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
//                 style={{ 
//                   backgroundColor: index === 1 ? '#0089ff' : 'white',
//                   border: '1px solid #e5e7eb'
//                 }}
//               >
//                 <h3 
//                   className={`text-lg font-semibold ${index === 1 ? 'text-white' : 'text-[#0089ff]'}`}
//                 >
//                   {service}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="py-16 max-w-7xl mx-auto px-4">
//         <Search />
//       </section>
//     </div>
//   );
// }
'use client'
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from '@/lib/supabaseclient';
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation"
import { getAuthenticatedUser } from "@/lib/auth"; // Import auth function
import MainHeader from '@/components/ui/MainHeader';
import Doctorcard from '@/components/ui/Doctorcard';
import Search from '@/components/ui/Search';

// async function getDoctorlist() {
//   const res = await fetch('http://localhost:3000/api/doctors-list');
//   if (!res.ok) {
//     throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
//   }
//   return res.json();
// }

export default  function Home() {
  // const doctors = await getDoctorlist()
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) {
  //   redirect('/Admin'); // Redirect if not logged in
  // }
  // const { data: userInfo, error } = await supabase
  //   .from("users")
  //   .select("role")
  //   .eq("id", user.id)
  //   .single();
  //   if (error || !userInfo || userInfo.role !== "doctor") {
  //     redirect('/unauthorized'); // Redirect unauthorized users
  //   }
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
    const user = await getAuthenticatedUser(); // Use the server function
         if (!user) {
           router.push("/Home"); // Redirect if not authenticated
           return;
         }
         setUser(user);
         setLoading(false);



      // Check if the user is a doctor
      const { data: userInfo, error: roleError } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user.id) // Change 'id' to correct column name
        .single();

      if (roleError || !userInfo || userInfo.role !== "patient") {
        router.push("/Patient"); // Redirect unauthorized users
        return;
      }
      console.log(userInfo)
      setUser(userInfo);
      setLoading(false);
    }

    checkAuth();
  }, [router]);
console.log(user)
  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Section */}
       <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-12 gap-20 max-w-7xl mx-auto">
       <MainHeader
          h1="We Care<br />About Your Health"
          p="Good health is the state of mental, physical and social well-being and it does not just mean absence of diseases."
          button="Book an Appointment →"
          button2="Sign Up"
        />
        <Doctorcard />
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Medical <span className="text-[#0098ff]">Services</span>
          </h1>
          <p className="text-lg text-[#A7A7A7] mb-12">
            We are dedicated to provide you the best medical services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
            {['Online appointment', 'Analyse tests', 'Smart health portal'].map((service, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{ 
                  backgroundColor: index === 1 ? '#0089ff' : 'white',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 
                  className={`text-lg font-semibold ${index === 1 ? 'text-white' : 'text-[#0089ff]'}`}
                >
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <Search />
      </section>
    </div>
  )
}