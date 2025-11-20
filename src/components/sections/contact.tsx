"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AiOutlineSend } from 'react-icons/ai';
import SectionHead from '@/components/sections/section-head';
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Dynamically import Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    emailjs.send("service_v0z6u7l","template_gsnjgd5",{
      user_name: name,
      user_email: email,
      message: message,
      }, "w3IVSpNNtEgU9ktO2").then((result) => {
        alert("Email sent successfully");
        setName("");
        setEmail("");
        setMessage(""); 
    }, (error) => {
        console.log(error.text);
    })

  };

  return (
    <div id='contact' className="mt-[-100px] pt-[100px]">
      <SectionHead title="Contact me" subtitle="Ask me anythings!" />
      <div className="flex flex-col sm:flex-row p-2 rounded-xl overflow-hidden">
      
        <div className="sm:w-1/2 flex justify-center items-center">
        <Player
            autoplay
            loop
              src="./contact.json"
              className="w-96 h-96"
            />
        </div>
        <div className="sm:w-1/2 p-8 text-slate-700 dark:text-slate-300">
        
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
      
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent"
                  required
                />
      
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
      
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent"
                  required
                />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-transparent"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
            >
              <AiOutlineSend className="mr-2" />
              Send
            </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;