import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { NewsProvider } from "../context/NewsContext";

export function MainLayouts() {
  return (
    <AuthProvider>
      <NewsProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="bg-white">
            <Outlet />
          </main>
          <Footer />
        </div>
      </NewsProvider>
    </AuthProvider>
  );
}

