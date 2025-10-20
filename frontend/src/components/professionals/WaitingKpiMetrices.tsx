"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

export type waitingProfMetrices = {
  label: string;
  value: string | number;
  imageAlt?: string;
  imageSrc?: string;
};


export const WaitingKpiMetrices: React.FC = () => {
  const [metrics,setMetrics]=useState<waitingProfMetrices[]>([]);
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
    axiosInstance.get("professionaluser/waiting-professionals/kpis")
      .then(res => {
        const data = res.data;
        console.log(data,'response Data is here form waitingKpiMetrices')
        setMetrics([
          {
            label: "Total Professionals",
            value: data.totalProfessionals,
            imageAlt: "Professionals",
            imageSrc: "/images/icons/kpis/professionalUsers.svg"
          },
          {
            label: "Waiting Professionals",
            value: data.waitingProfessionals,
            imageAlt: "Waiting Professionals",
            imageSrc: "/images/icons/kpis/waitingprof.svg"
          },
          {
            label: "Number of Professions",
            value: data.numberOfProfessions,
            imageAlt: "Professions",
            imageSrc: "/images/icons/kpis/professionsnumber.svg"
          },
          {
            label: "Submitted Today",
            value: data.submittedToday,
            imageAlt: "Submitted Today",
            imageSrc: "/images/icons/kpis/submittedToday.svg"
          }
        ]);
      })
      .catch(() => {
        setMetrics([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
       <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-4  md:gap-6 }`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index} 
          className="rounded-2xl gap-2 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col w-full items-center justify-center animate-pulse"
        >
          <div className="flex items-center  justify-center w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full">
            <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="mt-4 h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="mt-2 h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
      </div> // You can replace this with a spinner or skeleton UI
    )
  }
   
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-4  md:gap-6 }`}
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl gap-2 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 flex flex-col w-full items-center justify-center"
        >
          <div className="flex items-center  justify-center w-10 h-10 ">
            {/* Placeholder image; replace src with real asset */}
            <Image
              src={m.imageSrc || "/images/icons/placeholder.svg"}
              alt={m.imageAlt || m.label}
              width={48}
              height={48}
              className="object-contain w-full h-full text-gray-800 dark:text-white/90"
            />
          </div>
              <div className="text-md text-gray-500 dark:text-gray-400">
                {m.label}
              </div>
              <h4 className="mt-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
                {m.value}
              </h4>
        </div>
      ))}
    </div>
  );
};

export default WaitingKpiMetrices; 
