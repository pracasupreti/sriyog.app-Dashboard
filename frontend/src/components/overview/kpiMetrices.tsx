"use client";
import React from "react";
import Image from "next/image";

// Simple type so later you can feed dynamic data
export type DashboardMetric = {
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down"; // choose arrow color later if needed
    percent: string; // already formatted (e.g. 11.01%)
    color?: "success" | "error"; // map to badge styling if you add one
  };
  // image src placeholder so you can wire real icons/images later
  imageAlt?: string;
  imageSrc?: string; // optional path
};

interface DashboardSummaryMetricsProps {
  metrics?: DashboardMetric[];
  className?: string;
}

// Default metrics (static) based on screenshot provided
const defaultMetrics: DashboardMetric[] = [
  { label: "Professionals", value: "1,053", imageAlt: "Professionals", imageSrc: "/images/icons/kpis/professionalUsers.svg" },
  { label: "Tasks", value: "3,890", imageAlt: "Tasks", imageSrc: "/images/icons/kpis/tasks.svg" },
  { label: "Professions", value: "150", imageAlt: "Professions", imageSrc: "/images/icons/kpis/profession.svg" },
  { label: "Roadblock Ads", value: "131", imageAlt: "Roadblock Ads", imageSrc: "/images/icons/kpis/roadblockads.svg" },
];

export const KpiMetrices: React.FC<DashboardSummaryMetricsProps> = ({
  metrics = defaultMetrics,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-4  md:gap-6 ${className}`}
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
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {m.value}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {m.label}
              </span>
        </div>
      ))}
    </div>
  );
};

export default KpiMetrices;
