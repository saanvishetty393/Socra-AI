"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLearning } from "../../context/LearningContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { topics, quizResults } = useLearning();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const totalQuizzes = quizResults.length;
  
  // Calculate average score using a simple loop
  let totalScoreSum = 0;
  for (let i = 0; i < quizResults.length; i++) {
    totalScoreSum += quizResults[i].percentage;
  }
  const avgScore = totalQuizzes ? Math.round(totalScoreSum / totalQuizzes) : 0;
  
  const weakTopics = quizResults.filter(r => r.percentage < 60);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-sm text-slate-500 mt-1">Ready to explore new concepts today?</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 px-4 py-2 rounded-xl text-amber-700 dark:text-amber-400 font-semibold text-sm">
              Streak: {user.streak || 4} Days
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Topics Explored</div>
              <div className="text-3xl font-bold">4</div>
            </div>
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Quizzes Taken</div>
              <div className="text-3xl font-bold">{totalQuizzes}</div>
            </div>
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Average Quiz Score</div>
              <div className="text-3xl font-bold">{avgScore}%</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recommended Topics</h2>
              <Link href="/topics" className="text-sm text-indigo-600 font-semibold hover:underline">View all</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {topics.slice(0, 3).map(topic => (
                <div key={topic.id} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">{topic.subject}</span>
                    <h3 className="text-lg font-semibold mt-3 mb-2">{topic.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{topic.description}</p>
                  </div>
                  <Link href={`/topics/${topic.id}`} className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center text-sm transition">
                    Start Learning
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {weakTopics.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">Topics to Review</h2>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">You scored below 60% on these topics. Practice again to strengthen mastery.</p>
              <div className="space-y-2">
                {weakTopics.map(wt => (
                  <div key={wt.id} className="flex items-center justify-between bg-white dark:bg-[#111827] p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                    <span className="font-semibold">{wt.topicTitle}</span>
                    <Link href={`/topics/${wt.topicId}`} className="text-sm font-semibold text-indigo-600 hover:underline">Practice again</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}