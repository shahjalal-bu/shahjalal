import { Spinner } from "@material-tailwind/react";

const Preloader = () => {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex justify-center">
        <Spinner className="h-16 w-16 text-blue-500/10" />
        </div>
      </div>
    );
  };
  
  export default Preloader;
  