"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLearning } from "../../context/LearningContext";

export default function ProgressPage() {
  const { user } = useAuth();
  const { topics, quizResults, getProgress } = useLearning();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const totalQuizzes = quizResults.length;
  
  let scoreSum = 0;
  for (let i = 0; i < quizResults.length; i++) {
    scoreSum += quizResults[i].percentage;
  }
  const avgScore = totalQuizzes ? Math.round(scoreSum / totalQuizzes) : 0;

  // Count unique completed topics
  const uniqueTopicsCompleted = new Set(quizResults.map(r => r.topicId)).size;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold">Your Progress & Mastery</h1>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Topics Completed</div>
              <div className="text-3xl font-bold">{uniqueTopicsCompleted}</div>
            </div>
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Total Quizzes</div>
              <div className="text-3xl font-bold">{totalQuizzes}</div>
            </div>
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Average Score</div>
              <div className="text-3xl font-bold">{avgScore}%</div>
            </div>
            <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500 mb-1">Current Streak</div>
              <div className="text-3xl font-bold">{user.streak || 4} Days</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold">Mastery by Topic</h2>
            <div className="space-y-4">
              {topics.map(topic => {
                const prog = getProgress(topic.id);
                return (
                  <div key={topic.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 gap-4">
                    <div>
                      <h3 className="font-semibold">{topic.title}</h3>
                      <span className="text-xs text-slate-500">{topic.subject}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        prog.status === "Mastered" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" :
                        prog.status === "Getting there" ? "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400" :
                        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        {prog.status}
                      </span>
                      <Link href={`/topics/${topic.id}`} className="text-sm text-indigo-600 font-semibold hover:underline">
                        Practice
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold">Quiz History</h2>
            {quizResults.length === 0 ? (
              <p className="text-sm text-slate-500">No quizzes taken yet. Complete a quiz to see your history!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Topic</th>
                      <th className="pb-3">Score</th>
                      <th className="pb-3">Percentage</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {quizResults.map(res => (
                      <tr key={res.id}>
                        <td className="py-3 text-slate-500">{res.date}</td>
                        <td className="py-3 font-semibold">{res.topicTitle}</td>
                        <td className="py-3">{res.score} / {res.total}</td>
                        <td className="py-3 font-medium text-indigo-600">{res.percentage}%</td>
                        <td className="py-3 text-right">
                          <Link href={`/topics/${res.topicId}/quiz`} className="text-indigo-600 hover:underline font-medium">Retake</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}