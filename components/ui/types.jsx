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
              <Link href={`/Booking/type/${doct.name}`}>
                <Catigo
                  doct={doct.name}
                  className="group flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-blue-50"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
