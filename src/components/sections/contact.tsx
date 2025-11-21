"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AiOutlineSend } from 'react-icons/ai';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
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

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "mdshahjalal.bu@gmail.com",
      link: "mailto:mdshahjalal.bu@gmail.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "(880) 1835 343686",
      link: "tel:+8801835343686",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "South Banasree, Dhaka",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      link: "https://linkedin.com/in/shahjalal-bu",
      label: "LinkedIn",
      color: "text-blue-600"
    },
    {
      icon: FaGithub,
      link: "https://github.com/shahjalal-bu",
      label: "GitHub",
      color: "text-slate-700 dark:text-slate-300"
    },
  ];

  return (
    <div id='contact' className="py-20">
      <SectionHead title="Contact me" subtitle="Let's build something amazing together!" />
      
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={info.title}
              className="group relative overflow-hidden p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${info.gradient}`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-foreground font-medium hover:text-blue-500 transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{info.value}</p>
                  )}
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </div>
          );
        })}
      </div>

      {/* Contact Form and Animation */}
      <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border">
        {/* Animation */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <Player
            autoplay
            loop
            src="./contact.json"
            className="w-full max-w-md"
          />
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gradient-primary mb-2">Get in Touch</h3>
            <p className="text-muted-foreground">Fill out the form below and I'll get back to you as soon as possible.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-foreground">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border focus:border-blue-500 transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background border-border focus:border-blue-500 transition-colors min-h-[120px]"
                placeholder="Your message..."
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={handleSubmit}
            >
              <AiOutlineSend className="mr-2" size={18} />
              Send Message
            </Button>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Or connect with me on:</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;