
  "use client";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustemForm from "./ui/CustemForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,  
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import Link from "next/link";

const formSchema = z.object({
  user: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phone: z
.string().refine((phone)=>/^\+\d{10,15}$/.test(phone),
    "Phone number must be at least 10 digits." ),
});

export function DOctorForm() {
 const form = useForm({
   resolver: zodResolver(formSchema),
   defaultValues: { user: "" , email: "",
     phone: "",}
 });

 function onSubmit(values) {
   console.log(values);
   alert("Form submitted successfully!");
   form.reset();
  }
  const [value, setValue] = useState()
  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
        <header className="text-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full">
              <img 
                src="./assets/images/191 [Converted]-01 2.png" 
                className="w-20 h-20 text-blue-600"
                alt="Doctor Icon"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Doctor Portal
            </h1>
            <p className="text-gray-500 mt-2">
              Access patient records and medical information
            </p>
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustemForm
              control={form.control}
              name="user"
              label="Username"
              classlabel="text-gray-700 font-medium"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <CustemForm
              control={form.control}
              name="email"
              label="Email"
              classlabel="text-gray-700 font-medium"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button 
              type="submit" 
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition-colors duration-200"
            >
              Continue
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}