import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WaitingProfessionals from "@/components/professionals/WaitingProfessionals";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "waiting Professionals | sriyog ",
  description:
    "This is Next.js waiting Professionals page for sriyog  ",
};

export default function WaitingProf() {
  return (
    <div className="p-4 md:p-6 w-full h-screen">
      <PageBreadcrumb pageTitle="waiting Professionals" />
      <div className="space-y-6">
        <WaitingProfessionals />
      </div>
    </div>
  );
}