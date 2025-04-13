// import Doctorlist from '@/components/ui/Listeofdoctors'
// import { notFound } from 'next/navigation'

// const validSpecialties = ['otology', 'cardiology', 'neurology']

// export default function Page({ params }) {
//   return (
//     <Doctorlist doctortype={params.recordtype 
//       ? params.recordtype.charAt(0).toUpperCase() + params.recordtype.slice(1)
//       : ""} />
//   )
// }
"use client";
import Doctorlist from "@/components/Listeofdoctors";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function DoctorsPage({ params: paramsPromise }) {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Unwrap params using use()
  const params = use(paramsPromise);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/Patient"); // Redirect if not logged in
        return;
      }

      // Fetch doctors data
      const { data: doctors, error } = await supabase.from("doctors").select("*");
      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(doctors);
      }

      setLoading(false);
    }

    fetchData();
  }, [router]);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <Doctorlist
      doctortype={params?.recordtype ? params.recordtype.charAt(0).toUpperCase() + params.recordtype.slice(1) : ""}
      doctors={doctors}
    />
  );
}

 