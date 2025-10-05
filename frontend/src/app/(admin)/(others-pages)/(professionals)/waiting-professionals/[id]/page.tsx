"use client";

import React, { useState, useEffect } from "react";
import { BadgeCheck, Edit2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface ProfessionalData {
  _id: string;
  "First Name"?: string;
  "Middle Name"?: string;
  "Last Name"?: string;
  Phone?: string;
  Profession?: string;
  Gender?: string;
  province?: string;
  district?: string;
  City?: string;
  ward?: string;
  Area?: string;
  referredBy?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  idType?: string;
  Headshot?: string;
  idUpload?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const ProfessionalPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const [userData, setUserData] = useState<ProfessionalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (!id) {
        setError("No professional ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axiosInstance.get(`/professionaluser/joinforms/${id}`);
        console.log(response)
        setUserData(response.data);
      } catch (err: any) {
        console.error("Error fetching professional data:", err);
        if (err.response?.status === 404) {
          setError("Professional not found");
        } else {
          setError("Failed to load professional data. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionalData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-4 px-2 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-3 text-lg text-gray-600 dark:text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading professional details...
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-4 px-2 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-red-200 dark:border-red-800 w-full max-w-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {error || "Professional Not Found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error === "Professional not found" 
              ? "The professional you're looking for doesn't exist or has been removed."
              : "We couldn't load the professional details. Please check your connection and try again."
            }
          </p>
          <Link href="/admin/professionals/waiting-professionals">
            <button className="bg-primary hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition">
              Back to Professionals
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col items-center py-4 px-2 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full p-4 md:p-8">
        {/* Status Row */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-2 w-full">
          <span
            className="inline-flex items-center"
            style={{
              background: "linear-gradient(to bottom, #B86A6A, #801414)",
              borderRadius: "1.5rem",
              padding: "0.25rem 1.25rem 0.25rem 0.75rem",
              fontWeight: 600,
              color: "#fff",
              fontSize: "1rem",
              gap: "0.5rem",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)"
            }}
          >
            <BadgeCheck className="w-5 h-5 mr-2" style={{ color: "#fff" }} />
            Verified
          </span>
          {/* Status Toggle */}
          <div className={`flex items-center justify-center px-5 rounded-md py-2 text-white dark:text-black ${
            userData.status === 'Basic' ? 'bg-green-600' :
            userData.status === 'Professional' ? 'bg-blue-600' :
            userData.status === 'Premium' ? 'bg-purple-600' :
            userData.status === 'Suspended' ? 'bg-red-600' :
            userData.status === 'Offline' ? 'bg-gray-600' :
            'bg-yellow-600'
          }`}>
            {userData.status || 'Pending'}
          </div>
        </div>

        {/* Uploaded Images */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Uploaded Images</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full flex flex-col items-center justify-center md:flex-row md:items-center md:justify-around gap-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Headshot</span>
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  {userData.Headshot ? (
                    <img
                      src={userData.Headshot}
                      alt="User Headshot"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">ID</span>
                <div className="w-32 h-24 md:w-60 md:h-32 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  {userData.idUpload ? (
                    <img
                      src={userData.idUpload}
                      alt="User ID"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-md">
            <div>
              <span className="font-semibold text-black dark:text-white">First Name</span>
              <div className="text-gray-500 dark:text-gray-400">{userData["First Name"] || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Middle Name</span>
              <div className="text-gray-500 dark:text-gray-400">{userData["Middle Name"] || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Last Name</span>
              <div className="text-gray-500 dark:text-gray-400">{userData["Last Name"] || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Phone Number</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.Phone || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Referred By</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.referredBy || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">ID Type</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.idType || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Date of Birth</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.dateOfBirth || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Marital Status</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.maritalStatus || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Gender</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.Gender || 'Not provided'}</div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Work Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-md">
            <div>
              <span className="font-semibold text-black dark:text-white">Profession</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.Profession || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Working Area</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.Area || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Blood Group</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.bloodGroup || 'Not provided'}</div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Location Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-md">
            <div>
              <span className="font-semibold text-black dark:text-white">Province</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.province || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">District</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.district || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">City</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.City || 'Not provided'}</div>
            </div>
            <div>
              <span className="font-semibold text-black dark:text-white">Ward No</span>
              <div className="text-gray-500 dark:text-gray-400">{userData.ward || 'Not provided'}</div>
            </div>
          </div>
        </div>

        {/* Change Status Button */}
        <div className="flex justify-center">
          <Link href={`/admin/professionals/waiting-professionals/${id}/edit-status`}>
            <button className="flex items-center gap-2 bg-primary cursor-pointer hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition">
              <Edit2 className="w-4 h-4" />
              Change status
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPage;