"use client"

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";
import About from "@/components/sections/about";
import Project from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import LoveToDo from "@/components/sections/love-to-do";
import Blogs from "@/components/blog/blogs";
import Footer from "@/components/footer";
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
    <>
      <ScrollDetector />
      
      {/* Hero Section - Full Width Background */}
      <div className="relative flex flex-col-reverse sm:flex-row-reverse gap-8 sm:min-h-[90vh] pt-20 overflow-hidden" id="home">
        {/* Animated gradient background - Full width */}
        <div className="absolute inset-0 bg-gradient-glow bg-grid-pattern -z-10" />
        
        {/* Content Container */}
        <div className="container mx-auto px-4 flex flex-col-reverse sm:flex-row-reverse gap-8">
          <div className="rounded-2xl flex-1 flex flex-col justify-center p-6 sm:p-10 relative">
            {/* Glowing accent */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-[120px] -z-10" />
            
            <div className="text-gradient-secondary text-xl sm:text-2xl font-semibold sm:mt-14 mb-2">
              Hello! I am
            </div>
            <h1 className="text-5xl sm:text-7xl font-luckiestGuy text-gradient-primary mb-2">
              Md Shahjalal
            </h1>
            <h2 className="text-gradient-secondary font-bold text-3xl sm:text-5xl my-2 sm:my-4">
              Full Stack Developer
            </h2>
            <div className="flex items-center gap-3 font-semibold text-foreground mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-violet-500 w-3 h-3 rounded-full glow-blue animate-pulse" />
              <div>Web Developer</div>
              <div className="bg-gradient-to-r from-violet-500 to-cyan-500 w-3 h-3 rounded-full glow-violet animate-pulse" />
              <div>Programmer</div>
            </div>
            
            <div className="hero-footer flex items-center md:gap-6 mt-6 sm:mt-14 gap-4 flex-wrap">
              <Button 
                asChild 
                className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg glow-blue hover:glow-violet transition-all duration-300 transform hover:scale-105"
              >
                <a href="#contact">Contact me</a>
              </Button>
         
              <a 
                target="_blank" 
                href="https://github.com/shahjalal-bu" 
                className="text-foreground hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
              >
                <div className="p-3 rounded-xl bg-gradient-glow hover:glow-blue transition-all duration-300">
                  <AiFillGithub size={32} />
                </div>
              </a>
              <a 
                target="_blank" 
                href="https://www.linkedin.com/in/shahjalal-bu/" 
                className="text-foreground hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <div className="p-3 rounded-xl bg-gradient-glow hover:glow-blue transition-all duration-300">
                  <AiFillLinkedin size={32} />
                </div>
              </a>
              <a 
                target="_blank" 
                href="https://fb.com/shahjalal.bu" 
                className="text-foreground hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
              >
                <div className="p-3 rounded-xl bg-gradient-glow hover:glow-blue transition-all duration-300">
                  <AiFillFacebook size={32} />
                </div>
              </a>
            </div>
          </div>
          
          <div className="rounded-2xl flex items-center justify-center p-6 sm:p-10 relative">
            {/* Glowing effect behind animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl blur-xl" />
            <div className="relative">
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_jtbfg2nb.json"
                className="w-96 h-72 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections - With Container */}
      <div className="container mx-auto px-4">
        <div id="about">
          <About />
        </div>
        
        {/* Separator */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="projects">
          <Project />
        </div>
        
        {/* Separator */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <LoveToDo />
        
        {/* Separator */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="blog">
          <Blogs />
        </div>
        
        {/* Separator */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="contact">
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
