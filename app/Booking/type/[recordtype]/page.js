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
import Doctorlist from '@/components/Listeofdoctors';
import { supabase } from '@/lib/supabaseclient';

export default async function DoctorsPage({params}) {
  const { data: doctors, error } = await supabase.from('doctors').select('*');

  if (error) {
    console.error('Error fetching doctors:', error);
    return <p>Error loading doctors</p>;
  }
  console.log(doctors)

  return (
    <Doctorlist doctortype={params.recordtype 
             ? params.recordtype.charAt(0).toUpperCase() + params.recordtype.slice(1)
             : ""} doctors={doctors} />
  );
}
