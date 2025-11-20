import React from 'react'
import SectionHead from '@/components/sections/section-head'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {
          hobbies.map((hobbie) => (
            <Card key={hobbie.name} className="mt-6 w-full bg-inherit border-2 border-[#14315c] hover:shadow-lg transition-all">
              <CardContent className="text-center p-6">
                {hobbie.icon}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {hobbie.name}
                </h3>  
              </CardContent>
            </Card>
          ))
        }
        </div>
    </section>
  )
}
