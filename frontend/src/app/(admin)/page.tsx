// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
// import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
import KpiMetrices from "@/components/overview/kpiMetrices";
import OverviewHighlights from "@/components/overview/OverviewHighlights";
import OverviewProfessionTrends from "@/components/overview/OverviewProfessionTrends";
import OverviewDonutMetrics from "@/components/overview/OverviewDonutMetrics";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | sriyog - Next.js Dashboard Template",
//   description: "This is Next.js Home for sriyog Dashboard Template",
// };

export default function Ecommerce() {
  return (
    <div className="w-full">
      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
      <div className="space-y-6">
         <KpiMetrices />
        <OverviewHighlights />
        <OverviewProfessionTrends />
      <OverviewDonutMetrics />
      </div>
    </div>
  );
}
