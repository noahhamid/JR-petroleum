// app/admin/page.tsx
import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  // Properly await cookies() in Next.js 15+
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  const isAuthenticated = session?.value === "authenticated";

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
