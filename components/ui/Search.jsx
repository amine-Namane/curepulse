'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Doctorcart from "./doctorcart";
import { supabase } from '@/lib/supabaseclient';
import { useEffect, useState } from "react";
import Catigo from './Catigo';
import Link from "next/link";
export default  function Search() {
  const [doctors, setDoctors] = useState([]);
  const menu=[
    'dentist' ,'cardiologist','orthopedic','otology','doctor'
  ];
  useEffect(() => {
    async function fetchDoctors() {
      const { data, error } = await supabase.from('doctor').select('*');
      if (error) {
        console.error('Error fetching doctors:', error);
      } else {
        setDoctors(data);
      }
    }

    fetchDoctors();
  }, []);
  return (
    <div className='flex justify-center'>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl text-center mb-2">
          Search <span className='text-[#0089FF]'>Doctors</span>
        </h1>
        <p className='text-zinc-500 mb-4 text-center'>
          Search your doctor and book an appointment in one click
        </p>

        <div className='flex justify-center'>
          <div className="flex items-center w-full max-w-sm space-x-2 mb-14 text-center">
            <Input type="text" placeholder="Search" />
            <Button type="submit" className='bg-[#0089FF]'>Search</Button>
          </div>
        </div>
        <ul className='flex justify-between   '>
{menu.map((doct,i) => (
 <Link key={i} href={`/Booking/type/${doct}`} > <Catigo doct={doct} key={i} className={"w-[8rem] h-[6rem] bg-[#bdd9f2] text-center  p-4 rounded-md transition-all duration-300    hover:max-w-[9rem] hover:h-[7rem] hover:shadow-2xl"} /></Link>
))}

</ul>
        <div className='mt-20'>
          <h1 className='font-bold text-2xl'>Popular Doctors</h1>
          <ul className="grid grid-cols-4 gap-4">
            {doctors.map((doct) => (
              <Doctorcart doct={doct} key={doct.id || doct.name} className="w-full" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
