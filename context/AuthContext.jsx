"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { initialUser } from "../data/user";

const AuthContext = createContext();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = window.localStorage.getItem("socra_user");
      if (!savedUser) {
        setUser(initialUser);
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      if (
        parsedUser
        && typeof parsedUser === "object"
        && typeof parsedUser.name === "string"
        && parsedUser.name.trim()
        && typeof parsedUser.email === "string"
        && EMAIL_PATTERN.test(parsedUser.email)
      ) {
        setUser(parsedUser);
      } else {
        console.error("Saved Socra user data is invalid; using the demo user.");
        setUser(initialUser);
      }
    } catch (error) {
      console.error("Unable to load saved Socra user data; using the demo user.", error);
      setUser(initialUser);
    }
  }, []);

  const login = (email, password) => {
    const normalizedEmail = String(email).trim();
    const normalizedPassword = typeof password === "string" ? password.trim() : "";
    if (!EMAIL_PATTERN.test(normalizedEmail) || !normalizedPassword) {
      return { success: false, message: "Enter a valid email address and password." };
    }

    const userData = { ...initialUser, email: normalizedEmail };
    try {
      window.localStorage.setItem("socra_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Unable to save the Socra user session.", error);
      return { success: false, message: "Unable to save your session in this browser. Check your storage settings and try again." };
    }

    setUser(userData);
    return { success: true };
  };

  const register = (fullName, email, password, grade) => {
    const normalizedName = typeof fullName === "string" ? fullName.trim() : "";
    const normalizedEmail = String(email).trim();
    const normalizedPassword = typeof password === "string" ? password : "";
    if (!normalizedName || !EMAIL_PATTERN.test(normalizedEmail) || normalizedPassword.length < 6) {
      return { success: false, message: "Enter your name, a valid email, and a password of at least 6 characters." };
    }

    const userData = { name: normalizedName, email: normalizedEmail, grade, streak: 1 };
    try {
      window.localStorage.setItem("socra_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Unable to save the Socra user session.", error);
      return { success: false, message: "Unable to save your account in this browser. Check your storage settings and try again." };
    }

    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem("socra_user");
    } catch (error) {
      console.error("Unable to clear the saved Socra user session.", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);