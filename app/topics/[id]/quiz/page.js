"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useLearning } from "../../../context/LearningContext";
import { quizzes } from "../../../data/quizzes";
import { topics } from "../../../data/topics";

export default function QuizPage() {
  const { user } = useAuth();
  const { saveQuizResult } = useLearning();
  const params = useParams();
  const router = useRouter();
  const topicId = params.id;

  const topic = topics.find(t => t.id === topicId) || { title: "Topic" };
  const qList = quizzes[topicId] || quizzes["photosynthesis"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const currentQ = qList[currentIndex];

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < qList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      saveQuizResult(topicId, topic.title, score, qList.length);
    }
  };

  if (finished) {
    const percentage = Math.round((score / qList.length) * 100);
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-2xl w-full mx-auto p-6 flex flex-col items-center justify-center text-center">
          <div className="bg-white dark:bg-[#111827] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl w-full">
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-slate-500 mb-6">Here is how you performed on {topic.title}</p>
            <div className="text-6xl font-extrabold text-indigo-600 mb-4">{score} / {qList.length}</div>
            <p className="text-lg font-medium mb-8">Score: {percentage}% - {percentage >= 80 ? "Fantastic mastery!" : percentage >= 60 ? "Good job!" : "Keep practicing!"}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => { 
                  setFinished(false); 
                  setCurrentIndex(0); 
                  setScore(0); 
                  setSelectedOption(null); 
                  setShowExplanation(false); 
                }} 
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                Retry Quiz
              </button>
              <Link href={`/topics/${topicId}`} className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
                Back to Chat
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">{topic.title} Quiz</h1>
        <span className="text-sm font-medium text-slate-500">Question {currentIndex + 1} of {qList.length}</span>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 flex flex-col justify-center">
        <div className="bg-white dark:bg-[#111827] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "border-slate-200 dark:border-slate-700 hover:border-indigo-500";
              if (showExplanation) {
                if (idx === currentQ.correct) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-medium";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-700 dark:text-red-300 font-medium";
                }
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm">
              <span className="font-semibold block mb-1">Explanation:</span>
              <p className="text-slate-600 dark:text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button onClick={handleNext} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
              {currentIndex + 1 < qList.length ? "Next Question" : "See Results"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}