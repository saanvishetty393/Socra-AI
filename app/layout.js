import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { LearningProvider } from "../context/LearningContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Socra - AI Tutor",
  description: "Learn any concept, one question at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-[#F1F5F9] min-h-screen flex flex-col`}>
        <ThemeProvider>
          <AuthProvider>
            <LearningProvider>
              {children}
            </LearningProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}