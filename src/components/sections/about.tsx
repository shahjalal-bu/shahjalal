"use client"
import { BsDownload, BsPlay } from "react-icons/bs";
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import { SiNodedotjs, SiExpress, SiNestjs, SiGraphql, SiRedis, SiFastapi, SiPostgresql, SiMysql, SiMongodb, SiReact, SiRedux, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiPython, SiGo } from "react-icons/si";
import { MdOutlineWork } from "react-icons/md";
import SectionHead from "@/components/sections/section-head";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";


const About = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  
  const skills = {
    backend: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "TypeORM", icon: SiNodedotjs, color: "#FE0803" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "BullMQ", icon: MdOutlineWork, color: "#CC0000" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    ],
    databases: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    frontend: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    languages: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
    ],
  };

  const allSkills = [
    ...skills.backend,
    ...skills.databases,
    ...skills.frontend,
    ...skills.languages,
  ];


  return (
   <div id="about" className="py-20 relative">
     {/* Subtle gradient background from top left */}
     <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
       <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-blue-500/5 via-violet-500/3 to-transparent" />
     </div>
     
     <div className="relative z-10">
       <SectionHead title="About me" subtitle="Learn who I am!" />

       {/* Main Content */}
       <div className="flex flex-col items-start lg:flex-row p-2 rounded-xl overflow-hidden gap-8">
         {/* Left Column - Image, Work Experience, Education */}
         <div className="w-full lg:w-[380px] space-y-6">
           {/* Image Section - Clean and Professional */}
           <div className="relative mx-auto w-fit">
             <Image
               src="/shahjalal.png"
               className="rounded-2xl aspect-square object-cover ring-1 ring-border shadow-xl"
               width={320}
               height={320}
               alt="Md Shahjalal - Full Stack Developer"
               priority
             />
           </div>

           {/* Work Experience Card */}
           <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background to-blue-500/5 border border-border/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-6 space-y-4">
               <div className="flex items-start gap-4">
                 <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                   <FaBriefcase className="text-blue-500" size={24} />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-lg leading-tight mb-1 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                     Software Engineer
                   </h4>
                   <p className="text-sm font-medium text-foreground/70">Backend Developer</p>
                   <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                     <span className="font-semibold">Connect Auz Pty Ltd</span>
                     <span>•</span>
                     <span>Dec 2023 - Present</span>
                   </div>
                 </div>
               </div>
               
               <div className="space-y-2.5 pl-1">
                 {[
                   "Designed scalable database schemas and optimized performance",
                   "Developed REST & GraphQL APIs with comprehensive documentation",
                   "Implemented comprehensive testing (load, unit, e2e)",
                   "Deployed and managed AWS cloud infrastructure"
                 ].map((item, index) => (
                   <div key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                     <span className="leading-relaxed">{item}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Education Card */}
           <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background to-violet-500/5 border border-border/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <div className="relative p-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors duration-300">
                   <FaGraduationCap className="text-violet-500" size={24} />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-lg leading-tight mb-1 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                     BSc in Geology and Mining
                   </h4>
                   <p className="text-sm font-medium text-muted-foreground mt-2">
                     University of Barishal
                   </p>
                   <p className="text-xs text-muted-foreground/70 mt-1">
                     2018 - 2022
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Right Column - Content Section */}
         <div className="flex-1 space-y-6">
           <div className="space-y-4">
             <h3 className="text-3xl font-bold text-gradient-primary">
               Full Stack Developer
             </h3>
             
             {/* Contact Info */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
               <div className="flex items-center gap-2 text-foreground/80">
                 <FaMapMarkerAlt className="text-blue-500" />
                 <span>South Banasree, Dhaka</span>
               </div>
               <div className="flex items-center gap-2 text-foreground/80">
                 <FaPhone className="text-violet-500" />
                 <span>(880) 1835 343686</span>
               </div>
               <div className="flex items-center gap-2 text-foreground/80">
                 <FaEnvelope className="text-cyan-500" />
                 <span>mdshahjalal.bu@gmail.com</span>
               </div>
               <div className="flex items-center gap-2 text-foreground/80">
                 <FaLinkedin className="text-blue-600" />
                 <a href="https://linkedin.com/in/shahjalal-bu" target="_blank" className="hover:text-blue-500 transition-colors">linkedin.com/in/shahjalal-bu</a>
               </div>
             </div>

             <p className="text-lg leading-relaxed text-foreground/90">
               I'm a dedicated <strong className="text-gradient-secondary">Backend Developer</strong> specializing in building scalable, high-performance web applications. Currently working at <strong className="text-gradient-primary">Connect Auz Pty Ltd</strong>, I have extensive experience in designing system architectures, developing RESTful and GraphQL APIs, and deploying applications to AWS cloud infrastructure.
             </p>
           </div>

           {/* Skills Section - With Icons */}
           <div className="space-y-4 mt-6">
             <strong className="text-xl font-bold text-gradient-secondary inline-block">
               Technical Expertise
             </strong>
             <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {allSkills.map((skill, index) => {
                 const Icon = skill.icon;
                 return (
                   <div 
                     key={skill.name} 
                     className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 cursor-pointer group"
                     style={{ animationDelay: `${index * 50}ms` }}
                     title={skill.name}
                   >
                     <Icon 
                       className="w-10 h-10 transition-all duration-300" 
                       style={{ color: skill.color }}
                     />
                     <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                       {skill.name}
                     </span>
                   </div>
                 );
               })}
             </div>
           </div>

           {/* Action Buttons */}
           <div className="flex flex-wrap gap-4 pt-4">
             <Button 
               onClick={() => setOpen(true)}
               className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105"
             >
               <BsPlay size={20} /> Video Resume
             </Button>
             <Button 
               asChild 
               className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white dark:bg-gradient-to-r dark:from-white dark:to-slate-100 dark:text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
             >
               <a 
                 target="_blank"
                 href="https://drive.google.com/uc?export=download&id=1zAwVVJaEiEsW5YBEIsiYEV8uPe3BgJi1"
               >
                 <BsDownload size={18} /> Download Resume
               </a>
             </Button>
           </div>
         </div>
       </div>
     </div>
   </div>
  );
};

export default About;

