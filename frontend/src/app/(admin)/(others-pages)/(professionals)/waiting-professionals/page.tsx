// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WaitingKpiMetrices from "@/components/professionals/WaitingKpiMetrices";
import WaitingProfessionals from "@/components/professionals/WaitingProfessionals";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "waiting Professionals | sriyog ",
  description:
    "This is Next.js waiting Professionals page for sriyog  ",
};

export default function WaitingProf() {
  return (
    <div className=" w-full min-h-screen mb-6 ">
      {/* <PageBreadcrumb pageTitle="waiting Professionals" /> */}
      <div className="space-y-6">
      <WaitingKpiMetrices />
        <WaitingProfessionals />
      </div>
    </div>
  );
}