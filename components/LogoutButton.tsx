// components/LogoutButton.tsx
"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button
      onClick={handleLogout}
      className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition duration-200 transform hover:scale-105"
    >
      Logout
    </button>
  );
}
