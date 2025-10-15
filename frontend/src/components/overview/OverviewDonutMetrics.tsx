"use client";
import React, { useEffect, useMemo, useState } from "react";

export type DonutMetric = {
  titleTop: string;
  titleBottom?: string; // optional smaller subtitle on next line
  value: number | string;
  percent: number; // 0-100 for the donut
  color?: string; // main stroke color
};

interface OverviewDonutMetricsProps {
  items?: DonutMetric[];
  className?: string;
}

const defaultItems: DonutMetric[] = [
  { titleTop: "Active", titleBottom: "Professionals", value: 750, percent: 72, color: "#D98787" },
  { titleTop: "Active", titleBottom: "Tasks", value: 2202, percent: 82, color: "#9B2C2C" },
  { titleTop: "Completed", titleBottom: "Tasks", value: 1292, percent: 68, color: "#FF7D7D" },
  { titleTop: "Active", titleBottom: "Professions", value: 133, percent: 76, color: "#D98787" },
];
function hexToRgba(hex: string, alpha = 0.12) {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type MiniDonutProps = {
  percent: number;
  color?: string;
  size?: number; // px
  thickness?: number; // stroke width in px
  startAngle?: number; // in degrees (e.g., -45 for top-right start)
};

const MiniDonut: React.FC<MiniDonutProps> = ({
  percent,
  color = "#D98787",
  size = 52,
  thickness = 8,
  startAngle = -45,
}) => {
  const p = Math.max(0, Math.min(100, percent));
  const radius = useMemo(() => (size - thickness) / 2, [size, thickness]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const [animatedP, setAnimatedP] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedP(p), 50);
    return () => clearTimeout(t);
  }, [p]);

  const offset = useMemo(() => circumference * (1 - animatedP / 100), [circumference, animatedP]);
  const center = size / 2;
  const track = hexToRgba(color, 0.18);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <g transform={`rotate(${startAngle} ${center} ${center})`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={track}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 900ms ease-in-out",
          }}
        />
      </g>
      {/* inner hole by drawing a white circle to simulate donut center */}
      <circle cx={center} cy={center} r={radius - thickness / 2} fill="#fff" />
    </svg>
  );
};

const OverviewDonutMetrics: React.FC<OverviewDonutMetricsProps> = ({ items = defaultItems, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-4 xl:grid-cols-4 md:gap-6 ${className}`}>
      {items.map((it, idx) => (
        <div key={idx} className="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-5">
              <span className="block">{it.titleTop}</span>
              {it.titleBottom && <span className="block">{it.titleBottom}</span>}
            </p>
            <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">{it.value.toLocaleString?.() ?? it.value}</div>
          </div>
          <div className="ml-4 self-start mt-1">
            <MiniDonut percent={it.percent} color={it.color} size={52} thickness={8} startAngle={-45} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewDonutMetrics;
