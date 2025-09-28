'use client'
import React from 'react'

const WaitingProfessionals = () => {
  return (
    <div className="w-full ">
      {/* Render the TanStack Table */}
      <WaitingProfessionalsTable />
    </div>
  )
}

import WaitingProfessionalsTable from "@/components/tables/WaitingProfessionalsTable";
export default WaitingProfessionals