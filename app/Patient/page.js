// // Patient component
// import React from 'react';
// import MainHeader from '@/components/ui/MainHeader';
// import Doctorcard from '@/components/ui/Doctorcard';
// import Search from '@/components/ui/Search';

import Patientform, { PatientForm } from "@/components/Patientform" 
import Image from "next/image";
import Link from "next/link";
// import './globals.css' ;
import { fromJSON } from "postcss";
export default function Patient() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-12 gap-16 max-w-7xl mx-auto">
//         <MainHeader
//           h1="We Care<br />About Your Health"
//           p="Good health is the state of mental, physical and social well-being and it does not just mean absence of diseases."
//           button="Book an Appointment →"
//           button2="Sign Up"
//         />
//         <Doctorcard />
//       </section>

//       {/* Services Section */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Our Medical <span className="text-[#0098ff]">Services</span>
//           </h1>
//           <p className="text-lg text-[#A7A7A7] mb-12">
//             We are dedicated to provide you the best medical services
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
//             {['Online appointment', 'Analyse tests', 'Smart health portal'].map((service, index) => (
//               <div 
//                 key={index}
//                 className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
//                 style={{ 
//                   backgroundColor: index === 1 ? '#0089ff' : 'white',
//                   border: '1px solid #e5e7eb'
//                 }}
//               >
//                 <h3 
//                   className={`text-lg font-semibold ${
//                     index === 1 ? 'text-white' : 'text-[#0089ff]'
//                   }`}
//                 >
//                   {service}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="py-16 max-w-7xl mx-auto px-4">
//         <Search />
//       </section>
//     </div>
//   );
// }
return (
  <main className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2 mb-8">
              <Image 
                src="./assets/icons/medical-icon.svg"
                alt="Healthcare Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                Healthcare Portal.
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
)}