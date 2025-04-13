// app/components/AuthenticatedLayout.jsx
import { getAuthenticatedUser } from "@/lib/auth";
import Layout from "./Layout"; // Import the Client Component

export default async function AuthenticatedLayout({ children }) {
  const user = await getAuthenticatedUser(); // Fetch user on the server

  return <Layout user={user}>{children}</Layout>;
}
