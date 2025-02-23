"use client";
import 'react-phone-number-input/style.css'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from 'react-phone-number-input'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustemForm from '../custemForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DatePickerDemo } from './Datepicker';
import { useState } from 'react';

const formSchema = z.object({
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username too long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  phone: z.string().min(5, "Invalid phone number"),
  gender: z.enum(["male", "female", "other"]),
  birthDate: z.date(),
  emergencyContactName: z.string().min(2, "Name too short"),
  emergencyContactPhone: z.string().min(5, "Invalid phone number"),
  address: z.object({
    street: z.string().min(2),
    city: z.string().min(2),
    postalCode: z.string().min(4)
  }),
  medicalInfo: z.object({
    bloodType: z.string().optional(),
    allergies: z.string().optional(),
    medicalConditions: z.string().optional(),
    currentMedications: z.string().optional(),
    insuranceProvider: z.string().optional(),
    insurancePolicyNumber: z.string().optional(),
  }).optional(),
});

export function PatientSignup() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      gender: "male",
      birthDate: new Date(),
      emergencyContactName: "",
      emergencyContactPhone: "",
      address: {
        street: "",
        city: "",
        postalCode: ""
      },
      medicalInfo: {
        bloodType: "",
        allergies: "",
        medicalConditions: "",
        currentMedications: "",
        insuranceProvider: "",
        insurancePolicyNumber: ""
      }
    }
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      // Replace with actual API call
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Registration successful!");
      form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0089FF] mb-2">Patient Registration</h1>
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0089FF] hover:underline">
              Sign in
            </Link>
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <CustemForm
                  control={form.control}
                  name="username"
                  label="Username"
                  className="rounded-lg"
                />
                
                <CustemForm
                  control={form.control}
                  name="email"
                  label="Email"
                  className="rounded-lg"
                />
                
                <CustemForm
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  className="rounded-lg"
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          defaultCountry="DZ"
                          international
                          className="border-2 border-[#0089FF] rounded-lg p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" }
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={option.value} />
                              <Label htmlFor={option.value}>{option.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <DatePickerDemo
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <CustemForm
                  control={form.control}
                  name="emergencyContactName"
                  label="Emergency Contact Name"
                  className="rounded-lg"
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          defaultCountry="DZ"
                          international
                          className="border-2 border-[#0089FF] rounded-lg p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <CustemForm
                  control={form.control}
                  name="address.street"
                  label="Street Address"
                  className="rounded-lg"
                />
                
                <CustemForm
                  control={form.control}
                  name="address.city"
                  label="City"
                  className="rounded-lg"
                />
                
                
              </div>

              {/* Medical Information */}
              <div className="space-y-4 col-span-2">
                <h3 className="text-xl font-semibold text-[#0089FF] border-b pb-2">
                  Medical Information (Optional)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="medicalInfo.bloodType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalInfo.allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Penicillin, Pollen"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalInfo.medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Diabetes, Hypertension"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalInfo.currentMedications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Metformin 500mg, Lisinopril 10mg"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalInfo.insuranceProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Provider</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Insurance company name"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalInfo.insurancePolicyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Policy Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Policy number"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#0089FF] hover:bg-[#0075D9] text-white rounded-lg px-8 py-4"
                disabled={loading}
              >
                {loading ? "Processing..." : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}