import { MdOpenInBrowser } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import SectionHead from "./SectionHead";
import Image from "next/image";

const Project = ({
  innerRef
}:{
  innerRef: (component)=>void
}) => {
  const projects = [
    {
      name: "Mind Ful Move",
      description:
        "A yoga and meditation learner school.Role based Full Stack website. Instructor can create and delete their class. Admin change status of class and student can add to cart and payment via stripe. Technologies use React, React Query, React hook form, Stripe. Nodejs and Mongodb",
      link: "https://mindfulmove.netlify.app",
      githubClinet: "https://github.com/shahjalal-bu/mind-ful-move-client",
      githubServer: "https://github.com/shahjalal-bu/mind-ful-move-server",
      image: "/project5.png",
    },
    {
      name: "Edu Toys Hub",
      description:
        "Implementation of admin dashboard for multi vendor. Implementation of product create, delete , update system . Technologies uses React, JavaScript, Tailwind Css, Daisy UI,Firebase, React Form Hook, Express, Mongodb",
      link: "https://edu-toys-fun.web.app/",
      githubClinet: "https://github.com/shahjalal-bu/edu-toy-hub-client",
      githubServer: "https://github.com/shahjalal-bu/edu-toy-hub-server",
      image: "/project1.png",
    },
    {
      name: "Task Navigator",
      description:
        "Full task manager app. Implementation firebase authentication. Implementation of team and project create, delete , update and user to team system .Technologies use React, Redux, react-dnd, JavaScript, Tailwind CSS, Firebase, React Form Hook, Express, Mongodb, Mongoose",
      githubClinet: "https://github.com/shahjalal-bu/project-manager",
      githubServer: "https://github.com/shahjalal-bu/project-manager-backend",
      link: "https://project-manager-shahjalal.netlify.app/",
      image: "/project4.png",
    },
    {
      name: "Creation Vision",
      description:
        "Full task invoice generator app. Implementation firebase authentication. Implementation of invoice create, delete , update .Technologies use React, JavaScript, Bootstrap,Firebase, React Form Hook, Express, Mongodb",
      link: "https://cvbd.netlify.app/",
      // githubClinet: "https://github.com/shahjalal-bu/mind-ful-move-client",
      // githubServer: "https://github.com/shahjalal-bu/mind-ful-move-client",
      image: "/project2.png",
    },
    {
      name: "Task Master",
      description:
        "Full task todo app. Implementation firebase authentication. Implementation of todo create, delete , update .Technologies use React, JavaScript, Tailwind CSS,Firebase, Express, Mongodb",
      githubClinet:
        "https://github.com/shahjalal-bu/task-management-app-client",
      githubServer:
        "https://github.com/shahjalal-bu/task-management-application-server",
      link: "https://incredible-fudge-66fc78.netlify.app/",
      image: "/project6.png",
    },
    {
      name: "School Quiz",
      description:
        "A quiz taker app. Implementation firebase authentication. Implementation of invoice create, delete , update. Technologies use React, JavaScript,CSS3,Firebase, Express, Mongodb",
      githubClinet:
        "https://github.com/shahjalal-bu/quiz-app-react-and-firebase",
      // githubServer: "https://github.com/shahjalal-bu/mind-ful-move-client",
      link: "https://react-firebase-quiz-app.netlify.app",
      image: "/project3.png",
    },
  ];

  return (
    <div className="mt-[-80px] pt-[80px]" id="projects" ref={innerRef}>
      <SectionHead title="Portfolio" subtitle="Check out some of my works!" />
      <div className="grid sm:grid-cols-3  rounded-xl gap-2 mb-10">
        {projects.map((el) => (
          <div key={el.link} className="bg-linear-2 border-2 border-[#14315c] rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
            <figure className="mb-2">
              <Image src={el?.image} width={700} height={700} className="rounded transition-all hover:grayscale " alt={el.name} />
            </figure>
            <div className="rounded-lg p-4 bg-linear-2 flex flex-col">
              <div>
                <h5 className="text-white text-2xl font-bold leading-none mb-2">
                  {el?.name}
                </h5>
                <span className="text-slate-200 leading-none">
                  {el?.description}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  {el?.githubClinet && (
                    <a href={el?.githubClinet} target="_blank">
                      <button className="rounded px-1 py-0.5 bg-[#14315c] text-blue-100 hover:bg-[#14315ccb] duration-300 flex gap-x-2 items-center">
                        <BsGithub size={15} /> Client
                      </button>
                    </a>
                  )}
                  {el?.githubServer && (
                    <a href={el?.githubServer} target="_blank">
                      <button className="rounded px-1 py-0.5 bg-[#14315c] text-blue-100 hover:bg-[#14315ccb] duration-300 flex gap-x-2 items-center">
                        <BsGithub size={15} /> Server
                      </button>
                    </a>
                  )}
                  <a href={el?.link} target="_blank">
                    <button className="rounded px-1 py-0.5 bg-[#14315c] text-blue-100 hover:bg-[#14315ccb] duration-300 flex gap-x-2 items-center">
                      <MdOpenInBrowser size={15} /> Live
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;

