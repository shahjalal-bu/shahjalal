import { MdOpenInBrowser } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import SectionHead from "@/components/sections/section-head";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Project = () => {
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
    <div className="mt-[-80px] pt-[80px]" id="projects">
      <SectionHead title="Portfolio" subtitle="Check out some of my works!" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {projects.map((el) => (
          <Card key={el.link} className="bg-linear-2 border-2 border-[#14315c] overflow-hidden transform hover:translate-y-2 hover:shadow-xl transition duration-300 flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={el?.image} 
                fill 
                className="object-cover transition-all hover:scale-105" 
                alt={el.name} 
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-white text-xl font-bold leading-none">
                {el?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <CardDescription className="text-slate-300 text-sm line-clamp-4">
                {el?.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto gap-2 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {el?.githubClinet && (
                  <Button asChild variant="outline" size="sm" className="h-7 px-2 bg-[#14315c] text-blue-100 border-none hover:bg-[#14315ccb] hover:text-white">
                    <a href={el?.githubClinet} target="_blank">
                      <BsGithub className="mr-1 h-3 w-3" /> Client
                    </a>
                  </Button>
                )}
                {el?.githubServer && (
                  <Button asChild variant="outline" size="sm" className="h-7 px-2 bg-[#14315c] text-blue-100 border-none hover:bg-[#14315ccb] hover:text-white">
                    <a href={el?.githubServer} target="_blank">
                      <BsGithub className="mr-1 h-3 w-3" /> Server
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="sm" className="h-7 px-2 bg-[#14315c] text-blue-100 border-none hover:bg-[#14315ccb] hover:text-white">
                  <a href={el?.link} target="_blank">
                    <MdOpenInBrowser className="mr-1 h-3 w-3" /> Live
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;

