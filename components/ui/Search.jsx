import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from 'next/image'
import Catigo from './Catigo'
import Doctorcart from './doctorcart'
import Link from 'next/link'
async function getDoctorlist() {
  const res = await fetch('http://localhost:3000/api/doctors-list');
  if (!res.ok) {
    throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
  }
  return res.json();
}
export default async function Search() {
  const menu=[
    'dentist' ,'cardiologist','orthopedic','otology','doctor'
  ];
  const doctors=await getDoctorlist()
  return (
    <div className='flex justify-center'>
        <div>
          <div>
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl text-center mb-2">
        Search
        <span className='text-[#0089FF]'>Doctors</span>
      </h1>
      <p className='text-zinc-500 mb-4 text-center'>Search your doctor and book an appointment in one click</p>
       <div className='flex justify-center'>
      <div className="flex items-center  w-full max-w-sm space-x-2  mb-14 text-center">
      <Input type="text" placeholder="Search" />
      <Button type="submit" className={'bg-[#0089FF]'}>Search</Button>
    </div></div></div>
    {/* <ToggleGroup type="single">
  <ToggleGroupItem className='flex-col w-20 h-20' value="a">
    <img className='w-10' src={'/assets/icons/tooth.svg'}/>
    <h3>Dentiest</h3>
  </ToggleGroupItem>
  <ToggleGroupItem value="b">
    <img className='w-10' src={'/assets/icons/heart.svg'}/>
  </ToggleGroupItem>
  <ToggleGroupItem value="c">
    <img className='w-10' src={'/assets/icons/brain.svg'} />
  </ToggleGroupItem>
</ToggleGroup> */}

<ul className='flex justify-between   '>
{menu.map((doct,i) => (
 <Link key={i} href={`/Booking/type/${doct}`} > <Catigo doct={doct} key={i} className={"w-[8rem] h-[6rem] bg-[#bdd9f2] text-center  p-4 rounded-md transition-all duration-300    hover:max-w-[9rem] hover:h-[7rem] hover:shadow-2xl"} /></Link>
))}

</ul>
<div className='mt-20'>
  <h1 className='font-bold text-2xl'>Pupular Doctors</h1>
  <ul className="grid grid-cols-4 gap-4">
  {doctors.map((doct) => (
    <Doctorcart doct={doct} key={doct.id || doct.name} className="w-full" />
  ))}
</ul>

</div>
    </div>
    </div>
  )
}

