"use client"

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";
import About from "@/components/sections/about";
import Project from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import LoveToDo from "@/components/sections/love-to-do";
import Blogs from "@/components/blog/blogs";
import { useActiveSectionContext } from "@/context/active-section-context";
import { Button } from "@/components/ui/button";

// Dynamically import Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const ScrollDetector = () => {
  const { setActiveSection } = useActiveSectionContext();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("id") || "home");
        }
      });
    }, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Better threshold for section detection
      threshold: 0,
    });

    const sections = document.querySelectorAll("section[id], div[id='home']");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);

  return null;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null; // Or a skeleton

  return (
    <div className="container mx-auto px-4">
      <ScrollDetector />
      
      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row-reverse gap-2 sm:min-h-[90vh] pt-20" id="home">
        <div className="rounded-lg flex-1 flex flex-col justify-center p-5 sm:p-10 shadow-sm mb-2">
          <div className="text-cyan-400 text-xl sm:mt-14">Hello! I am</div>
          <h1 className="text-5xl sm:text-7xl font-luckiestGuy text-slate-900 dark:text-white">Md Shahjalal</h1>
          <h2 className="text-cyan-400 font-bold text-3xl sm:text-5xl my-1 sm:my-3">
            Full Stack Developer
          </h2>
          <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <div className="bg-amber-400 w-2 aspect-square rounded-full"></div>
            <div>Web Developer</div>
            <div className="bg-amber-400 w-2 aspect-square rounded-full"></div>
            <div>Programmer</div>
          </div>
          
          <div className="hero-footer flex items-center md:gap-5 mt-5 sm:mt-14 gap-3">
            <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
              <a href="#contact">Contact me</a>
            </Button>
       
            <a target="_blank" href="https://github.com/shahjalal-bu" className="text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
              <div className="p-1 rounded-lg flex justify-center items-center">
                <AiFillGithub size={30} />
              </div>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/shahjalal-bu/" className="text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
              <div className="p-1 rounded-lg flex justify-center items-center">
                <AiFillLinkedin size={30} />
              </div>
            </a>
            <a target="_blank" href="https://fb.com/shahjalal.bu" className="text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors">
              <div className="p-1 rounded-lg flex justify-center items-center">
                <AiFillFacebook size={30} />
              </div>
            </a>
          </div>
        </div>
        
        <div className="rounded-lg flex items-center justify-center p-5 sm:p-10 shadow-sm mb-2">
          <Player
            autoplay
            loop
            src="https://assets4.lottiefiles.com/packages/lf20_jtbfg2nb.json"
            className="w-96 h-72"
          />
        </div>
      </div>

      <div id="about">
        <About />
      </div>
      
      <div id="projects">
        <Project />
      </div>
      
      <LoveToDo />
      
      <div id="blog">
        <Blogs />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
