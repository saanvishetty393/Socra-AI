"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { initialUser } from "../data/user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load saved user session or default mock user
  useEffect(() => {
    const savedUser = localStorage.getItem("socra_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(initialUser);
    }
  }, []);

  // Mock login function
  const login = (email, password) => {
    const userData = { ...initialUser, email };
    setUser(userData);
    localStorage.setItem("socra_user", JSON.stringify(userData));
  };

  // Mock register function
  const register = (fullName, email, grade) => {
    const userData = { name: fullName, email, grade, streak: 1 };
    setUser(userData);
    localStorage.setItem("socra_user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("socra_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);