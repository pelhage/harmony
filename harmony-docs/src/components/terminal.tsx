"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Terminal() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="border-0 shadow-lg overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl">
      <div className="bg-[#0f0f0f] text-white p-2 flex items-center">
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        </div>
        <div className="ml-auto text-xs text-gray-400 hidden sm:block">
          Harmony CLI
        </div>
      </div>
      <div className="h-72 md:h-[22rem] lg:h-[24rem] w-full bg-[#0f0f0f] flex items-center justify-center relative">
        {isClient ? (
          <div className="relative w-full h-full">
            <Image
              src="/harmony/harmony-demo.gif"
              alt="Harmony Terminal Demo"
              fill
              style={{ objectFit: "contain" }}
              priority
              className="transition-opacity duration-300"
              onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            />
          </div>
        ) : (
          <div className="text-gray-400 text-sm flex flex-col items-center justify-center h-full">
            <div className="animate-spin h-6 w-6 border-2 border-indigo-500 rounded-full border-t-transparent mb-2"></div>
            <span>Loading terminal...</span>
          </div>
        )}
      </div>
    </div>
  );
}
