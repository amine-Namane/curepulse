'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure this import is correct
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseclient";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function AdminForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);  // State to handle client-side rendering
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);  // This ensures the router logic runs on the client
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      setError(null);

      // 1. Authenticate user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      // 2. Get admin profile
      const { data: adminData, error: profileError } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", authData.user.id) // Match auth user ID
        .single();

      if (!adminData) {
        await supabase.auth.signOut();
        throw new Error("No admin profile found");
      }

      // 3. Redirect to admin dashboard
      if (isClient) {  // Only execute the redirection on the client side
        router.push("/Admin");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isClient) {
    return null; // Render nothing during SSR
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white mt-20 mb-20 rounded-2xl shadow-lg">
        <header className="text-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full">
              <img
                src="/assets/icons/admin-icon.svg"
                className="w-20 h-20 text-blue-600"
                alt="Admin Icon"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Manage system settings and data</p>
          </div>
        </header>

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
              placeholder="Enter your admin email"
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

        </form>
      </div>
    </div>
  );
}
