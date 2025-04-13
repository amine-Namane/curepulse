'use client'
import React, { useEffect } from 'react';
import Custemsidebar from '@/components/ui/types';  // Ensure the correct import path
import { supabase } from "@/lib/supabaseclient";
import { redirect } from "next/navigation"; 
import { useRouter } from 'next/navigation';

export default  function Booking() {
  const router = useRouter();
useEffect(() => {
      const checkAuthAndFetchAppointments = async () => {
        const { data: { user } } = await supabase.auth.getUser();      
        if (!user) {
          router.push("/Patient"); // Redirect if not logged in
          return;
        }
      };
  
      checkAuthAndFetchAppointments();
    }, []);
  return (
    <div>
      hello
    </div>
  );
}
