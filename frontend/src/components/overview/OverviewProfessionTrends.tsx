"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type MonthlyPoint = { month: string; male: number; female: number };
export type UpcomingProfession = { title: string; category: string; icon?: string };

interface OverviewProfessionTrendsProps {
  data?: MonthlyPoint[];
  upcoming?: UpcomingProfession[];
  className?: string;
}

const defaultData: MonthlyPoint[] = [
  { month: "Jan", male: 55, female: 28 },
  { month: "Feb", male: 35, female: 45 },
  { month: "Mar", male: 22, female: 25 },
  { month: "Apr", male: 40, female: 30 },
  { month: "May", male: 65, female: 35 },
  { month: "Jun", male: 58, female: 25 },
  { month: "Jul", male: 90, female: 38 },
  { month: "Aug", male: 100, female: 27 },
  { month: "Sep", male: 85, female: 30 },
  { month: "Oct", male: 75, female: 22 },
  { month: "Nov", male: 60, female: 18 },
  { month: "Dec", male: 70, female: 22 },
];

const defaultUpcoming: UpcomingProfession[] = [
  { title: "Thekedar", category: "Construction", icon: "/images/user/user-05.jpg" },
  { title: "Consultant", category: "Professionals", icon: "/images/user/user-06.jpg" },
  { title: "Tailoring", category: "Professionals", icon: "/images/user/user-07.jpg" },
  { title: "Veterinary", category: "Medical", icon: "/images/user/user-08.jpg" },
];

const maleColor = "#A42A2A"; // deep red
const femaleColor = "#F97D7D"; // light red

const OverviewProfessionTrends: React.FC<OverviewProfessionTrendsProps> = ({
  data = defaultData,
  upcoming = defaultUpcoming,
  className = "",
}) => {
  const categories = data.map((d) => d.month);
  const male = data.map((d) => d.male);
  const female = data.map((d) => d.female);

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 320,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      animations: { enabled: true },
    },
    colors: [maleColor, femaleColor],
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 4, strokeWidth: 2, strokeColors: "#fff" },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: {
      show: false,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { style: { colors: Array(categories.length).fill("#6B7280") } },
    },
    yaxis: {
      labels: { style: { colors: ["#6B7280"] } },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series,  dataPointIndex }) => {
        const m = categories[dataPointIndex];
        const maleV = series[0][dataPointIndex];
        const femaleV = series[1][dataPointIndex];
        return `<div class="rounded-xl border border-gray-200 bg-white p-3 shadow-md">
          <div class="text-sm font-semibold text-gray-800">${m} 2025</div>
          <div class="mt-2 text-xs text-gray-600"><span style="color:${maleColor}">●</span> Male: ${maleV} Active Professionals</div>
          <div class="text-xs text-gray-600"><span style="color:${femaleColor}">●</span> Female: ${femaleV} Active Professionals</div>
        </div>`;
      },
    },
  };

  const series = [
    { name: "Male", data: male },
    { name: "Female", data: female },
  ];

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 ${className}`}>
      {/* All Professionals chart (2/3) */}
      <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary dark:text-white/90">All Professionals</h3>
          <div className="flex items-center gap-4 text-sm dark:text-white">
            <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full" style={{backgroundColor: maleColor}}/> Male</div>
            <div className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full" style={{backgroundColor: femaleColor}}/> Female</div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="More">⋮</button>
          </div>
        </div>
        <div className="max-w-full">
          <ReactApexChart type="line" height={320} options={options} series={series} />
        </div>
      </div>

      {/* Upcoming Professions list (1/3) */}
      <div className="md:col-span-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary dark:text-white/90">Upcoming Professions</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="More">⋮</button>
        </div>
        <ul>
          {upcoming.map((u) => (
            <li key={u.title} className="flex items-center gap-3 py-3">
              <div className="h-10 w-10 rounded-lg bg-gray-50 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 flex items-center justify-center">
                <Image src={u.icon || "/images/icons/placeholder.svg"} alt={u.title} width={28} height={28} className="object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{u.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewProfessionTrends;
