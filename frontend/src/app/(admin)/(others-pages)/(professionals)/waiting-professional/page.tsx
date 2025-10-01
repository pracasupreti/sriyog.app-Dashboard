import React from "react";
import { BadgeCheck, Edit2 } from "lucide-react";
import Link from "next/link";

const userData = {
  firstName: "Prajwol",
  middleName: "Bahadur",
  lastName: "Shrestha",
  phone: "9867543564",
  profession: "Event Helper",
  gender: "male",
  province: "Bagamati",
  district: "Kathmandu",
  city: "Dakshinkali Municipality",
  ward: "5",
  area: "Patan",
  referredBy: "9867542365",
  dateOfBirth: "2017-Mangsir-12",
  bloodGroup: "AB-",
  maritalStatus: "married",
  idType: "nationalId",
  headshot: "https://res.cloudinary.com/dlnmzpfqh/image/upload/v1758286662/user_headshots/tlqrfwvjphplu6aohfpu.jpg",
  idUpload: "https://res.cloudinary.com/dlnmzpfqh/image/upload/v1758286663/user_ids/fp32q9e6txagn4trmemy.jpg",
};

const ProfessionalPage = () => {
  return (
    <div className="flex w-full flex-col items-center py-4 px-2 min-h-screen bg-gray-50">
      {/* <h1 className="text-2xl md:text-4xl font-semibold text-center mb-4 text-primary">Profile Page</h1> */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full  p-4 md:p-8">
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
            <div className="flex items-center justify-center px-5 rounded-md  py-2 bg-red-800 text-white dark:text-black ">Active</div>
        </div>

        {/* Uploaded Images */}
        <div className="rounded-lg border border-gray-200 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Uploaded Images</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full flex flex-col items-center justify-center md:flex-row md:items-center md:justify-around gap-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 mb-1">Headshot</span>
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden  flex items-center justify-center bg-white">
                  <img
                    src={userData.headshot}
                    alt="User Headshot"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500 mb-1">ID</span>
                <div className="w-32 h-24 md:w-60 md:h-32 rounded-lg overflow-hidden  flex items-center justify-center bg-white">
                  <img
                    src={userData.idUpload}
                    alt="User ID"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-md">
            <div>
              <span className="font-semibold text-black">First Name</span>
              <div className="text-gray-500">{userData.firstName}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Middle Name</span>
              <div className="text-gray-500">{userData.middleName}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Last Name</span>
              <div className="text-gray-500">{userData.lastName}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Phone Number</span>
              <div className="text-gray-500">{userData.phone}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Referred By</span>
              <div className="text-gray-500">{userData.referredBy}</div>
            </div>
            <div>
              <span className="font-semibold text-black">ID Type</span>
              <div className="text-gray-500">{userData.idType}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Date of Birth</span>
              <div className="text-gray-500">{userData.dateOfBirth}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Marital Status</span>
              <div className="text-gray-500">{userData.maritalStatus}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Gender</span>
              <div className="text-gray-500">{userData.gender}</div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Work Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-md">
            <div>
              <span className="font-semibold text-black">Profession</span>
              <div className="text-gray-500">{userData.profession}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Working Area</span>
              <div className="text-gray-500">{userData.area}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Blood Group</span>
              <div className="text-gray-500">{userData.bloodGroup}</div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-5 mb-6">
          <h2 className="font-semibold mb-3 text-gray-700">Location Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-md">
            <div>
              <span className="font-semibold text-black">Province</span>
              <div className="text-gray-500">{userData.province}</div>
            </div>
            <div>
              <span className="font-semibold text-black">District</span>
              <div className="text-gray-500">{userData.district}</div>
            </div>
            <div>
              <span className="font-semibold text-black">City</span>
              <div className="text-gray-500">{userData.city}</div>
            </div>
            <div>
              <span className="font-semibold text-black">Ward No</span>
              <div className="text-gray-500">{userData.ward}</div>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center">
          <Link href="/edit">
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