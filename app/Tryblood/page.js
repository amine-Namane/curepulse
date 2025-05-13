// "use client";
// import React, { useState } from "react";
// import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
// import { AzureKeyCredential } from "@azure/core-auth";

// const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT || "https://models.inference.ai.azure.com";
// const apiKey = process.env.NEXT_PUBLIC_AZURE_KEY; 
// const modelName = "DeepSeek-R1";

// const testCategories = {
//   blood: {
//     name: "Blood Test",
//     tests: {
//       hemoglobin: { name: "Hemoglobin", unit: "g/dL", min: 12, max: 18 },
//       wbc: { name: "White Blood Cells", unit: "cells/µL", min: 4000, max: 11000 },
//     },
//   },
//   urine: {
//     name: "Urine Test",
//     tests: {
//       ph: { name: "pH Level", unit: "", min: 4.5, max: 8.0 },
//       protein: { name: "Protein", unit: "mg/dL", min: 0, max: 150 },
//     },
//   },
// };

// const ChatComponent = () => {
//   const [selectedTestCategory, setSelectedTestCategory] = useState("blood");
//   const [testResults, setTestResults] = useState({});
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle input changes and store values
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTestResults((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   async function fetchResponse() {
//     if (!apiKey) {
//       setError("API key is missing! Set NEXT_PUBLIC_AZURE_KEY in .env.local.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setResponse("");

//     const client = ModelClient(endpoint, new AzureKeyCredential(apiKey));

//     // Format test results into a structured string
//     const formattedResults = Object.keys(testResults)
//       .map((key) => {
//         const test = testCategories[selectedTestCategory].tests[key];
//         return `${test.name}: ${testResults[key]} ${test.unit}`;
//       })
//       .join("\n");

//     const prompt = `You are a medical expert. Analyze the following test results and provide a detailed interpretation, including potential diseases or conditions the patient might have. Here are the test results:\n\n${formattedResults}`;

//     try {
//       const res = await client.path("/chat/completions").post({
//         body: {
//           messages: [
//             { role: "system", content: "You are a medical expert providing professional test analysis." },
//             { role: "user", content: prompt },
//           ],
//           model: modelName,
//         },
//       });

//       if (isUnexpected(res)) {
//         throw new Error(res.body.error.message);
//       }

//       setResponse(res.body.choices[0].message.content);
//     } catch (err) {
//       setError("Error analyzing test results.");
//       console.error("API Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h2>Azure AI Medical Analysis</h2>
      
//       {/* Select Test Category */}
//       <select
//         value={selectedTestCategory}
//         onChange={(e) => setSelectedTestCategory(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-lg"
//       >
//         {Object.keys(testCategories).map((category) => (
//           <option key={category} value={category}>
//             {testCategories[category].name}
//           </option>
//         ))}
//       </select>

//       {/* Test Inputs */}
//       <div className="grid gap-4 md:grid-cols-2 mt-4">
//         {Object.keys(testCategories[selectedTestCategory].tests).map((key) => {
//           const test = testCategories[selectedTestCategory].tests[key];
//           return (
//             <div key={key} className="space-y-1">
//               <label className="text-sm font-medium text-slate-700">
//                 {test.name} ({test.unit})
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   name={key}
//                   value={testResults[key] || ""}
//                   className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16"
//                   placeholder={`Enter value (${test.min}-${test.max})`}
//                   onChange={handleChange}
//                 />
//                 <span className="absolute right-3 top-3.5 text-slate-400 text-sm">
//                   {test.unit}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Submit Button */}
//       <button onClick={fetchResponse} disabled={loading} className="mt-4 w-full p-3 bg-blue-500 text-white rounded-lg">
//         {loading ? "Analyzing..." : "Analyze Results"}
//       </button>

//       {/* Display Errors */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Display AI Response */}
//       {response && (
//         <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
//           <strong>Analysis:</strong>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatComponent;

'use client'
import { useState,useEffect } from "react";
import { BeakerIcon, HeartIcon, ChartBarIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
 import { supabase } from "@/lib/supabaseclient";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import OpenAI from "openai";
import { useRouter } from "next/navigation";
const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT || "https://models.inference.ai.azure.com";
const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY; 
const apiKey2 = process.env.NEXT_PUBLIC_AZURE_KEY_2; 
const modelName = "DeepSeek-R1";

export default function Home() {
  const [selectedTestCategory, setSelectedTestCategory] = useState("");
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user ,SetUser]=useState(null)

  //to add to doctors page (add to supabase tablle of patient suggest doctor)
  const[doctors,setDoctors]=useState([])
  const router = useRouter();
  const testCategories = {
    "cbc": {
      name: "Complete Blood Count (CBC)",
      tests: {
        hemoglobin: { name: "Hemoglobin", min: 12, max: 16, unit: "g/dL" },
        wbc: { name: "White Blood Cells (WBC)", min: 4, max: 11, unit: "×10³/μL" },
        rbc: { name: "Red Blood Cells (RBC)", min: 4.7, max: 6.1, unit: "million/μL" },
        platelets: { name: "Platelet Count", min: 150, max: 400, unit: "×10³/μL" },
        hematocrit: { name: "Hematocrit", min: 38, max: 50, unit: "%" },
        mcv: { name: "Mean Corpuscular Volume (MCV)", min: 80, max: 100, unit: "fL" },
        mch: { name: "Mean Corpuscular Hemoglobin (MCH)", min: 27, max: 33, unit: "pg" },
        mchc: { name: "Mean Corpuscular Hemoglobin Concentration (MCHC)", min: 32, max: 36, unit: "g/dL" },
      },
    },
    "metabolic": {
      name: "Basic Metabolic Panel (BMP)",
      tests: {
        glucose: { name: "Fasting Glucose", min: 70, max: 140, unit: "mg/dL" },
        sodium: { name: "Sodium", min: 135, max: 145, unit: "mEq/L" },
        potassium: { name: "Potassium", min: 3.5, max: 5.1, unit: "mEq/L" },
        chloride: { name: "Chloride", min: 96, max: 106, unit: "mEq/L" },
        bicarbonate: { name: "Bicarbonate", min: 22, max: 29, unit: "mEq/L" },
        bun: { name: "Blood Urea Nitrogen (BUN)", min: 7, max: 20, unit: "mg/dL" },
        creatinine: { name: "Creatinine", min: 0.6, max: 1.3, unit: "mg/dL" },
      },
    },
    "lipid": {
      name: "Lipid Panel",
      tests: {
        cholesterol: { name: "Total Cholesterol", min: 150, max: 200, unit: "mg/dL" },
        hdl: { name: "High-Density Lipoprotein (HDL)", min: 40, max: 60, unit: "mg/dL" },
        ldl: { name: "Low-Density Lipoprotein (LDL)", min: 0, max: 100, unit: "mg/dL" },
        triglycerides: { name: "Triglycerides", min: 50, max: 150, unit: "mg/dL" },
      },
    },
    "liver": {
      name: "Liver Function Tests (LFT)",
      tests: {
        alt: { name: "Alanine Aminotransferase (ALT)", min: 7, max: 56, unit: "U/L" },
        ast: { name: "Aspartate Aminotransferase (AST)", min: 10, max: 40, unit: "U/L" },
        alp: { name: "Alkaline Phosphatase (ALP)", min: 44, max: 147, unit: "U/L" },
        bilirubin: { name: "Total Bilirubin", min: 0.1, max: 1.2, unit: "mg/dL" },
        albumin: { name: "Albumin", min: 3.5, max: 5.0, unit: "g/dL" },
        total_protein: { name: "Total Protein", min: 6.0, max: 8.3, unit: "g/dL" },
      },
    },
    "thyroid": {
      name: "Thyroid Function Panel",
      tests: {
        tsh: { name: "Thyroid-Stimulating Hormone (TSH)", min: 0.5, max: 5.0, unit: "mIU/L" },
        t3: { name: "Triiodothyronine (T3)", min: 80, max: 200, unit: "ng/dL" },
        t4: { name: "Thyroxine (T4)", min: 4.5, max: 12.5, unit: "μg/dL" },
      },
    },
    "renal": {
      name: "Renal Function Panel",
      tests: {
        bun: { name: "Blood Urea Nitrogen (BUN)", min: 7, max: 20, unit: "mg/dL" },
        creatinine: { name: "Creatinine", min: 0.6, max: 1.3, unit: "mg/dL" },
        gfr: { name: "Glomerular Filtration Rate (GFR)", min: 90, max: 120, unit: "mL/min" },
      },
    },
    "coagulation": {
      name: "Coagulation Panel",
      tests: {
        pt: { name: "Prothrombin Time (PT)", min: 10, max: 13, unit: "seconds" },
        inr: { name: "International Normalized Ratio (INR)", min: 0.8, max: 1.2, unit: "ratio" },
        aptt: { name: "Activated Partial Thromboplastin Time (aPTT)", min: 25, max: 35, unit: "seconds" },
      },
    },
    "infectious": {
      name: "Infectious Disease Panel",
      tests: {
        hiv_viral_load: { name: "HIV Viral Load", min: 0, max: 20, unit: "copies/mL" },
        cd4_count: { name: "CD4 Count", min: 500, max: 1500, unit: "cells/μL" },
        hbsag: { name: "Hepatitis B Surface Antigen (HBsAg)", min: 0, max: 0.05, unit: "IU/mL" },
        anti_hcv: { name: "Anti-HCV Antibody", min: 0, max: 1, unit: "signal/cutoff" },
      },
    },
    "hormonal": {
      name: "Hormonal Panel",
      tests: {
        fsh: { name: "Follicle-Stimulating Hormone (FSH)", min: 1.5, max: 12.4, unit: "mIU/mL" },
        lh: { name: "Luteinizing Hormone (LH)", min: 1.7, max: 8.6, unit: "mIU/mL" },
        estradiol: { name: "Estradiol", min: 15, max: 350, unit: "pg/mL" },
        testosterone: { name: "Testosterone", min: 300, max: 1000, unit: "ng/dL" },
      },
    },
    "cardiac": {
      name: "Cardiac Markers",
      tests: {
        troponin: { name: "Troponin I", min: 0, max: 0.04, unit: "ng/mL" },
        bnp: { name: "B-type Natriuretic Peptide (BNP)", min: 0, max: 100, unit: "pg/mL" },
        ck_mb: { name: "Creatine Kinase-MB (CK-MB)", min: 0, max: 5, unit: "ng/mL" },
      },
    },
    "autoimmune": {
      name: "Autoimmune Panel",
      tests: {
        ana: { name: "Antinuclear Antibody (ANA)", min: 0, max: 1, unit: "titer" },
        rf: { name: "Rheumatoid Factor (RF)", min: 0, max: 14, unit: "IU/mL" },
        crp: { name: "C-Reactive Protein (CRP)", min: 0, max: 10, unit: "mg/L" },
        esr: { name: "Erythrocyte Sedimentation Rate (ESR)", min: 0, max: 20, unit: "mm/hr" },
      },
    },
    "urinalysis": {
      name: "Urinalysis",
      tests: {
        urine_ph: { name: "Urine pH", min: 4.5, max: 8, unit: "pH" },
        urine_glucose: { name: "Urine Glucose", min: 0, max: 0, unit: "mg/dL" },
        urine_protein: { name: "Urine Protein", min: 0, max: 150, unit: "mg/day" },
        urine_rbc: { name: "Urine RBCs", min: 0, max: 3, unit: "cells/HPF" },
      },
  }
}
useEffect(() => {
  const checkAuthAndFetchAppointments = async () => {
    const { data: { user },error  } = await supabase.auth.getUser(); 
    if (!user) {
      router.push("/Patient"); // Redirect if not logged in
      return;
    }else{
      SetUser(user)
      console.log(user)
    }
  };

  checkAuthAndFetchAppointments();
}, []);
const handleChange = (e) => {
setValues({ ...values, [e.target.name]: e.target.value });
}; 
const analyze = async () => {
if (!selectedTestCategory) {
setError("Please select a test category before analyzing.");
return;
}

if (!apiKey) {
setError("API key is missing! Set NEXT_PUBLIC_AZURE_KEY in .env.local.");
return;
}

setLoading(true);
setError(null);
setResult(null);

const selectedTests = testCategories[selectedTestCategory].tests;
let formattedResults = Object.keys(values)
.map((key) => {
  const test = selectedTests[key];
  return `${test.name}: ${values[key]} ${test.unit}`;
})
.join("\n");

const prompt = `
---

### **1. Test Analysis**  
- **For each value:**  
- **Status:** Clearly state *High/Normal/Low* in **bold**. (and display 🔴 for low, 🟠 for high, 🟢 for normal)  
- **Biological Reason:** One concise phrase (≤15 words) explaining the mechanism or clinical relevance.  
- **Example Format:**  
- Hemoglobin: **High** 🟠. Chronic hypoxia stimulates erythropoietin production.  

---

### **2. Potential Diagnoses**  
- **Criteria:** Only list conditions **directly linked to ALL abnormal values combined**.  
- **Prioritization:** Rank **top 3** most likely diagnoses (use medical terminology).  
- Include a brief rationale (1 sentence) linking abnormal results to each diagnosis.  
- **Example:**  
1. **Polycythemia Vera** – Elevated hemoglobin and hematocrit with JAK2 mutation association.  

---

### **3. Recommended Specialists**  
- **Specificity:** Name **subspecialists** (e.g., *Hematologist*, not "doctor").  
- **Alignment:** Pair each specialist with a corresponding diagnosis from Section 2.  
- **Example:**  
- **Hematologist**: Further evaluate suspected polycythemia vera.  

---

**Lab Results:**  
\n\n${formattedResults}\n\n 

---
**Response Guidelines:**  
- Use clear headings, bullet points, and bold keywords for readability.  
- Avoid redundant explanations or general statements.  
- Prioritize abnormalities first, then normal values.  
`

try {
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Required to use OpenAI in the browser
});

const response = await client.chat.completions.create({
  messages: [
    { role: "system", content: "You are a medical expert providing test analysis." },
    { role: "user", content: prompt },
  ],
  model: "gpt-4o",
  temperature: 1,
  max_tokens: 4096,
  top_p: 1,
});
let aiResponse = response.choices[0].message.content;

// Remove stars and hashes, trim
aiResponse = aiResponse.replace(/\*\*/g, "").replace(/#/g, "").trim();

// Extract "Doctors to consult" section
let doctorsList = [];
let doctorNames = [];
const sections = aiResponse.split("\n\n");
console.log(sections)
for (const section of sections) {
const lines = section.split("\n");
for (const line of sections) {
console.log('line',line)
    const match = line.match(/-\s*([A-Za-z\s]+?ist)\b/); // match words ending in 'ist'
    if (match) {
      doctorNames.push(match[1].trim());
    }
}
console.log("doctornames:", doctorNames);
console.log(user);
setDoctors(doctorNames);
setResult(aiResponse);

// ✅ Save doctor list to patient account
try {
  const { data: patientData, error: fetchError } = await supabase
    .from('patients')
    .select('doctor_list')
    .eq('user_id', user.id)
    .single();
    console.log(user.id ,  patientData);
  if (fetchError) {
    console.error("Error fetching data:", fetchError);
    return;
  }
console.log(patientData.doctor_list)
  const currentDoctors = patientData?.doctor_list || [];
  const mergedDoctors = [...currentDoctors, ...doctors];
  const uniqueDoctors = [...new Set(mergedDoctors)];
console.log(mergedDoctors)
  const { error: updateError } = await supabase
    .from('patients')
    .update({ doctor_list: uniqueDoctors })
    .eq('user_id', user.id);

  if (updateError) {
    console.error('Supabase save error:', updateError);
  } else {
    console.log('✅ Saved doctors:', uniqueDoctors);
  }
} catch (err) {
  console.error('Saving failed:', err);
}

// try { 
//   const { data: { user }, error: authError } = await supabase.auth.getUser();
//   console.log("saveDoctors: starting..."); 
//   if (authError || !user) {
//     console.error("Auth error:", authError?.message || "No user");
//     return;
//   }
//   console.log("saveDoctors: starting..."); 
//   // if (!doctors || doctors.length === 0) {
//   //   console.warn("Empty doctors list - aborting save");
//   //   return;
//   // }
//   // Fetch the existing patient record
//   const { data: patientData, error: fetchError } = await supabase
//     .from('patients')
//     .select('doctors_list') // Ensure the column name matches your database!
//     .eq('user_id', user.id)
//     .single(); // Get a single record

//   if (fetchError) {
//     console.error("Error fetching data:", fetchError);
//     return;
//   }
//    // Get the current list (or default to an empty array)
//    const currentDoctors = patientData?.doctors_list || [];
//   // Merge existing and new doctors, and deduplicate (optional)
// const mergedDoctors = [...currentDoctors, ...doctors];

// // Remove duplicates (if needed)
// const uniqueDoctors = [...new Set(mergedDoctors)];

// console.log("Fetched patient data:", patientData);
// console.log("Current doctors list:", currentDoctors);
// console.log("Merged doctors list:", mergedDoctors);
// console.log("Unique doctors list:", uniqueDoctors);

//   const { error: updateError } = await supabase
//   .from('patients')
//   .update({ doctors_list: uniqueDoctors })
//   .eq('user_id', user.id);
  
//   if (updateError) {
//     console.error('Supabase save error:', updateError);
//     setError('Failed to save doctor list');
//   } else {
//     console.log('Saved doctors:', uniqueDoctors);
//   }
// } catch (err) {
//   console.error('Saving failed:', err);
// }
 }
//  catch (err) {
// console.error("API Error:", err);
// setError("Error analyzing test results.");
} finally {
setLoading(false);
}
};

return (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 font-sans">
    <header className="w-full max-w-4xl mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <BeakerIcon className="w-8 h-8 text-blue-600" />
          Clinical Laboratory Analyzer
        </h1>
        <p className="text-slate-600 mt-2">
          Comprehensive medical test interpretation and analysis
        </p>
      </div>
    </header>

    <main className="w-full max-w-4xl space-y-6">
      {/* Test Selection Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <DocumentTextIcon className="w-5 h-5 text-blue-600" />
          Select Test Panel
        </h2>
        <select
          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            setSelectedTestCategory(e.target.value);
            setValues({});
          }}
        >
          <option value="">Choose a diagnostic panel...</option>
          {Object.keys(testCategories).map((key) => (
            <option key={key} value={key}>
              {testCategories[key].name}
            </option>
          ))}
        </select>
      </div>

      {/* Input Form Card */}
      {selectedTestCategory && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <HeartIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              {testCategories[selectedTestCategory].name}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {Object.keys(testCategories[selectedTestCategory].tests).map(
              (key) => {
                const test = testCategories[selectedTestCategory].tests[key];
                return (
                  <div key={key} className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                      {test.name} ({test.unit})
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name={key}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-16"
                        placeholder={`Enter value (${test.min}-${test.max})`}
                        onChange={handleChange}
                      />
                      <span className="absolute right-3 top-3.5 text-slate-400 text-sm">
                        {test.unit}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? "Analyzing..." : "Analyze Results"}
          </button>
        </div>
      )}

      {/* Results Card */}
      {result && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <ChartBarIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Clinical Interpretation
            </h2>
          </div>

          <div className="space-y-4">
            {result.split("\n").map((line, index) => (
              <div key={index} className="text-slate-700">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <ClockIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Test History</h2>
        </div>

        <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-3 px-6 rounded-lg transition-colors">
          Load Historical Data
        </button>

        {history.length > 0 && (
          <div className="mt-6 space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-200 bg-slate-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-slate-800">
                      {item.category}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {new Date(item.timestamp.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  </div>
);
}
