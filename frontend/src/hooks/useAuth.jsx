"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import axios from "@/services/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      axios
        .get("/api/user/", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    Cookies.remove("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
