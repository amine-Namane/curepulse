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
import Doctorlist from '@/components/ui/Listeofdoctors';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabaseclient';

export default async function Page({ params }) {
  // Create a Supabase client
  const supabase = createClient();

  // Fetch data from Supabase "doctors" table
  async function fetchData() {
    const { data, error } = await supabase.from('doctors').select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or handle the error as needed
    } else {
      console.log('Fetched data:', data);
      return data; // Return the fetched data
    }
  }

  const doctors = await fetchData(); // Await the fetchData call

  return (
    <Doctorlist
      doctortype={params.recordtype}
      doctors={doctors }
    />
  );
}