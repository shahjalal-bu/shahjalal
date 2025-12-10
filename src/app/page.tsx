"use client"

import { useEffect, useState } from "react";
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
import { useGSAPScrollAnimations } from "@/hooks/useGSAPScrollAnimations";

// Dynamically import Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const ScrollDetector = () => {
  const { setActiveSection } = useActiveSectionContext();
  
  useEffect(() => {
    // Section tracking observer (keep for navigation)
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("id") || "home");
        }
      });
    }, {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    });

    // Observe sections for active state
    const sections = document.querySelectorAll("section[id], div[id='home']");
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      sectionObserver.disconnect();
    };
  }, [setActiveSection]);

  // Use GSAP scroll animations
  useGSAPScrollAnimations();

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
      
      {/* Hero Section - Clean Connecteam Style */}
      <div className="relative min-h-[90vh] bg-white dark:bg-gray-900 pt-20" id="home">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6" data-animate>
              <div className="space-y-4">
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                  Hello! I am
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                  Md Shahjalal
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                  Full Stack Developer
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                  Building modern web applications with clean code and exceptional user experiences
                </p>
              </div>
              
              {/* CTA and Social Links */}
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start lg:justify-start justify-center pt-8">
                <Button 
                  asChild 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-colors shadow-sm"
                >
                  <a href="#contact">Get In Touch</a>
                </Button>
                
                <div className="flex gap-3">
                  <a 
                    target="_blank" 
                    href="https://github.com/shahjalal-bu" 
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300"
                  >
                    <AiFillGithub size={24} />
                  </a>
                  <a 
                    target="_blank" 
                    href="https://www.linkedin.com/in/shahjalal-bu/" 
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300"
                  >
                    <AiFillLinkedin size={24} />
                  </a>
                  <a 
                    target="_blank" 
                    href="https://fb.com/shahjalal.bu" 
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300"
                  >
                    <AiFillFacebook size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Animation */}
            <div className="flex items-center justify-center" data-animate>
              <div className="relative w-full max-w-md">
                <Player
                  autoplay
                  loop
                  src="https://assets4.lottiefiles.com/packages/lf20_jtbfg2nb.json"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections - With Container */}
      <div className="container mx-auto px-4">
        <div id="about" data-animate>
          <About />
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="projects" data-animate>
          <Project />
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div data-animate>
          <LoveToDo />
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="blog" data-animate>
          <Blogs />
        </div>
        
        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        
        <div id="contact" data-animate>
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
