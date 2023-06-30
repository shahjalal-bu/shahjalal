"use client"
import { Player } from "@lottiefiles/react-lottie-player";
import { ThemeProvider } from "@material-tailwind/react";
import {AiFillGithub, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";
import About from "./components/About";
import Project from "./components/Projects";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import GoToTop from "./components/GotoTop";



export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(()=> setIsLoading(false),[]);
  return (
    <ThemeProvider>
      {isLoading && <Preloader />}
    {!isLoading && <main>
      <Header/>
      <div className="flex flex-col-reverse sm:flex-row-reverse  gap-2 sm:min-h-[90vh]">
        <div className="rounded-lg flex-1 flex flex-col justify-center p-5 sm:p-10  shadow-sm mb-2">
          <div className="text-cyan-400 text-xl sm:mt-14">Hello! I am</div>
          <h1 className="text-5xl sm:text-8xl font-extrabold">Md Shahjalal</h1>
          <h2 className="text-cyan-400 font-bold text-3xl sm:text-5xl my-1 sm:my-3">
            Full Stack Developer
          </h2>
          <div className="flex items-center gap-2 font-semibold">
            <div className="bg-amber-400 w-2 aspect-square rounded-full "></div>
            <div>Web Developer</div>
            <div className="bg-amber-400 w-2 aspect-square rounded-full"></div>
            <div> Programmer</div>
          </div>
          <div className="hero-footer flex items-center md:gap-5 mt-5 sm:mt-14 gap-1">
            <div className=" px-4 py-1.5 bg-black text-white inline-block rounded-3xl">
              Contact me
            </div>
            <a href="https://github.com/shahjalal-bu">
              <div className=" p-1 rounded-lg flex justify-center items-center">
                <AiFillGithub size={30} />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/shahjalal-bu/">
              <div className=" p-1 rounded-lg flex justify-center items-center">
                <AiFillLinkedin size={30} />
              </div>
            </a>
            <a href="https://fb.com/shahjalal.bu">
              <div className=" p-1 rounded-lg flex justify-center items-center">
                <AiFillFacebook size={30} />
              </div>
            </a>
          </div>
        </div>
        <div className="rounded-lg  flex items-center justify-center p-5 sm:p-10  shadow-sm mb-2">
          <Player
          autoplay
          loop
            src="https://assets4.lottiefiles.com/packages/lf20_jtbfg2nb.json"
            className="w-96 h-72"
          />
        </div>
      </div>
      <About />
      <Project />
      {/* <Blogs /> */}
      <Contact />
      <Footer />
      <GoToTop />
    </main>}
    </ThemeProvider>
  )
}
