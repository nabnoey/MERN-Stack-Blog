import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
const MainLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
      <nav>
        <NavBar />
      </nav>
      <main className="grow flex items-center justify-center container min-h-screen mx-auto pt-5 mt-5 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayouts;
