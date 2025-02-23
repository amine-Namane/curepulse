'use client'
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton";

async function getAppointments() {
  const res = await fetch('http://localhost:3000/api/doctors-list');
  if (!res.ok) {
    throw new Error(`Failed to fetch doctor types (HTTP ${res.status})`);
  }
  return res.json();
}

export default async function Appointment() {
   const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        redirect('/Admin'); // Redirect if not logged in
      }
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading appointments: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <Table className="border rounded-lg">
        <TableCaption className="text-lg font-medium mb-4">
          List of Appointments
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[200px]">Patient</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Appointment Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-[120px] ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.name} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {
                  <div>
                    <img src={appointment.img} className='w-10'/>
                    {appointment.name}
                  </div>
                  }
                </TableCell>
                <TableCell>
                  {/* {new Date().toLocaleDateString()} */}
                  08/03/2003
                </TableCell>
                <TableCell>
                  {/* {new Date().toLocaleString()} */}
                  03/07
                </TableCell>
                <TableCell>
                  {/* <span className={`px-2 py-1 rounded-full text-sm ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    status
                  </span> */}status
                </TableCell>
                <TableCell className="text-right">
                  {/* {appointment.phoneNumber} */}05626455998
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
