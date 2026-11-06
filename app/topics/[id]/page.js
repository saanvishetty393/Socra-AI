"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { useLearning } from "../../../context/LearningContext";

export default function TutorChatPage() {
  const { user } = useAuth();
  const { topics, getChatHistory, sendMessage } = useLearning();
  const params = useParams();
  const router = useRouter();
  const topicId = params.id;

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const topic = topics.find(t => t.id === topicId) || { title: "Topic", subject: "General" };
  const history = getChatHistory(topicId);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!user) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(topicId, input);
    setInput("");
  };

  const handleChip = (chipText) => {
    if (chipText === "Test me") {
      router.push(`/topics/${topicId}/quiz`);
      return;
    }
    sendMessage(topicId, chipText);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/topics" className="text-sm text-indigo-600 font-semibold hover:underline">Topics</Link>
          <div>
            <h1 className="font-bold text-lg">{topic.title}</h1>
            <span className="text-xs text-slate-500">{topic.subject}</span>
          </div>
        </div>
        <Link href={`/topics/${topicId}/quiz`} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition">
          Take Quiz
        </Link>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
        <div className="space-y-4 mb-6 overflow-y-auto flex-1 pr-2">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-sm ${
                msg.sender === "student"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-bl-none shadow-sm"
              }`}>
                <p>{msg.text}</p>
                <span className={`block text-[10px] mt-1 text-right ${msg.sender === "student" ? "text-indigo-200" : "text-slate-400"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {["Explain simpler", "Give an example", "Test me"].map(chip => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              {chip}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your tutor a question..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827]"
          />
          <button type="submit" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}