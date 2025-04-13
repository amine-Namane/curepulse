// "use client";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import CustemForm from './custemForm';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useState } from 'react';
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseclient";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   user: z.string().min(2, { message: "Username must be at least 2 characters." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
//     message: "Phone number must be at least 10 digits.",
//   }),
// });

// export function PatientForm() {
//   // const router = useRouter();
//   // const [phoneValue, setPhoneValue] = useState();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   setError(null);

//   //   const { data, error } = await supabase.auth.signInWithPassword({
//   //     email,
//   //     password,
//   //   });

//   //   if (error) {
//   //     setError(error.message);
//   //   } else {
//   //     console.log("User logged in:", data.user);
//   //     router.push("/dashboard"); // Redirect to the patient dashboard
//   //   }};
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   // function onSubmit(values) {
//   //   console.log(values);
//   //   alert("Form submitted successfully!");
//   //   form.reset();
//   //   router.push("/Home");
//   // }
//   async function onSubmit(values) {
//     try {
//       // 1. Authenticate user
//       const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
//         email: values.email,
//         password: values.password
//       });
  
//       if (authError) throw authError;
//   console.log(values);
//       // 2. Get doctor profile (corrected table/column)
//       const { data: doctorData, error: profileError } = await supabase
//         .from('patients')
//         .select('*')
//         .eq('user_id', authData.user.id) // Match auth user ID
//         .single();
  

        
//       //3. Handle missing profile
//       if (!doctorData) {
//         await supabase.auth.signOut();
//         throw new Error('No doctor profile found');
//       }
  
//       // // 4. Verify role
//       // if (doctorData.role !== 'doctor') {
//       //   await supabase.auth.signOut();
//       //   throw new Error('Access restricted to medical staff');
//       // }
  
//       // 5. Redirect to dashboard
//       router.push('/Home');
      
//     } catch (error) {
//       setError(error.message);
//     }}
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
//         <header className="text-center space-y-4">
//           <div className="flex flex-col items-center">
//             <div className="p-4 bg-blue-100 rounded-full">
//               <img 
//                 src="/assets/icons/cardiologist.svg" 
//                 className="w-12 h-12 text-blue-600"
//                 alt="Patient Icon"
//               />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mt-4">
//               Patient Portal
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Access your medical records and health information
//             </p>
//           </div>
//         </header>

//         {/* <Form {...form}> */}
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//          {/* Email Input */}
//          <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               {...form.register("email")}
//               id="email"
//               type="email"
//               placeholder="Enter your professional email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {form.formState.errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.email.message}
//               </p>
//             )}
//           </div>
//              {/* Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               {...form.register("password")}
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {form.formState.errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.password.message}
//               </p>
//             )}
//           </div>
//             {/* Error Message */}
//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//             <Button
//             type="submit"
//             className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition-colors duration-200"
//             disabled={loading}
//           >
//             {loading ? "Authenticating..." : "Continue"}
//           </Button>

//             <div className="text-center text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link 
//                 href="/Singup" 
//                 className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
//               >
//                 Create account
//               </Link>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center">
//                 <span className="bg-white px-4 text-gray-500">Or</span>
//               </div>
//             </div>

//             <Button
//               variant="outline"
//               className="w-full py-6 text-gray-700 border-gray-300 hover:bg-gray-50 text-lg font-semibold rounded-lg transition-colors duration-200"
//               onClick={() => router.push("/Admin")}
//             >
//               Continue as Doctor
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full py-6 text-white bg-black border-gray-300 hover:bg-gray-50 text-lg font-semibold rounded-lg transition-colors duration-200"
//               onClick={() => router.push("/Admin")}
//             >
//               Continue as Admin
//             </Button>
//           </form>
//         {/* </Form> */}
//       </div>
//     </div>
//   );
// }

// "use client";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import CustemForm from "./CustemForm";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,  
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useState } from 'react';
// import Link from "next/link";

// const formSchema = z.object({
//   user: z.string().min(2, { message: "Username must be at least 2 characters." }),
//   email: z
//     .string()
//     .email({ message: "Please enter a valid email address." }),
//   phone: z
// .string().refine((phone)=>/^\+\d{10,15}$/.test(phone),
//     "Phone number must be at least 10 digits." ),
// });

// export function DOctorForm() {
//  const form = useForm({
//    resolver: zodResolver(formSchema),
//    defaultValues: { user: "" , email: "",
//      phone: "",}
//  });

//  function onSubmit(values) {
//    console.log(values);
//    alert("Form submitted successfully!");
//    form.reset();
//   }
//   const [value, setValue] = useState()
//   return (
//     <div className="flex justify-center  items-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
//         <header className="text-center space-y-4">
//           <div className="flex flex-col items-center">
//             <div className="p-4 bg-blue-100 rounded-full">
//               <img 
//                 src="./assets/images/191 [Converted]-01 2.png" 
//                 className="w-20 h-20 text-blue-600"
//                 alt="Doctor Icon"
//               />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mt-4">
//               Doctor Portal
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Access patient records and medical information
//             </p>
//           </div>
//         </header>

//         <Form {...form} onSubmit={handleLogin}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <CustemForm
//               control={form.control}
//               name="email"
//               label="Email"
//               type='email'
//               setEmail={setEmail}
//               value={email}
//               classlabel="text-gray-700 font-medium"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//              <CustemForm
//               control={form.control}
//               name="password"
//               label="password"
//               type="password"
//               setPassword={setPassword}
//               value={password}
//               classlabel="text-gray-700 font-medium"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             <Button 
//               type="submit" 
//               className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition-colors duration-200"
//             >
//               Continue
//             </Button>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export  function PatientForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Uncomment this line
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values) {
    try {
      // 1. Authenticate user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
  
      if (authError) throw authError;
      // 2. Get doctor profile (corrected table/column)
      const { data: doctorData, error: profileError } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', authData.user.id) // Match auth user ID
        .single();
  

        
      //3. Handle missing profile
      if (!doctorData) {
        await supabase.auth.signOut();
        throw new Error('No doctor profile found');
      }
  
      // // 4. Verify role
      // if (doctorData.role !== 'doctor') {
      //   await supabase.auth.signOut();
      //   throw new Error('Access restricted to medical staff');
      // }
  
      // 5. Redirect to dashboard
      router.push('/Home');
      
    } catch (error) {
      setError(error.message);
    }
  }
  // async function onSubmit(values) {
  // const { data, error } = await supabase.auth.signInWithPassword({ email:values.email, password:values.password });
  
  // if (error) {
  //   console.error('Login error:', error.message);
  //   // Display error message to the user
  // } else {
  //   console.log('Login successful!', data.user);
  //   // Redirect the doctor to their dashboard or load profile data
  // }}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
      <header className="text-center space-y-4">
          <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 rounded-full">
               <img                 src="/assets/icons/cardiologist.svg" 
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

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="Enter your professional email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...form.register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Continue"}
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
              onClick={() => router.push("/Doctorsingin")}
            >
              Continue as Doctor
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 text-white bg-black border-gray-300 hover:bg-gray-50 text-lg font-semibold rounded-lg transition-colors duration-200"
              onClick={() => router.push("/Adminlogin")}
            >
              Continue as Admin
            </Button>
          </form>
        {/* </Form> */}
      </div>
    </div>
  );
}

// "use client";
// import { useEffect } from "react";
// import { supabase } from "@/lib/supabaseclient";

// export  function DoctorForm() {
//   useEffect(() => {
//     async function testAuth() {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: "aminenamane258@gmail.com",
//         password: "aminenamane258@gmail.com"
//       });
//       console.log("Auth Data:", data, "Error:", error);
//     }
//     testAuth();
//   }, []);

//   return <div>Testing Supabase Auth</div>;
// }



