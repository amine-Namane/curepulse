// 'use client'
// import React, { useEffect, useState } from 'react';
// import { UploadCloud, FileText, TestTube2, AlertTriangle } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { supabase } from "@/lib/supabaseclient";

// export default function Blodtest() {
//   const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const router = useRouter();
  
//     useEffect(() => {
//       const checkAuthAndFetchAppointments = async () => {
//         const { data: { user } } = await supabase.auth.getUser();      
//         if (!user) {
//           router.push("/Patient"); // Redirect if not logged in
//           return;
//         }
//       };
  
//       checkAuthAndFetchAppointments();
//     }, []);
//   return (
//     <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8'>
//         {/* Header Section with Icon */}
//         <div className='mb-8 text-center'>
//           <div className='flex'>
//           <div className='mx-auto bg-blue-100 w-fit p-4 rounded-full mb-4'>
//             <TestTube2 className='h-8 w-8 text-blue-600' />
//           </div>
//           <h1 className='text-3xl font-bold text-gray-900 mt-4'>
//             Blood Test <span className='text-blue-600'>Analysis</span>
//           </h1></div>
//           <p className='mt-3 text-sm text-gray-500'>
//             Upload your blood test results for instant analysis and better understanding of your health status
//           </p>
//         </div>

//         {/* Upload Form */}
//         <form className='space-y-6'>
//           <div className='space-y-2'>
//             <label className='block text-sm font-medium text-gray-700'>
//               <FileText className='inline-block h-4 w-4 mr-2 text-blue-600' />
//               Upload Blood Test Results
//               <span className='text-blue-600 ml-1'>*</span>
//             </label>
            
//             {/* File Upload Area */}
//             <div className='mt-1 flex justify-center px-6 pt-8 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors'>
//               <div className='text-center'>
//                 <UploadCloud className='mx-auto h-12 w-12 text-gray-400' />
//                 <div className='mt-4 text-sm text-gray-600'>
//                   <p className='font-medium'>Drag and drop files here</p>
//                   <p className='mt-1'>or</p>
//                   <input
//                     type="file"
//                     id="upload-picture"
//                     accept=".pdf, .jpg, .png"
//                     className='sr-only'
//                   />
//                   <label
//                     htmlFor="upload-picture"
//                     className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
//                   >
//                     <span>Browse files</span>
//                   </label>
//                 </div>
//                 <p className='mt-2 text-xs text-gray-500'>
//                   Supported formats: PDF, JPG, PNG (max 5MB)
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className='w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'
//           >
//             <TestTube2 className='w-4 h-4 mr-2' />
//             Analyze Results
//           </button>
//         </form>

//         {/* Note Section with Icon */}
//         <div className='mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
//           <div className='flex items-start'>
//             <AlertTriangle className='h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5' />
//             <div className='ml-3'>
//               <h3 className='text-sm font-medium text-yellow-800'>Important Note</h3>
//               <p className='mt-1 text-sm text-yellow-700'>
//                 This analysis provides preliminary insights only. For accurate diagnosis and treatment recommendations, 
//                 always consult with a qualified healthcare professional.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import { useState } from "react";
// import { db, collection, addDoc, getDocs } from "../lib/firebase";
import { BeakerIcon, HeartIcon, ChartBarIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
export default function Home() {
  const [selectedTestCategory, setSelectedTestCategory] = useState("");
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
const [error ,setError]=useState(null);
const [loading, setLoading] = useState(false);

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
  };
  
  const diseaseRules = {
    // CBC Panel
    hemoglobin: {
      low: "Possible anemia (Iron deficiency, chronic disease, or blood loss).",
      high: "Possible polycythemia (caused by dehydration or lung disease)."
    },
    wbc: {
      low: "Possible leukopenia (caused by viral infections, autoimmune disorders, or bone marrow problems).",
      high: "Possible infection, inflammation, or leukemia."
    },
    platelets: {
      low: "Possible thrombocytopenia (caused by immune disorders or viral infections).",
      high: "Possible thrombocytosis (linked to inflammation or blood disorders)."
    },
  
    // Metabolic Panel
    glucose: {
      low: "Possible hypoglycemia (due to insulin excess or fasting).",
      high: "Possible diabetes or stress-induced hyperglycemia."
    },
    sodium: {
      low: "Possible hyponatremia (caused by kidney disease, heart failure, or fluid overload).",
      high: "Possible hypernatremia (due to dehydration or endocrine disorders)."
    },
  
    // Lipid Panel
    cholesterol: {
      high: "High cholesterol may indicate cardiovascular disease risk.",
    },
    hdl: {
      low: "Low HDL cholesterol may increase heart disease risk.",
    },
    ldl: {
      high: "High LDL cholesterol is a major heart disease risk factor.",
    },
  
    // Liver Panel
    alt: {
      high: "Elevated ALT may indicate liver disease (hepatitis, fatty liver, or liver damage)."
    },
    ast: {
      high: "Elevated AST could be related to liver or muscle damage."
    },
    bilirubin: {
      high: "High bilirubin could indicate jaundice, liver disease, or hemolysis."
    },
  
    // Thyroid Panel
    tsh: {
      low: "Low TSH may indicate hyperthyroidism.",
      high: "High TSH may indicate hypothyroidism."
    },
    t3: {
      high: "High T3 may indicate hyperthyroidism.",
      low: "Low T3 may suggest hypothyroidism."
    },
    t4: {
      high: "High T4 may indicate hyperthyroidism.",
      low: "Low T4 may suggest hypothyroidism."
    },
  
    // Kidney Panel
    creatinine: {
      high: "High creatinine may indicate kidney dysfunction or dehydration.",
    },
    gfr: {
      low: "Low GFR may indicate kidney disease or reduced kidney function."
    },
  
    // Coagulation Panel
    inr: {
      high: "High INR may indicate a bleeding disorder or excessive anticoagulation.",
      low: "Low INR may indicate a risk of clot formation."
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  
  const analyze = () => {
    if (!selectedTestCategory) {
      setError("Please select a test category before analyzing.");
      return;
    }
  
    const selectedTests = testCategories[selectedTestCategory].tests;
    let resultText = "Analysis of your test results:\n\n";
    let abnormalResults = [];
    let possibleDiseases = new Set();
    let recommendedDoctors = new Set(); // To store recommended doctors
    let hasInvalidInput = false;
  
    // Mapping of diseases to recommended doctors
    const doctorRecommendations = {
      "anemia": "Hematologist",
      "iron deficiency anemia": "Hematologist",
      "vitamin B12 deficiency": "Hematologist or Primary Care Physician",
      "leukemia": "Hematologist or Oncologist",
      "diabetes mellitus": "Endocrinologist",
      "electrolyte imbalance": "Nephrologist or Primary Care Physician",
      "kidney dysfunction": "Nephrologist",
      "cardiovascular disease": "Cardiologist",
      "metabolic syndrome": "Endocrinologist or Primary Care Physician",
      "liver damage": "Hepatologist or Gastroenterologist",
      "hepatitis": "Hepatologist or Gastroenterologist",
      "cirrhosis": "Hepatologist or Gastroenterologist",
      "hypothyroidism": "Endocrinologist",
      "hyperthyroidism": "Endocrinologist",
      "pancytopenia": "Hematologist",
      "leukopenia": "Hematologist or Immunologist",
      "thrombocytopenia": "Hematologist",
      "thrombocytosis": "Hematologist",
      "hyperglycemia": "Endocrinologist",
      "hyponatremia": "Nephrologist or Primary Care Physician",
      "hypernatremia": "Nephrologist or Primary Care Physician",
      "high cholesterol": "Cardiologist or Primary Care Physician",
      "liver disease": "Hepatologist or Gastroenterologist",
      "jaundice": "Hepatologist or Gastroenterologist",
      "bone marrow disorders": "Hematologist or Oncologist",
    };
  
    // Helper function to add disease explanations and doctor recommendations
    const addDiseaseExplanation = (key, condition) => {
      if (diseaseRules[key]?.[condition]) {
        possibleDiseases.add(diseaseRules[key][condition]);
        // Add doctor recommendation based on disease
        const disease = diseaseRules[key][condition].toLowerCase();
        if (doctorRecommendations[disease]) {
          recommendedDoctors.add(`Consult a **${doctorRecommendations[disease]}** for further evaluation.`);
        }
      }
    };
  
    // Analyze each test value
    for (const key in values) {
      const test = selectedTests[key];
      const value = parseFloat(values[key]);
  
      // Edge Case: Missing or Invalid Input
      if (isNaN(value)) {
        abnormalResults.push(`${test.name}: Invalid or missing input. Please enter a numeric value.`);
        hasInvalidInput = true;
        continue;
      }
  
      // Edge Case: Extreme Values
      if (value < 0) {
        abnormalResults.push(`${test.name}: Negative value entered (${value} ${test.unit}). Please check your input.`);
        hasInvalidInput = true;
        continue;
      }
  
      if (value < test.min) {
        abnormalResults.push(`${test.name} is **low** (${value} ${test.unit}). Normal range: ${test.min} - ${test.max} ${test.unit}.`);
        addDiseaseExplanation(key, "low");
      } else if (value > test.max) {
        abnormalResults.push(`${test.name} is **high** (${value} ${test.unit}). Normal range: ${test.min} - ${test.max} ${test.unit}.`);
        addDiseaseExplanation(key, "high");
      }
    }
  
    // Edge Case: No Values Entered
    if (Object.keys(values).length === 0) {
      setError("No test values entered. Please fill in at least one test value.");
      return;
    }
  
    // Edge Case: Invalid Inputs Detected
    if (hasInvalidInput) {
      setError("Some inputs are invalid. Please correct them and try again.");
      setResult(abnormalResults.join("\n"));
      return;
    }
  
      // Generate the final result text with professional clinical structure
  if (abnormalResults.length > 0) {
    resultText += "## Abnormal Findings\n";
    resultText += abnormalResults.join("\n") + "\n\n";
    
    resultText += "## Clinical Interpretation\n";
    const clinicalNotes = [];
    
    // CBC Panel Analysis
    if (selectedTestCategory === "cbc") {
      if (values.hemoglobin < 12) {
        clinicalNotes.push(
          `- Hemoglobin level of ${values.hemoglobin} g/dL (normal: 12-16 g/dL) indicates anemia. ` +
          `The morphological classification based on MCV (${values.mcv || '--'} fL) suggests ${
            values.mcv < 80 ? "microcytic" : 
            values.mcv > 100 ? "macrocytic" : "normocytic"
          } anemia.`
        );
      }
      
      if (values.wbc > 11) {
        clinicalNotes.push(
          `- Leukocytosis (WBC: ${values.wbc}×10³/μL) observed. Consider infectious, inflammatory, ` +
          `or hematological etiologies. Correlation with differential count recommended.`
        );
      }
    }

    // Metabolic Panel Analysis
    if (selectedTestCategory === "metabolic") {
      if (values.glucose > 140) {
        clinicalNotes.push(
          `- Hyperglycemia detected (glucose: ${values.glucose} mg/dL). Fasting levels >126 mg/dL ` +
          `meet criteria for diabetes mellitus. Confirm with HbA1c testing.`
        );
      }
      
      if (values.sodium < 135) {
        clinicalNotes.push(
          `- Hyponatremia (Na⁺: ${values.sodium} mEq/L) identified. Evaluate volume status and ` +
          `consider SIADH, diuretic use, or adrenal insufficiency.`
        );
      }
    }

    // Liver Panel Analysis
    if (selectedTestCategory === "liver") {
      if (values.alt > 56 && values.ast > 40) {
        clinicalNotes.push(
          `- Hepatic transaminase elevation (ALT: ${values.alt} U/L, AST: ${values.ast} U/L) ` +
          `suggests hepatocellular injury. The AST/ALT ratio of ${(values.ast/values.alt).toFixed(1)} ` +
          `${values.ast/values.alt > 2 ? 'may indicate alcoholic hepatitis' : 'suggests non-alcoholic etiology'}.`
        );
      }
    }

    resultText += clinicalNotes.join("\n") + "\n\n";
    
    resultText += "## Recommended Actions\n";
    resultText += "1. Confirm abnormal findings with repeat testing if indicated\n";
    resultText += "2. Consider additional diagnostic evaluation:\n";
    
    const evaluations = [];
    if (recommendedDoctors.size > 0) {
      evaluations.push(
        `- Specialist consultation: ${Array.from(recommendedDoctors).join(", ")}`
      );
    }
    
    // Add specific follow-up tests
    if (selectedTestCategory === "cbc" && values.hemoglobin < 12) {
      evaluations.push(
        "- Iron studies (ferritin, TIBC)\n" +
        "- Vitamin B12 and folate levels\n" +
        "- Peripheral blood smear"
      );
    }
    
    if (selectedTestCategory === "lipid" && values.ldl > 100) {
      evaluations.push(
        "- Lipoprotein(a) measurement\n" +
        "- hs-CRP\n" +
        "- Consider coronary calcium scoring"
      );
    }

    resultText += evaluations.join("\n") + "\n";
    
  } else {
    resultText += "All values within normal reference ranges. No acute abnormalities detected.";
  }

  setResult(resultText);
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
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Analyze Results
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
            {result.split("\n").map((line, index) => {
              if (line.includes("**low**")) {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                  >
                    <span className="font-medium text-slate-700">
                      {line.replace("**low**", "").split("(")[0].trim()}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Low
                    </span>
                  </div>
                );
              } else if (line.includes("**high**")) {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-amber-50 rounded-lg"
                  >
                    <span className="font-medium text-slate-700">
                      {line.replace("**high**", "").split("(")[0].trim()}
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      High
                    </span>
                  </div>
                );
              } else if (line.includes("Possible Conditions")) {
                return (
                  <div key={index} className="mt-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Possible Conditions
                    </h3>
                    <ul className="list-disc list-inside text-slate-700 mt-2">
                      {result
                        .split("Possible Conditions:")[1]
                        .split("\n")
                        .filter((l) => l.trim())
                        .map((condition, i) => (
                          <li key={i} className="mt-1">
                            {condition.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              } else if (line.includes("Recommended Specialists")) {
                return (
                  <div key={index} className="mt-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Recommended Specialists
                    </h3>
                    <ul className="list-disc list-inside text-slate-700 mt-2">
                      {result
                        .split("Recommended Specialists:")[1]
                        .split("\n")
                        .filter((l) => l.trim())
                        .map((doctor, i) => (
                          <li key={i} className="mt-1">
                            {doctor.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="text-slate-700">
                    {line}
                  </div>
                );
              }
            })}
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