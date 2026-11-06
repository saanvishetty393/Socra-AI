"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("College Freshman");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please complete all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      register(name, email, grade);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar publicNav={true} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-[#111827] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="text-sm text-slate-500 mb-6">Start your AI-guided learning journey.</p>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grade / Level</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
              >
                <option value="College Freshman">College Freshman</option>
                <option value="College Sophomore">College Sophomore</option>
                <option value="College Junior">College Junior</option>
                <option value="College Senior">College Senior</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}