import React from 'react'
import SectionHead from '@/components/sections/section-head'
import { Card, CardContent } from "@/components/ui/card";
import {ImBlog} from 'react-icons/im';
import { SiYourtraveldottv } from 'react-icons/si';
import { FaHiking } from 'react-icons/fa';
import { BsFillTreeFill } from 'react-icons/bs';

export default function LoveToDo() {
  const hobbies = [
    {
      name: "Blogging",
      icon: ImBlog,
      gradient: "from-blue-500 to-cyan-500",
      description: "Sharing knowledge and experiences"
    },
    {
      name: "Traveling",
      icon: SiYourtraveldottv,
      gradient: "from-violet-500 to-purple-500",
      description: "Exploring new places and cultures"
    },
    {
      name: "Mountain Hiking",
      icon: FaHiking,
      gradient: "from-orange-500 to-red-500",
      description: "Adventure in the great outdoors"
    },
    {
      name: "Gardening",
      icon: BsFillTreeFill,
      gradient: "from-green-500 to-emerald-500",
      description: "Growing plants and connecting with nature"
    },
  ]
  
  return (
    <section className="py-20">
      <SectionHead title='Love to do!' subtitle='Hobbies and Interests' />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {hobbies.map((hobbie, index) => {
          const Icon = hobbie.icon;
          return (
            <Card 
              key={hobbie.name} 
              className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="text-center p-6 relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${hobbie.gradient} mb-4`}>
                  <Icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gradient-primary mb-2">
                  {hobbie.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {hobbie.description}
                </p>
              </CardContent>
              {/* Hover Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${hobbie.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </Card>
          );
        })}
      </div>
    </section>
  )
}
