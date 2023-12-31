"use client"
import { BsDownload, BsEye, BsPlay } from "react-icons/bs";
import SectionHead from "./SectionHead";
import Image from "next/image";
import ModalVideo from 'react-modal-video';
import 'node_modules/react-modal-video/scss/modal-video.scss';
import { useState } from "react";


const About = ({
  innerRef
}:{
  innerRef: (component)=>void
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const skillsWeb = [
    {
      name:"Javascript",
      level:'Expert'
    },
    {
      name:"HTML",
      level:"Expert"
    }
    ,
    {
      name:"Css 3",
      level:"Expert"
    },
    {
      name:"Tailwind Css",
      level:"Expert"
    }
    ,
    {
      name:"Bootstrap",
      level:"Expert"
    }
    ,
    {
      name:"Sass",
      level:"Expert"
    }
    ,
    {
      name:"ReactJS",
      level:"Expert"
    }
    ,
    {
      name:"ReduxJs",
      level:"Compatable"
    },
    {
      name:"RTk query",
      level:"Compatable"
    },
    {
      name:"Tanstack query",
      level:"Expert"
    },
    {
      name:"React Router Dom",
      level:"Expert"
    },
    {
      name:"React hook form",
      level:"Compatable"
    },
    {
      name:"Node js",
      level:"Compatable"
    },

    {
      name:"React native",
      level:"Familiar"
    }

  ]
  
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
   <div id="about" ref={innerRef} className="mt-[-100px] pt-[100px] mb-10">  
     <SectionHead title="About me" subtitle="Learn me who i am!" />
     <ModalVideo
				channel="youtube"
				youtube={{ mute: 0, autoplay: 0 }}
				isOpen={isOpen}
				videoId="Yx1C5cndwzM"
				onClose={() => setOpen(false)} 
      
			/>
     <div className="flex flex-col items-center sm:flex-row p-2  rounded-xl overflow-hidden">
      <div className="max-w-full sm:max-w-xs sm:p-5 ">
    
        <Image
      src="/shahjalal2.jpg"
      className="rounded aspect-square"
      width={700}
      height={700}
      alt="Picture of the author"
    />
      </div>
      <div className="p-5 sm:p-10">
        <p className="text-justify text-lg">
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
        <div className="grid grid-cols-2 gap-x-3 sm:w-1/2">
          {skills.map((el) => (
            <div key={el} className="flex items-center gap-2 font-semibold">
              <div className="bg-amber-400 w-1 aspect-square rounded-full "></div>
              {el}
            </div>
          ))}
        </div>
        <div className="flex mt-6">
          <div
          onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-amber-800 cursor-pointer text-black px-4 py-2 rounded mr-4 transition-all hover:scale-90"
          >
            <BsPlay /> Video Resume
          </div>
          <a target="_blank"
            href="https://drive.google.com/uc?export=download&id=1zAwVVJaEiEsW5YBEIsiYEV8uPe3BgJi1"
            className="flex items-center gap-2 bg-black  text-white px-4 py-2 rounded mr-4 transition-all hover:scale-90"
          >
            <BsDownload /> Get Resume
          </a>
        </div>
      </div>
    </div>
   </div>
  );
};

export default About;
