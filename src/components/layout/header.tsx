"use client"

import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useActiveSectionContext } from "@/context/active-section-context";

import { useTheme } from "next-themes";

export default function Header() {
  const { activeSection, setActiveSection } = useActiveSectionContext();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [openNav, setOpenNav] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const visitLinkedin = () => {
    window.open("https://www.linkedin.com/in/shahjalal-bu/", "_blank");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-normal">
        <Link 
          href="/#home" 
          onClick={() => setActiveSection("home")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'home' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          Home
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link 
          href="/#about" 
          onClick={() => setActiveSection("about")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'about' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          About me
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link 
          href="/#projects" 
          onClick={() => setActiveSection("projects")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'projects' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          Projects
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link 
          href="/blog" 
          onClick={() => setActiveSection("blog")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'blog' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          Blog
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link 
          href="/utilities" 
          onClick={() => setActiveSection("utilities")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'utilities' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          Utilities
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link 
          href="/#contact" 
          onClick={() => setActiveSection("contact")}
          className={`flex items-center hover:text-amber-500 transition-colors ${activeSection === 'contact' ? "text-amber-500" : 'text-slate-700 dark:text-slate-200'}`}
        >
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scroll ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 text-slate-900 dark:text-white">
        <Link href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          <div className="font-bold text-2xl">
            {"<"} <span className="text-amber-500">Shah</span>
            <span className="text-blue-500">Jalal</span> {"/>"}
          </div>
        </Link>
        
        <div className="hidden lg:block">{navList}</div>
        
        <div className="flex items-center gap-4 justify-end">
          <button 
            className="cursor-pointer p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
            onClick={handleDarkMode}
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />)}
          </button>

          <button
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <Button 
            className="hidden lg:inline-flex bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white border-none"
            onClick={visitLinkedin}
          >
            Let's talk!
          </Button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
        openNav ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container mx-auto px-4 pb-4 bg-white dark:bg-slate-900 shadow-lg lg:shadow-none rounded-b-lg">
          {navList}
          <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={visitLinkedin}>
            Let's talk!
          </Button>
        </div>
      </div>
    </nav>
  );
}
