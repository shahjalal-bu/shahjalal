"use client"
import { BsDownload, BsEye, BsPlay } from "react-icons/bs";
import SectionHead from "@/components/sections/section-head";
import Image from "next/image";
// import ModalVideo from 'react-modal-video';
// import 'node_modules/react-modal-video/scss/modal-video.scss';
import { useState } from "react";
import { Button } from "@/components/ui/button";


const About = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  
  const skills = [
    "JavaScript",
    "TypeScript",
    "React Js",
    "Next Js",
    "Redux",
    "Node.js",
    "Express js",
    "React Native"
  ];
  return (
   <div id="about" className="mt-[-100px] pt-[100px] mb-10">  
     <SectionHead title="About me" subtitle="Learn me who i am!" />
     {/* <ModalVideo
				channel="youtube"
				youtube={{ mute: 0, autoplay: 0 }}
				isOpen={isOpen}
				videoId="Yx1C5cndwzM"
				onClose={() => setOpen(false)} 
      
			/> */}
     <div className="flex flex-col items-center sm:flex-row p-2  rounded-xl overflow-hidden">
      <div className="max-w-full sm:max-w-xs sm:p-5 ">
    
        <Image
      src="/shahjalal2.jpg"
      className="rounded aspect-square object-cover"
      width={700}
      height={700}
      alt="Picture of the author"
    />
      </div>
      <div className="p-5 sm:p-10">
        <p className="text-justify text-lg text-slate-700 dark:text-slate-300">
          I am a <strong>web developer</strong> with a strong foundation in{" "}
          <strong>JavaScript</strong>. My passion is to make the web more
          accessible and open to the world through my code. I am study in
          Barishal University, Bangladesh. I am eager to find job opportunities
          that align with my interests and skills.
          <br />
          <strong className="my-2 inline-block">
            Here are a few technologies I’ve been working with recently:
          </strong>
        </p>
        <div className="grid grid-cols-2 gap-x-3 sm:w-1/2 text-slate-700 dark:text-slate-300">
          {skills.map((el) => (
            <div key={el} className="flex items-center gap-2 font-semibold">
              <div className="bg-amber-400 w-1 aspect-square rounded-full "></div>
              {el}
            </div>
          ))}
        </div>
        <div className="flex mt-6 gap-4">
          <Button 
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black"
          >
            <BsPlay /> Video Resume
          </Button>
          <Button asChild className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200">
            <a target="_blank"
              href="https://drive.google.com/uc?export=download&id=1zAwVVJaEiEsW5YBEIsiYEV8uPe3BgJi1"
            >
              <BsDownload /> Get Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
   </div>
  );
};

export default About;
