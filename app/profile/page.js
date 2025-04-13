'use client'
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/lib/supabaseclient";
import { redirect, useRouter } from "next/navigation"; 
// Mock data (replace with API data)
const profileData = {
  personalInfo: {
    fullName: "Mohamed el Amine",
    birthDay: "08/03/2003",
    gender: "Male",
    phoneNumber: "0562645998",
    photo: "./assets/images/dr-lee.png",
  },
  medicalInfo: {
    bloodType: "O+",
    sensitivities: ["Peanuts", "Shellfish"],
    chronicDiseases: ["Diabetes", "Blood Pressure"],
  },
  medicalFile: {
    diseases: [
      {
        name: "Disease 1",
        details: {
          medication: "This section contains detailed medical information.",
          report: "All data is stored securely and presented in an accessible manner.",
        },
      },
      {
        name: "Disease 2",
        details: {
          medication: "Medication details for Disease 2.",
          report: "Report details for Disease 2.",
        },
      },
    ],
  },
};
export default   function Profile() {
   const router = useRouter();
   const [patient, setPatients] = useState([]);
     const [loading, setLoading] = useState(true);
 useEffect(() => {
     async function fetchData() {
       const { data: { user } } = await supabase.auth.getUser();
 
       if (!user) {
         router.push("/Patient"); // Redirect if not logged in
         return;
       }
 
        try {
             // Fetch doctor info
             const { data: userInfo, error: roleError } = await supabase
               .from("patients")
               .select("*")
               .eq("user_id", user.id) // Ensure 'user_id' is correct
               .single();
       
             if (roleError) throw roleError; // Handle error if any
       
             setPatients(userInfo);
           } catch (error) {
             console.error("Error fetching doctor info:", error);
           } finally {
             setLoading(false);
           }
         };
     fetchData();
   }, [router]);
   console.log(patient)
  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-8">
      <img
          src={patient.image} // Changed to absolute path
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-[#0089FF]"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {patient.name}
          </h1>
          {/* <p className="text-lg text-gray-600">Medical Professional</p> */}
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Birth Date</span>
              <span className="text-gray-900">{patient.birth_day}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Gender</span>
              <span className="text-gray-900">{patient.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Phone Number</span>
              <span className="text-gray-900">{patient.phone}</span>
            </div>
          </div>
        </div>

        {/* Medical Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
            Medical Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Blood Type</span>
              <span className="text-gray-900">{patient.blood_type}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Sensitivities</span>
              <span className="text-gray-900 text-right">
                {patient.allergies}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Chronic Diseases</span>
              <span className="text-gray-900 text-right">
                {patient.medicalConditions}
              </span>
            </div>
          </div>
        </div>
      </div>
 {/* Medical File Section */}
 <div className="mt-8">
        <Sheet>
          <SheetTrigger className="w-full bg-[#0089FF] hover:bg-[#0075D9] text-white py-3 px-6 rounded-lg transition-colors duration-200">
            View Medical File
          </SheetTrigger>
          
          <SheetContent className="w-full max-w-2xl overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold text-gray-900">
                Medical History
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Detailed medical records and treatment information
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6">
              {/* {medicalRecords.map((record, index) => ( */}
                <div  className="border-b border-gray-200 pb-6 last:border-0">
                  {/* <h3 className="text-xl font-semibold mb-4 text-[#0089FF]">
                    {record.disease_name}
                  </h3> */} <h3>disease</h3>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="1" >
                    {/* value={`medication-${index}`}> */}
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Medication Details
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        {/* {record.medication} */}1
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="4">
                     {/* value={`report-${index}`}> */}
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Doctor's Report
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        {/* {record.test_analysis} */}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="3">  
                    {/* value={`tests-${index}`}> */}
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Test Analysis
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        {/* {record.test_analysis} */}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="2">
                     {/* value={`radiology-${index}`}> */}
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Radiology Images
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        <div className="grid grid-cols-2 gap-4">
                          {/* {record.radiology_images?.map((image, idx) => (
                            <img 
                              key={idx}
                              src={image} 
                              alt={`Radiology scan ${idx + 1}`}
                              className="w-full h-auto rounded-lg border border-gray-200"
                            />
                          ))} */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              {/* )) */}
              {/* } */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Medical File Section
      <div className="mt-8">
        <Sheet>
          <SheetTrigger className="w-full bg-[#0089FF] hover:bg-[#0075D9] text-white py-3 px-6 rounded-lg transition-colors duration-200">
            View Medical File
          </SheetTrigger>
          
          <SheetContent className="w-full max-w-2xl overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold text-gray-900">
                Medical History
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                Detailed medical records and treatment information
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6">
              {profileData.medicalFile.diseases.map((disease, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold mb-4 text-[#0089FF]">
                    {disease.name}
                  </h3>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="medication">
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Medication Details
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        {disease.details.medication}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="report" className="mt-3">
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        Medical Report
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
                        {disease.details.report}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div> */}
    </section>
  );
}
// 'use client'
// import React, { useEffect, useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { supabase } from "@/lib/supabaseclient";
// import { redirect, useRouter } from "next/navigation"; 

// export default function Profile() {
//   const router = useRouter();
//   const [patient, setPatient] = useState(null);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const { data: { user } } = await supabase.auth.getUser();

//       if (!user) {
//         router.push("/Patient");
//         return;
//       }

//       try {
//         // Fetch patient info
//         const { data: userInfo, error: patientError } = await supabase
//           .from("patients")
//           .select("*")
//           .eq("user_id", user.id)
//           .single();

//         if (patientError) throw patientError;

//         // Fetch medical records
//         const { data: records, error: recordsError } = await supabase
//           .from("medical_records")
//           .select("*")
//           .eq("patient_id", userInfo.id);

//         if (recordsError) throw recordsError;

//         setPatient(userInfo);
//         setMedicalRecords(records);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   if (loading) return <div>Loading...</div>;
//   if (!patient) return <div>No patient data found</div>;

//   return (
//     <section className="w-full max-w-4xl mx-auto p-6">
//       {/* Profile Header */}
//       <div className="mb-8 flex items-center gap-6 border-b border-gray-200 pb-8">
//         <img
//           src={patient.photo || "./assets/images/dr-lee.png"}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover border-4 border-[#0089FF]"
//         />
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {patient.name}
//           </h1>
//         </div>
//       </div>

//       {/* Information Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Personal Information Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
//             Personal Information
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center py-2 border-b border-gray-100">
//               <span className="text-gray-600">Birth Date</span>
//               <span className="text-gray-900">{patient.birth_day}</span>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b border-gray-100">
//               <span className="text-gray-600">Gender</span>
//               <span className="text-gray-900">{patient.gender}</span>
//             </div>
//             <div className="flex justify-between items-center py-2">
//               <span className="text-gray-600">Phone Number</span>
//               <span className="text-gray-900">{patient.phone}</span>
//             </div>
//           </div>
//         </div>

//         {/* Medical Information Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <h2 className="text-2xl font-semibold mb-6 text-[#0089FF]">
//             Medical Information
//           </h2>
//           <div className="space-y-4">
//             <div className="flex justify-between items-center py-2 border-b border-gray-100">
//               <span className="text-gray-600">Blood Type</span>
//               <span className="text-gray-900">{patient.blood_type}</span>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b border-gray-100">
//               <span className="text-gray-600">Sensitivities</span>
//               <span className="text-gray-900 text-right">
//                 {patient.allergies}
//               </span>
//             </div>
//             <div className="flex justify-between items-center py-2">
//               <span className="text-gray-600">Chronic Diseases</span>
//               <span className="text-gray-900 text-right">
//                 {patient.medicalConditions}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Medical File Section */}
//       <div className="mt-8">
//         <Sheet>
//           <SheetTrigger className="w-full bg-[#0089FF] hover:bg-[#0075D9] text-white py-3 px-6 rounded-lg transition-colors duration-200">
//             View Medical File
//           </SheetTrigger>
          
//           <SheetContent className="w-full max-w-2xl overflow-y-auto">
//             <SheetHeader className="mb-6">
//               <SheetTitle className="text-2xl font-bold text-gray-900">
//                 Medical History
//               </SheetTitle>
//               <SheetDescription className="text-gray-600">
//                 Detailed medical records and treatment information
//               </SheetDescription>
//             </SheetHeader>

//             <div className="space-y-6">
//               {medicalRecords.map((record, index) => (
//                 <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
//                   <h3 className="text-xl font-semibold mb-4 text-[#0089FF]">
//                     {record.disease_name}
//                   </h3>
                  
//                   <Accordion type="single" collapsible>
//                     <AccordionItem value={`medication-${index}`}>
//                       <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
//                         Medication Details
//                       </AccordionTrigger>
//                       <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
//                         {record.medication}
//                       </AccordionContent>
//                     </AccordionItem>

//                     <AccordionItem value={`report-${index}`}>
//                       <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
//                         Doctor's Report
//                       </AccordionTrigger>
//                       <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
//                         {record.doctor_report}
//                       </AccordionContent>
//                     </AccordionItem>

//                     <AccordionItem value={`tests-${index}`}>
//                       <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
//                         Test Analysis
//                       </AccordionTrigger>
//                       <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
//                         {record.test_analysis}
//                       </AccordionContent>
//                     </AccordionItem>

//                     <AccordionItem value={`radiology-${index}`}>
//                       <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
//                         Radiology Images
//                       </AccordionTrigger>
//                       <AccordionContent className="px-4 py-3 bg-white border border-gray-100 rounded-lg mt-2">
//                         <div className="grid grid-cols-2 gap-4">
//                           {record.radiology_images?.map((image, idx) => (
//                             <img 
//                               key={idx}
//                               src={image} 
//                               alt={`Radiology scan ${idx + 1}`}
//                               className="w-full h-auto rounded-lg border border-gray-200"
//                             />
//                           ))}
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 </div>
//               ))}
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </section>
//   );
// }