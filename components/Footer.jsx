export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 dark:text-white">Socra AI Tutor</span> - College Project Demo
        </div>
        <div className="flex gap-6">
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        </div>
      </div>
    </footer>
  );
}