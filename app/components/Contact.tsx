"use client"
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { Player } from "@lottiefiles/react-lottie-player";
import SectionHead from './SectionHead';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };



  return (
    <div id='contact' className="mt-[-100px] pt-[100px]">
      <SectionHead title="Contact me" subtitle="Ask me anythings!" />
      <div className="flex flex-col sm:flex-row p-2  rounded-xl overflow-hidden">
      
        <div className="sm:w-1/2 flex justify-center items-center">
        <Player
            autoplay
            loop
              src="./contact.json"
              className="w-96 h-96"
            />
        </div>
        <div className="sm:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
      
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
      
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
      
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 bg-transparent border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <AiOutlineSend className="mr-2" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;