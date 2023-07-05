import React from 'react'
import SectionHead from './SectionHead'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import {ImBlog} from 'react-icons/im';
import { SiYourtraveldottv } from 'react-icons/si';
import { FaHiking } from 'react-icons/fa';
import { BsFillTreeFill } from 'react-icons/bs';

export default function LoveToDo() {
  const hobbies = [
    {
      name: "Blogging",
      icon: <ImBlog size={30} className="text-blue-500 w-12 h-12 mb-4 mx-auto"/>
    },
    {
      name: "Traveling",
      icon: <SiYourtraveldottv size={30}  className="text-blue-500 w-12 h-12 mb-4 mx-auto"/>
    },
    {
      name: "Mountain Hiking",
      icon: <FaHiking size={30}  className="text-blue-500 w-12 h-12 mb-4 mx-auto"/>
    },
    {
      name: "Gardening",
      icon: <BsFillTreeFill size={30}  className="text-blue-500 w-12 h-12 mb-4 mx-auto"/>
    },
    
  ]
  return (
    <section>
        <SectionHead title='Love to do!' subtitle='Hobbies and Interests' />
        <div className="flex justify-between flex-wrap mb-10">
        {
          hobbies.map((hobbie) => <Card key={hobbie.name} className="mt-6 w-full  sm:w-64 !bg-inherit border-2 border-[#14315c] ">
          <CardBody className='text-center'>
            {hobbie.icon}
            <Typography variant="h3"  className="mb-2 text-black dark:text-white">
              {hobbie.name}
            </Typography>  
          </CardBody>
        </Card>)
        }
        </div>
    </section>
  )
}
