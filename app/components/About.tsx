import { BsDownload } from "react-icons/bs";
import SectionHead from "./SectionHead";


const About = () => {
  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React Js",
    "Next Js",
    "Redux",
    "Node.js",
    "Express js",
  ];
  return (
   <div id="about">  
     <SectionHead title="About me" subtitle="Learn me who i am!" />
     <div className="flex flex-col items-center sm:flex-row p-2  rounded-xl overflow-hidden">
      <div className="max-w-full sm:max-w-xs sm:p-5 ">
        <img
          className="rounded aspect-square"
          src="/shahjalal2.jpg"
          alt="Your Image"
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
            <div className="flex items-center gap-2 font-semibold">
              <div className="bg-amber-400 w-1 aspect-square rounded-full "></div>
              {el}
            </div>
          ))}
        </div>
        <div className="flex mt-6">
          <a
            href="https://drive.google.com/file/d/1zAwVVJaEiEsW5YBEIsiYEV8uPe3BgJi1/view?usp=drive_link"
            className="flex items-center gap-2 bg-black  text-white px-4 py-2 rounded mr-4"
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