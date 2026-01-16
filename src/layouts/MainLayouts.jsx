import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
const MainLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      <nav>
        <NavBar />
      </nav>
      <main className="grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayouts;
