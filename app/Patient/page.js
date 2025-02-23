// 'use client'
// import  { PatientForm } from "@/components/Patientform" 
// import { supabase } from '@/lib/supabaseclient';
// import { useRouter } from 'next/navigation';
// import Image from "next/image";
// import Link from "next/link";
// // import './globals.css' ;
// import { fromJSON } from "postcss";
// import { useState } from "react";
// export default function Patient() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const router = useRouter();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     setLoading(false);
//     if (error) {
//       setError(error.message);
//     } else {
//       router.push('/dashboard'); // Redirect to dashboard after login
//     }};
// return (
//   <main className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-12 text-center">
//           <Link href="/" className="inline-block">
//             <div className="flex items-center gap-2 mb-8">
//               <Image 
//                 src="./assets/icons/medical-icon.svg"
//                 alt="Healthcare Logo"
//                 width={48}
//                 height={48}
//                 className="w-12 h-12"
//               />
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Healthcare Portal.
//               </h1>
//             </div>
//           </Link>
//         </header>

//         <div className="flex justify-center">
//           <PatientForm />
//         </div>

//         <footer className="mt-12 text-center text-gray-600">
//           <p className="text-sm">
//             © {new Date().getFullYear()} Healthcare Services. All rights reserved.
//           </p>
//           <div className="mt-4 flex justify-center gap-4">
//             <Link href="/privacy" className="hover:text-blue-600 transition-colors">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="hover:text-blue-600 transition-colors">
//               Terms of Service
//             </Link>
//           </div>
//         </footer>
//       </div>
//     </div>
//   </main>
// )}
'use client'
import { PatientForm } from "@/components/Patientform"; 
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function Patient() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2 mb-8">
                <Image 
                  src="/assets/icons/medical-icon.svg"
                  alt="Healthcare Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <h1 className="text-3xl font-bold text-gray-900">
                  Healthcare Portal
                </h1>
              </div>
            </Link>
          </header>

          <div className="flex justify-center">
            <PatientForm />
          </div>

          <footer className="mt-12 text-center text-gray-600">
            <p className="text-sm">
              © {new Date().getFullYear()} Healthcare Services. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
