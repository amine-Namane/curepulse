"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseclient";
import { getAuthenticatedUser } from "@/lib/auth"; // Import auth function
export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();
  useEffect(() => {
     function checkAuth() {
      const user =  getAuthenticatedUser(); // Use the server function
      if (!user) {
        router.push("/DoctorHome"); // Redirect if not authenticated
        return;
      }
      setUser(user);
      setLoading(false);
    }

    checkAuth();
  }, [router]);
  if (loading) return <p>Loading...</p>;
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/Doctorsingin');
  };
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile", icon: "👤" },
    { name: "Appointment", icon: "📅" },
    { name: "Log out", icon: "🚪" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-100">
        <nav className="p-4">
          <div className="mb-8 pl-4">
            <h1 className="text-2xl font-bold text-blue-600">HealthCare</h1>
            <p className="text-sm text-gray-500">Doctor Portal</p>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={
                  item.name === "Dashboard"
                    ? "/DoctorHome"
                    : item.name === "Log out"
                    ? "/"
                    : `/DoctorHome/${item.name}`
                }
              >
                <li
                  onClick={() => {
                    if (item.name === "Log out") handleLogout();
                    setActiveItem(item.name);
                  }}
                  className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                    ${
                      activeItem === item.name
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span
                    className={`text-md font-medium ${
                      activeItem === item.name
                        ? "text-blue-600"
                        : "text-gray-600 group-hover:text-blue-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
