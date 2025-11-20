"use client"

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 transition-opacity duration-500">
      <Loader2 className="h-16 w-16 text-amber-400 animate-spin" />
    </div>
  );
};

export default Preloader;