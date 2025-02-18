"use client";
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerDemo } from './Datepicker';

export default function Doctorcart({ doct }) {
  return (
    <div className="mt-10 mb-10 border-[#A7A7A7] border-2 rounded-lg w-56 p-6 transition-all duration-300 hover:shadow-2xl hover:border-[#0098ff] hover:scale-105">
      {/* Doctor Image */}
      <img
        src={doct.img}
        alt={`Dr. ${doct.name}`}
        className="w-[70%] mx-auto mb-4 rounded-md shadow-md"
      />

      {/* Doctor Name and Specialization */}
      <h2 className="font-semibold text-lg text-center">Dr. {doct.name}</h2>
      <h2 className="text-[#A7A7A7] text-sm text-center mb-4">{doct.slug}</h2>

      {/* Book Now Popover */}
      <Popover>
        <PopoverTrigger className="w-full text-[#0098ff] border-2 border-[#0098ff] py-2 px-4 rounded-full text-sm font-medium hover:bg-[#0098ff] hover:text-white transition-all duration-300">
          Book Now
        </PopoverTrigger>
        <PopoverContent className="w-80 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Appointment Date</h3>
            <DatePickerDemo />
            <button className="w-full bg-[#0098ff] text-white py-2 px-4 rounded-full hover:bg-[#007acc] transition-all duration-300">
              Submit
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
