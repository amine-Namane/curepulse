'use client'
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile", icon: "👤" },
    { name: "Appointment", icon: "📅" },
    { name: "Log out", icon: "🚪" }
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
                href={
                  item.name === "Dashboard" ? "/DoctorHome" :
                  item.name === "Log out" ? "/" : `/DoctorHome/${item.name}`
                }
                key={index}
              >
                <li
                key={index}
                  onClick={() => setActiveItem(item.name)}
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
