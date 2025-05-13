'use client'
import React, { useEffect,useState } from 'react';
import Custemsidebar from '@/components/ui/types';  // Ensure the correct import path
import { supabase } from "@/lib/supabaseclient";
import { redirect } from "next/navigation"; 
import { useRouter } from 'next/navigation';
import Doctorlist from '@/components/Listeofdoctors';
export default  function Booking() {
  const router = useRouter();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
useEffect(() => {
  const checkAuthAndFetchAppointments = async () => {
    const { data: { user } } = await supabase.auth.getUser();      
    if (!user) {
      router.push("/Patient"); // Redirect if not logged in
      return;
    }
  

const { data: doctors, error } = await supabase.from("doctor").select("*");
      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(doctors);
      }

      setLoading(false);
}
    checkAuthAndFetchAppointments();
  }, [router]);
    
      if (loading) return <p>Loading doctors...</p>;
    
      return (
        <Doctorlist
          doctortype={'Dentist'}
          doctors={doctors}
        />
      );
    }
    
  