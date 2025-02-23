"use client";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustemForm from './custemForm';
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
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  user: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
    message: "Phone number must be at least 10 digits.",
  }),
});

export function PatientForm() {
  // const router = useRouter();
  // const [phoneValue, setPhoneValue] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("User logged in:", data.user);
      router.push("/dashboard"); // Redirect to the patient dashboard
    }};
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    alert("Form submitted successfully!");
    form.reset();
    router.push("/Home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
        <header className="text-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full">
              <img 
                src="/assets/icons/cardiologist.svg" 
                className="w-12 h-12 text-blue-600"
                alt="Patient Icon"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Patient Portal
            </h1>
            <p className="text-gray-500 mt-2">
              Access your medical records and health information
            </p>
          </div>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustemForm
          setEmail={setEmail}
              control={form.control}
              name="email"
              label="Email"
              type='email'
              classlabel="text-gray-700 font-medium"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
             <CustemForm
             setPassword={setPassword}
              control={form.control}
              name="password"
              label="password"
              type="password"
              classlabel="text-gray-700 font-medium"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button 
              type="submit" 
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition-colors duration-200"
            >
              Continue
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/Singup" 
                className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
              >
                Create account
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-gray-500">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full py-6 text-gray-700 border-gray-300 hover:bg-gray-50 text-lg font-semibold rounded-lg transition-colors duration-200"
              onClick={() => router.push("/Admin")}
            >
              Continue as Doctor
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 text-white bg-black border-gray-300 hover:bg-gray-50 text-lg font-semibold rounded-lg transition-colors duration-200"
              onClick={() => router.push("/Admin")}
            >
              Continue as Admin
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

