import React from "react";

// Updated mock data with medical professional information
const profileData = {
  personalInfo: {
    fullName: "Dr. Mohamed El Amine",
    specialization: "Cardiologist",
    experience: "12 years",
    education: "MD in Cardiology, University of Algiers",
    affiliation: "Algiers Central Hospital",
    phoneNumber: "+213 562 645 998",
    email: "m.amine@centralhospital.dz",
    consultationFee: "3000 DZD",
    languages: "Arabic, French, English",
    photo: "/assets/images/dr-lee.png",
  }
};

export default function DoctorProfile() {
  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-8">
        <img
          src={profileData.personalInfo.photo}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-[#0089FF]"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profileData.personalInfo.fullName}
          </h1>
          <p className="text-lg text-[#0089FF] font-semibold">
            {profileData.personalInfo.specialization}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {profileData.personalInfo.affiliation}
          </p>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Details */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
            Professional Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Experience</span>
              <span className="text-gray-900 font-medium">
                {profileData.personalInfo.experience}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Education</span>
              <span className="text-gray-900 text-right">
                {profileData.personalInfo.education}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Consultation Fee</span>
              <span className="text-gray-900 font-medium text-[#0089FF]">
                {profileData.personalInfo.consultationFee}
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Languages */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Phone</span>
              <span className="text-gray-900">
                {profileData.personalInfo.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900 break-all">
                {profileData.personalInfo.email}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Languages</span>
              <span className="text-gray-900">
                {profileData.personalInfo.languages}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}