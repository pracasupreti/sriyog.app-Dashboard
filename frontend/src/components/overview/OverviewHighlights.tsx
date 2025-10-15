"use client";
import React from "react";
import Image from "next/image";

// Types and props for dynamic data later
export type Professional = { name: string; role: string; avatar: string };
export type CityStat = { name: string; percent: number; color?: string };

interface OverviewHighlightsProps {
  professionals?: Professional[];
  cities?: CityStat[];
  className?: string;
}

// Demo data; replace from API later
const defaultPros: Professional[] = [
  { name: "Baidhanath", role: "AC Repair", avatar: "/images/user/user-01.jpg" },
  { name: "Rajan", role: "Laptop Repair", avatar: "/images/user/user-02.jpg" },
  { name: "Arjun", role: "Painter", avatar: "/images/user/user-03.jpg" },
  { name: "Ajay Kumar", role: "Photographer", avatar: "/images/user/user-04.jpg" },
];

const redPalette = ["#7A0D0D", "#E6A6A6", "#D16060", "#C0B3B3", "#E57373"]; // red palette
const defaultCities: CityStat[] = [
  { name: "Kathmandu", percent: 40, color: redPalette[0] },
  { name: "Bhaktapur", percent: 20, color: redPalette[1] },
  { name: "Biratnagar", percent: 15, color: redPalette[2] },
  { name: "Butwal", percent: 10, color: redPalette[3] },
  { name: "Pokhara", percent: 15, color: redPalette[4] },
];

function RadialRings({ cities = defaultCities }: { cities?: CityStat[] }) {
  // Draw concentric rings with partial strokes to indicate cumulative 100%
  const size = 160;
  const center = size / 2;
  const ringGap = 10;
  const maxRadius = center - 6;
  // animate sweep on mount
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setProgress(1), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>

      {[...cities].map((c, i) => {
        const radius = maxRadius - i * ringGap;
        const circumference = 2 * Math.PI * radius;
        const strokeWidth = 6;
        const pct = (c.percent / 100) * progress;
        const dashoffset = circumference * (1 - pct);
        return (
          <g key={c.name} filter="url(#softShadow)">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#eee"
              strokeOpacity={0.3}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={c.color || redPalette[i % redPalette.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
              style={{ transition: `stroke-dashoffset 900ms ease-in-out`, transitionDelay: `${i * 120}ms` }}
            />
          </g>
        );
      })}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9CA3AF" fontSize="16">
        100%
      </text>
    </svg>
  );
}

const OverviewHighlights: React.FC<OverviewHighlightsProps> = ({
  professionals = defaultPros,
  cities = defaultCities,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 ${className}`}>
      {/* Top Professionals (1/3 width on md+) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 md:col-span-1">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary dark:text-white/90">Top Professionals</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="More">
            ⋮
          </button>
        </div>
        <ul>
          {professionals.map((p) => (
            <li key={p.name} className="flex items-center gap-3 py-3">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <Image src={p.avatar} alt={p.name} width={40} height={40} className="h-10 w-10 object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{p.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Cities (2/3 width on md+) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary dark:text-white/90">Top Cities</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="More">
            ⋮
          </button>
        </div>

        <div className="grid grid-cols-12 items-center gap-4 md:gap-6 min-h-[160px]">
          {/* City list */}
          <div className="col-span-12 sm:col-span-4 space-y-3">
            {cities.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color || redPalette[i % redPalette.length] }} />
                  <span className="text-sm text-gray-800 dark:text-white/90">{c.name}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{c.percent}%</span>
              </div>
            ))}
          </div>

          {/* Vertical dashed divider */}
          {/* <div className="relative col-span-1 hidden sm:flex justify-center h-full">
            <span className="h-full border-l-2 border-dashed border-gray-200 dark:border-gray-800" />
          </div> */}

          {/* Radial chart */}
          <div className="col-span-12 sm:col-span-8 flex justify-center items-center">
            <RadialRings cities={cities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHighlights;
