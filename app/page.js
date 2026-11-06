import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar publicNav={true} />
      <main className="flex-1">
        <section className="py-20 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Learn any concept, one question at a time
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Socra guides students through interactive Socratic dialogue and instant quizzes to build genuine mastery without rote memorization.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg transition">
              Get Started
            </Link>
            <Link href="/login" className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition">
              Login
            </Link>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-[#111827] border-y border-slate-200 dark:border-slate-800 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">How Socra Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-2">1. Pick a topic</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Choose from biology, math, physics, and more tailored to your college level.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-2">2. Chat with your tutor</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Engage in guided Socratic conversation that helps you discover answers independently.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-2">3. Take a quiz</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Test your comprehension with instant feedback, explanations, and progress tracking.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}