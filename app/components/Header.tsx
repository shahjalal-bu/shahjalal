"use client"

import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { BsMoon, BsSun } from "react-icons/bs";
 
export default function Header({
  active
}:{
  active:String
}) {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
    if (localTheme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

const handleDarkMode = () => {
  if(theme === "dark") {
    setTheme("light");
  }else{
    setTheme("dark");
  }
}

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const visitLinkedin = () => {
    window.location.href = "https://www.linkedin.com/in/shahjalal-bu/"
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  useEffect(()=>{
    const currentURL = window.scroll;
    console.dir(currentURL);

  })
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal"
      >
        <a href="/" className={`flex items-center ${active ==='home'?"text-red-500": 'text-black dark:text-white'}`}>
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
  
        className="p-1 font-normal"
      >
        <a href="#about" className={`flex items-center ${active ==='about'?"text-red-500": 'text-black dark:text-white'}`}>
          About me
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal"
      >
        <a href="#projects" className={`flex items-center ${active ==='projects'?"text-red-500": 'text-black dark:text-white'}`}>
          Projects
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-normal"
      >
        <a href="#contact" className={`flex items-center ${active ==='contact'?"text-red-500": 'text-black dark:text-white'}`}>
          Contact
        </a>
      </Typography>

    </ul>
  );
 
  return (
    <Navbar className="sticky top-0 z-10 mx-auto bg-inherit rounded-none border-none  py-2 px-4 lg:px-8 lg:py-4 w-full shadow-none backdrop-saturate-">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
           <div className="font-bold text-2xl  text-black dark:text-white">
          {"<"} <span className="text-amber-500">Shah</span>
          <span className="text-blue-500">Jalal</span> {"/>"}
        </div>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-2 justify-end">
          <div className="cursor-pointer  text-black dark:text-white" onClick={handleDarkMode}>
            {
              theme ==="dark"?<BsSun />:<BsMoon />
            }
              
            </div>

                   
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
          <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={visitLinkedin}>
            <span>Let&apos;s talk!</span>
          </Button>
        </div>

   
    
      </div>
      <Collapse  open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={visitLinkedin}>
            <span>Let&apos;s talk!</span>
          </Button>
        </div>
      </Collapse >
    </Navbar>
  );
}
