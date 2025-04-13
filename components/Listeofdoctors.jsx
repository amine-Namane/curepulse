import Doctorcart from '@/components/ui/doctorcart';
import React from 'react'
// async function getDoctorlist() {
//   const res = await fetch('http://localhost:3000/api/doctors-list');
//   if (!res.ok) {
//     throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
//   }
//   return res.json();
// }
export default  function  Doctorlist({doctortype ,doctors
}) {
   //const doctors= await getDoctorlist()
  return (
    <section >
        <h1 className='text-xl font-bold'>{doctortype}</h1>
   <ul className='grid grid-cols-4 gap-4'>
   {doctors?.map((doct)=>(
               <Doctorcart doct={doct} />
           ))}
       </ul></section>
  )
}