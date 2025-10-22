'use client'
import React from 'react'
import WaitingProfessionalsTable from "@/components/tables/WaitingProfessionalsTable";

const WaitingProfessionals = () => {
  return (
    <div className="w-full ">
      {/* Render the TanStack Table */}
      <WaitingProfessionalsTable />
    </div>
  )
}

export default WaitingProfessionals