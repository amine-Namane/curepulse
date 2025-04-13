// "use client";
// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseclient";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { DatePickerDemo } from "./Datepicker";
// import Patient from "@/app/Patient/page";

// export default function Doctorcart({ doct }) {
//   const [selectedTime, setSelectedTime] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleBooking = async () => {
//     console.log(selectedDate,selectedTime)
//     if (!selectedDate || !selectedTime) {
//       alert("Please select both a date and time.");
//       return;
//     }

//     const { data, error } = await supabase.from("Appointment").insert([
//       {
//         doctor_id: doct.id,
//         patient_id:"530c33ae-72ea-4393-9ab1-a89b8b84f5e4",
//         status:false,
//        // doctor_name: doct.name,
//        // specialty: doct.specialty,
//         appointment_date: selectedDate,
//         appointment_time: selectedTime,
//       },
//     ]);

//     if (error) {
//       console.error("Error saving appointment:", error);
//       alert("Failed to book appointment. Please try again.");
//     } else {
//       alert("Appointment booked successfully!");
//     }
//   };

//   return (
//     <div className="mt-10 mb-10 border-[#A7A7A7] border-2 rounded-lg w-56 p-6 transition-all duration-300 hover:shadow-2xl hover:border-[#0098ff] hover:scale-105">
//       {/* Doctor Image */}
//       <img
//         src={doct.img}
//         alt={`Dr. ${doct.name}`}
//         className="w-[70%] mx-auto mb-4 rounded-md shadow-md"
//       />

//       {/* Doctor Name and Specialization */}
//       <h2 className="font-semibold text-lg text-center">{doct.name}</h2>
//       <h2 className="text-[#A7A7A7] text-sm text-center mb-4">{doct.specialty}</h2>
      
//       {/* Hidden Doctor ID */}
//       <input type="hidden" value={doct.id} />

//       {/* Book Now Popover */}
//       <Popover>
//         <PopoverTrigger className="w-full text-[#0098ff] border-2 border-[#0098ff] py-2 px-4 rounded-full text-sm font-medium hover:bg-[#0098ff] hover:text-white transition-all duration-300">
//           Book Now
//         </PopoverTrigger>
//         <PopoverContent className="w-80 p-6">
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Select Appointment Date & Time</h3>
//             <DatePickerDemo  onDateSelect={(date) => {
//               console.log("Selected Date:", date);
//               setSelectedDate(date);
//             }} />
            
//             {/* Time Picker */}
//             <select
//               className="w-full border-2 border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:border-[#0098ff]"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//             >
//               <option value="">Select Time</option>
//               <option value="09:00 AM">09:00 AM</option>
//               <option value="10:00 AM">10:00 AM</option>
//               <option value="11:00 AM">11:00 AM</option>
//               <option value="01:00 PM">01:00 PM</option>
//               <option value="02:00 PM">02:00 PM</option>
//               <option value="03:00 PM">03:00 PM</option>
//               <option value="04:00 PM">04:00 PM</option>
//               <option value="05:00 PM">05:00 PM</option>
//             </select>

//             <button
//               onClick={handleBooking}
//               className="w-full bg-[#0098ff] text-white py-2 px-4 rounded-full hover:bg-[#007acc] transition-all duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerDemo } from "./Datepicker";

export default function Doctorcart({ doct }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [user, setUser] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenChange = (open) => {
    if (open && !user) {
      router.push("/Patient");
      return;
    }
    setOpenPopover(open);
  };

  const handleBooking = async () => {
    if (!user) {
      alert("Please log in to book an appointment.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time.");
      return;
    }

    try {
      const { error } = await supabase.from("Appointment").insert([
        {
          doctor_id: doct.id,
      patient_id:"530c33ae-72ea-4393-9ab1-a89b8b84f5e4",
         status:false,
       // doctor_name: doct.name,
        // specialty: doct.specialty,
         appointment_date: selectedDate,
         appointment_time: selectedTime,
        },
      ]);

      if (error) throw error;
      
      alert("Appointment booked successfully!");
      setOpenPopover(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="mt-10 mb-10 border-[#A7A7A7] border-2 rounded-lg w-56 p-6 transition-all duration-300 hover:shadow-2xl hover:border-[#0098ff] hover:scale-105">
      {/* Doctor Image */}
      <img
        src={doct.image_url}
        alt={`Dr. ${doct.name}`}
        className="w-[70%] mx-auto mb-4 rounded-md shadow-md"
      />

      {/* Doctor Name and Specialization */}
      <h2 className="font-semibold text-lg text-center">{doct.name}</h2>
      <h2 className="text-[#A7A7A7] text-sm text-center mb-4">{doct.specialty}</h2>

      {/* Book Now Popover */}
      <Popover open={openPopover} onOpenChange={handleOpenChange}>
        <PopoverTrigger className="w-full text-[#0098ff] border-2 border-[#0098ff] py-2 px-4 rounded-full text-sm font-medium hover:bg-[#0098ff] hover:text-white transition-all duration-300">
          Book Now
        </PopoverTrigger>
        <PopoverContent className="w-80 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Appointment Date & Time</h3>
            <DatePickerDemo 
              onDateSelect={(date) => setSelectedDate(date)}
            />
            
            {/* Time Picker */}
            <select
              className="w-full border-2 border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:border-[#0098ff]"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
            </select>

            <button
              onClick={handleBooking}
              className="w-full bg-[#0098ff] text-white py-2 px-4 rounded-full hover:bg-[#007acc] transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}