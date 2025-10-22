'use client'
import React from 'react'
import ActiveProfessionalsTable from '../tables/ActiveProfessionalsTable';

const ActiveProfessionals= () => {
  return (
    <div className="w-full ">
      {/* Render the TanStack Table */}
      <ActiveProfessionalsTable/>
    </div>
  )
}

export default ActiveProfessionals