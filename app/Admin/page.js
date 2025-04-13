'use client'
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import Appointment from "../DoctorHome/Appointment/page";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", email: "john@example.com", phone:"0771699070",experiance:12 },
    { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", email: "jane@example.com" },
  ]);
  const [appoiments, setAppoiments] = useState([
    { id: 1, DoctorName: "Dr. John Doe", PatientName: "CAlice Johnson", Date: "02/01/2025",Time:"11:00" },
    { id: 2, DoctorName: "Dr. John Doe", PatientName: "CAlice Johnson", Date: "02/01/2025",Time:"11:00" },
   
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: "Alice Johnson", age: 32, email: "alice@example.com" },
    { id: 2, name: "Bob Brown", age: 45, email: "bob@example.com" },
  ]);

  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", email: "",phone:"",experience:"",password:"" });
  const [newPatient, setNewPatient] = useState({ name: "", age: "", email: "" });
  const [newAppoiment, setNewAppoiment] = useState({ Doctorname: "",  PatientName: "", Date: "" ,Time:""});

  const addDoctor = async () => {
    try {
      // Create auth user (automatically logs in if email confirmations are disabled)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newDoctor.email,
        password: newDoctor.password,
      });
    
      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');
    
      // Ensure the client is authenticated (optional check)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
    
      // Insert into doctor table with authenticated session
      const { data: doctorData, error } = await supabase
        .from('doctor')
        .insert([{
          id: authData.user.id,
          name: newDoctor.name,
          specialty: newDoctor.specialty,
          email: authData.user.email,
          phone: newDoctor.phone,
          experience: newDoctor.experience,
        }]);
    
      if (error) throw error;
      // if (!doctorData) throw new Error('Doctor creation failed');
      alert('Registration successful!');
      // Update local state
      setDoctors([...doctors, doctorData[0]]);
      setNewDoctor({ 
        name: "", 
        specialty: "", 
        email: "", 
        phone: "", 
        experience: "",
        password: "" 
      });
      
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert(error.message);
    }
  };

  const addPatient = () => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
    setNewPatient({ name: "", age: "", email: "" });
  };
   const addAppoiment = () => {
    setAppoiments([...Appointment, { ...newAppoiment, id: patients.length + 1 }]);
    setNewAppoiment({ Doctorname: "", PatientName: "", Date: "",Time:"" });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {/* Doctors Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-600">Doctors Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle size={18} />
                    Add Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input 
            placeholder="Full Name" 
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
          />
          <Input 
            placeholder="Specialty" 
            value={newDoctor.specialty}
            onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
          />
          <Input 
            placeholder="Email" 
            type="email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
          />
          <Input 
            placeholder="Phone" 
            value={newDoctor.phone}
            onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
          />
          <Input 
            placeholder="Experience (years)" 
            type="number"
            value={newDoctor.experience}
            onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
          />
          <Input
            placeholder="Password"
            type="password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({...newDoctor, password: e.target.value})}
          />
        </div>
        <DialogFooter>
          <Button onClick={addDoctor}>Save Doctor</Button>
        </DialogFooter>
      </DialogContent>
              </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[30%]">Name</TableHead>
                    <TableHead className="w-[25%]">Specialty</TableHead>
                    <TableHead className="w-[30%]">Email</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Patients Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-600">Patients Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle size={18} />
                    Add Patient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input 
                      placeholder="Full Name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    />
                    <Input 
                      placeholder="Age" 
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    />
                    <Input 
                      placeholder="Email" 
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={addPatient}>Save Patient</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[30%]">Name</TableHead>
                    <TableHead className="w-[20%]">Age</TableHead>
                    <TableHead className="w-[35%]">Email</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
           {/* Appoiment Section */}
           <div className="bg-white rounded-xl shadow-sm p-6 mb-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-600">Appoiments Management</h2>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[30%]">Docter Name</TableHead>
                    <TableHead className="w-[25%]">Patient Name</TableHead>
                    <TableHead className="w-[30%]">Date</TableHead>
                    <TableHead className="w-[30%]">Time</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;