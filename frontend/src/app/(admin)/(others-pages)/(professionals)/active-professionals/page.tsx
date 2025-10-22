
// import WaitingKpiMetrices from "@/components/professionals/WaitingKpiMetrices";
import ActiveProfessionals from "@/components/professionals/ActiveProfessionals";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Active Professionals | sriyog ",
  description:
    "This is Next.js Active Professionals page for sriyog  ",
};

export default function ActiveProf() {
  return (
    <div className=" w-full min-h-screen mb-6 ">
      {/* <PageBreadcrumb pageTitle="waiting Professionals" /> */}
      <div className="space-y-6">
      {/* <WaitingKpiMetrices /> */}
        <ActiveProfessionals />
      </div>
    </div>
  );
}