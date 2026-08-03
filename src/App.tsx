import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Requests from "./pages/Requests";
import Settings from "./pages/Settings";
import Experience from "./pages/Experience";
import Services from "./pages/Services";
import Specialties from "./pages/Specialties";
import Testimonials from "./pages/Testimonials";
import ContactUs from "./pages/ContactUs";

import "./index.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]" dir="rtl">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden lg:pr-72 transition-all">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#050505]">
          <div className="max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/clinic-times" element={<Portfolio />} />
              <Route path="/appointments" element={<Requests />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/why-choose-us" element={<Experience />} />
              <Route path="/services" element={<Services />} />
              <Route path="/specialties" element={<Specialties />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
