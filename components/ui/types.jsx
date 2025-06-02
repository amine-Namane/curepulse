import React from 'react';
import Link from 'next/link';
import Catigo from './Catigo';

async function getDoctorTypes() {
  const res = await fetch('http://localhost:3000/api/doctor-types');
  if (!res.ok) {
    throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
  }
  return res.json();
}

export default  async function Custemsidebar() { 
  const types = [
    { name: 'dentist', slug: 'Dentist' },
    { name: 'cardiologist', slug: 'Cardiologist' },
    { name: 'orthopedic', slug: 'Orthopedic' },
    { name: 'otology', slug: 'Otology' },
    { name: 'doctor', slug: 'Doctor' },
    { name: 'eyedoctor', slug: 'Eyedoctor' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-100">
      <nav className="p-4">
        <div className="mb-8 pl-4">
          <h1 className="text-2xl font-bold text-blue-600">HealthCare</h1>
        </div>

        <ul className="space-y-2">
  {types.map((doct, i) => (
    <li key={i}>
      <Link 
        href={`/Booking/type/${doct.name}`}
        className="group flex items-center p-4 rounded-lg transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Catigo 
          doct={doct.name}
          className="w-full"
        />
        <svg 
          className="w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </li>
  ))}
  
  <li>
    <Link 
      href="/Booking"
      className="flex items-center p-4 text-lg font-semibold text-blue-600 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <span>For You</span>
      <svg 
        className="w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </li>
  
  <li>
    <Link 
      href="/Booking"
      className="flex items-center p-4 text-lg font-semibold text-blue-600 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <span>All Doctors</span>
      <svg 
        className="w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-600 transition-colors"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </li>
</ul>
      </nav>
    </aside>
  );
}
