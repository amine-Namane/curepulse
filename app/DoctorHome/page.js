'use client'
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from '@/lib/supabaseclient';
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation"

// async function getDoctorlist() {
//   const res = await fetch('http://localhost:3000/api/doctors-list');
//   if (!res.ok) {
//     throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
//   }
//   return res.json();
// }

export default async function DoctorHome() {
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
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log("User ID:", user?.id);
      if (error || !user) {
        router.push("/DoctorHorme"); // Redirect if not authenticated
        return;
      }

      // Check if the user is a doctor
      const { data: userInfo, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("user_id", user.id) // Change 'id' to correct column name
        .single();

      if (roleError || !userInfo || userInfo.role !== "doctor") {
        router.push("/Admin"); // Redirect unauthorized users
        return;
      }

      setUser(user);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 max-w-7xl mx-auto">
        <div className="mb-4 md:mb-0">
          <h1 className='text-3xl font-semibold'>
            Welcome, <span className="text-[#0089FF]">Dr. Smith</span>
          </h1>
          <p className="text-gray-600 mt-1">Today's schedule overview</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Input 
            type="text" 
            placeholder="Search patients..." 
            className='rounded-full bg-white shadow-sm w-full md:w-64' 
          />
          <Button className="rounded-full bg-[#0089FF] hover:bg-[#0075e0] shadow-sm">
            Search
          </Button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Appointment Requests */}
        <section className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Appointment Requests</h2>
          <ScrollArea className="h-[400px] pr-4">
            {/* {doctors.map((doct) => (
              <div key={doct.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors mb-2">
                <div className="flex items-center gap-4">
                  <img 
                    src={doct.img} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0089FF]" 
                    alt={doct.name} 
                  />
                  <div>
                    <p className="font-medium">{doct.name}</p>
                    <p className="text-sm text-gray-500">Cardiology • 09:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-green-600 border-green-200 hover:bg-green-50 h-8 w-8"
                  >
                    ✓
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))} */}
          </ScrollArea>
        </section>

        {/* My Patients */}
        <section className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">My Patients</h2>
          <ScrollArea className="h-[400px] pr-4">
            {/* {doctors.map((doct) => (
              <div key={doct.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors mb-2">
                <img 
                  src={doct.img} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#0089FF]" 
                  alt={doct.name} 
                />
                <div>
                  <p className="font-medium">{doct.name}</p>
                  <p className="text-sm text-gray-500">Last visit: 2 days ago</p>
                </div>
              </div>
            ))} */}
          </ScrollArea>
        </section>

        {/* Announcements */}
        <section className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Announcements</h2>
          <ScrollArea className="h-[300px] pr-4">
            {/* {doctors.map((doct) => (
              <div key={doct.id} className="p-4 mb-3 rounded-lg bg-blue-50 border-l-4 border-[#0089FF]">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium">{doct.specialty} Meeting</h3>
                    <p className="text-sm text-gray-600">Scheduled for Friday, 3:00 PM</p>
                  </div>
                  <span className="text-sm text-[#0089FF]">New</span>
                </div>
              </div>
            ))} */}
          </ScrollArea>
        </section>
      </div>
    </div>
  )
}
