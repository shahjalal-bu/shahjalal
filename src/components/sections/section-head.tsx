import React from "react";

const SectionHead = ({ title, subtitle, className }:{title: string, subtitle?:string, className?: string} )=> {
  return (
    <div className={`flex flex-col items-center ` + className}>
     
      <div className="font-luckiestGuy antialiased text-2xl sm:text-5xl">
        {title}
      </div>
      {subtitle && (
        <div className="font-grandHotel antialiased text-amber-500 text-xl sm:text-3xl my-5">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionHead;