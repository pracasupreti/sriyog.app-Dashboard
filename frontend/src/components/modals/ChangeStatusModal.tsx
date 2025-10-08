'use client'
import { ProfessionalData } from '@/app/(admin)/(others-pages)/(professionals)/waiting-professionals/[id]/page';
import axiosInstance from '@/lib/axios';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';

   interface StatusProps{
        // menuOpen:boolean;
        setShowStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
        userData:ProfessionalData;
        setUserData: React.Dispatch<React.SetStateAction<ProfessionalData | null>>;
    }
     export const getStatusColor = (status: string) => {
    switch (status) {
      case 'Basic': return 'bg-green-600';
      case 'Professional': return 'bg-blue-600';
      case 'Premium': return 'bg-purple-600';
      case 'Suspended': return 'bg-red-600';
      case 'Offline': return 'bg-gray-600';
      default: return 'bg-yellow-600';
    }
  };
const ChangeStatusModal = ({ setShowStatusModal, userData, setUserData }: Omit<StatusProps, 'menuOpen'>) => {
      const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
      const [selectedStatus, setSelectedStatus] = useState(userData?.status || 'Basic');


  const statusOptions = ['Basic', 'Professional', 'Premium', 'Suspended', 'Offline'];

  const handleStatusUpdate = async (newStatus: string) => {
    if (!userData) return;

    try {
      setIsUpdatingStatus(true);
      await axiosInstance.patch(`/professionaluser/joinforms/${userData._id}/status`, {
        status: newStatus
      });
      
      // Update local state
      setUserData(prev => prev ? { ...prev, status: newStatus } : null);
      setShowStatusModal(false);
      
      // You can add a toast notification here
      console.log('Status updated successfully');
    } catch (err: unknown) {
      console.error('Error updating status:', err);
      // You can add error toast notification here
    } finally {
      setIsUpdatingStatus(false);
    }
  };


    const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);
  

  useEffect(() => {
    portalRef.current = document.getElementById('changeStatusModal');
    setMounted(true);
  }, []);

  if (!mounted || !portalRef.current) return null;

  return createPortal (
     <div className="fixed inset-0 bg-gray-200/20 backdrop-blur-[8px] flex items-center justify-center z-[99999999] p-4" onClick={()=>setShowStatusModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Change Professional Status
                </h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Current Status */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Status:</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(userData?.status || 'Basic')}`}>
                  {userData?.status || 'Basic'}
                </div>
              </div>

              {/* Status Options */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select New Status:</p>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      disabled={isUpdatingStatus || status === userData?.status}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        status === selectedStatus
                          ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                      } ${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{status}</span>
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
                    </button>
                  ))}
                </div>
              </div>

             

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleStatusUpdate(selectedStatus)}
                  className="px-4 py-2 text-white bg-primary rounded-md "
                >
                  {isUpdatingStatus ? 'Changing Status...' : 'Change Status'}
                </button>
                <button
                  onClick={() => setShowStatusModal(false)}
                  disabled={isUpdatingStatus}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
    , portalRef.current
  )
}

export default ChangeStatusModal