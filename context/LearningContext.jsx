"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { topics } from "../data/topics";
import { tutorScripts, genericScript } from "../data/tutorScripts";
import { initialQuizHistory } from "../data/user";

const LearningContext = createContext();
const STORAGE_KEY = "socra_learning";

function isValidQuizResult(result) {
  return result
    && typeof result.topicId === "string"
    && Number.isFinite(result.score)
    && Number.isFinite(result.total)
    && result.total > 0;
}

function readSavedLearning() {
  try {
    const savedLearning = window.localStorage.getItem(STORAGE_KEY);
    if (!savedLearning) return null;

    const parsedLearning = JSON.parse(savedLearning);
    if (!parsedLearning || typeof parsedLearning !== "object") return null;

    const chatHistories = parsedLearning.chatHistories
      && typeof parsedLearning.chatHistories === "object"
      && !Array.isArray(parsedLearning.chatHistories)
      ? Object.fromEntries(
          Object.entries(parsedLearning.chatHistories)
            .filter(([, messages]) => Array.isArray(messages))
            .map(([topicId, messages]) => [
              topicId,
              messages.filter((message) => message && typeof message.text === "string"),
            ]),
        )
      : {};

    return {
      chatHistories,
      quizResults: Array.isArray(parsedLearning.quizResults)
        ? parsedLearning.quizResults.filter(isValidQuizResult)
        : null,
    };
  } catch (error) {
    console.error("Unable to load saved Socra learning data.", error);
    return null;
  }
}

export function LearningProvider({ children }) {
  const [chatHistories, setChatHistories] = useState({});
  const [quizResults, setQuizResults] = useState(initialQuizHistory);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedLearning = readSavedLearning();
    if (savedLearning) {
      setChatHistories(savedLearning.chatHistories);
      if (savedLearning.quizResults) {
        setQuizResults(savedLearning.quizResults);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ chatHistories, quizResults }));
    } catch (error) {
      console.error("Unable to save Socra learning data.", error);
    }
  }, [chatHistories, quizResults, loaded]);

  // Get or initialize chat messages for a specific topic
  const getChatHistory = (topicId) => {
    if (chatHistories[topicId]) {
      return chatHistories[topicId];
    }
    
    const script = tutorScripts[topicId] || genericScript;
    const initialMessages = [
      { sender: "tutor", text: script.greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    
    setChatHistories(prev => ({ ...prev, [topicId]: initialMessages }));
    return initialMessages;
  };

  // Send student message and simulate an AI tutor reply
  const sendMessage = (topicId, text) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { sender: "student", text, time: timeNow };
    
    setChatHistories(prev => {
      const currentMessages = prev[topicId] || [];
      return { ...prev, [topicId]: [...currentMessages, userMessage] };
    });

    // Simulate 1 second typing delay for AI response
    setTimeout(() => {
      const script = tutorScripts[topicId] || genericScript;
      let replyText = script.fallback;
      const lowerText = text.toLowerCase();

      if (lowerText.includes("simpler") || lowerText.includes("easy")) {
        replyText = script.simpler;
      } else if (lowerText.includes("example") || lowerText.includes("show")) {
        replyText = script.example;
      }

      const tutorMessage = { sender: "tutor", text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      
      setChatHistories(prev => {
        const currentMessages = prev[topicId] || [];
        return { ...prev, [topicId]: [...currentMessages, tutorMessage] };
      });
    }, 1000);
  };

  // Save completed quiz result
  const saveQuizResult = (topicId, topicTitle, score, total) => {
    const percentageScore = Math.round((score / total) * 100);
    const newEntry = {
      id: "q_hist_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      topicId,
      topicTitle,
      score,
      total,
      percentage: percentageScore
    };
    setQuizResults(prev => [newEntry, ...prev]);
  };

  // Calculate mastery status for a topic using simple loops
  const getProgress = (topicId) => {
    const topicResults = [];
    for (let i = 0; i < quizResults.length; i++) {
      if (quizResults[i].topicId === topicId) {
        topicResults.push(quizResults[i]);
      }
    }

    if (topicResults.length === 0) {
      return { status: "Not started", score: 0 };
    }

    let bestScore = 0;
    for (let i = 0; i < topicResults.length; i++) {
      if (topicResults[i].percentage > bestScore) {
        bestScore = topicResults[i].percentage;
      }
    }

    if (bestScore >= 80) return { status: "Mastered", score: bestScore };
    if (bestScore >= 60) return { status: "Getting there", score: bestScore };
    return { status: "Needs work", score: bestScore };
  };

  return (
    <LearningContext.Provider value={{ topics, getChatHistory, sendMessage, quizResults, saveQuizResult, getProgress }}>
      {children}
    </LearningContext.Provider>
  );
}

export const useLearning = () => useContext(LearningContext);