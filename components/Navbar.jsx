"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ publicNav = false }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={user && !publicNav ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            S
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">Socra</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {publicNav || !user ? (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600">Login</Link>
              <Link href="/register" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm transition">Get Started</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm font-medium text-red-600 hover:underline">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}