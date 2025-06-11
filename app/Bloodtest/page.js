"use client"
import { useState, useEffect } from "react";
import { BeakerIcon, HeartIcon, ChartBarIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { supabase } from "@/lib/supabaseclient";
import OpenAI from "openai";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedTestCategory, setSelectedTestCategory] = useState("");
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Test categories configuration
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
    // ... other test categories ...
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/Patient");
      else setUser(user);
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    if (!selectedTestCategory) {
      setError("Please select a test category");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Format test results
      const selectedTests = testCategories[selectedTestCategory].tests;
      const formattedResults = Object.keys(values)
        .map(key => `${selectedTests[key].name}: ${values[key]} ${selectedTests[key].unit}`)
        .join("\n");

      // Medical analysis prompt
      const prompt = `
        ### Test Analysis
        For each value:
        - Status: State High/Normal/Low in bold with emoji (🔴 low, 🟢 normal, 🟠 high)
        - Biological Reason: One concise phrase (≤15 words)
        
        ### Potential Diagnoses
        - List top 3 conditions directly linked to ALL abnormal values
        - Include brief rationale
        
        ### Recommended Specialists
        - Name specific subspecialists (e.g., Hematologist)
        - Pair each with a diagnosis
        
        Lab Results:
        ${formattedResults}
      `;

      // Initialize OpenAI client
      const openai = new OpenAI({
         baseURL: "https://models.inference.ai.azure.com",
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true
      });

      // Get AI analysis
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a medical expert" },
          { role: "user", content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      const aiResponse = response.choices[0].message.content;
      setResult(aiResponse);

      // Extract doctor specialties
      const doctorNames = [];
      const matches = aiResponse.match(/-\s*([A-Za-z\s]+?ist)\b/g);
      if (matches) {
        matches.forEach(match => {
          doctorNames.push(match.replace('-', '').trim());
        });
      }

      // Save doctors to patient profile
      if (user && doctorNames.length > 0) {
        const { data } = await supabase
          .from('patients')
          .select('doctor_list')
          .eq('user_id', user.id)
          .single();

        const currentDoctors = data?.doctor_list || [];
        const uniqueDoctors = [...new Set([...currentDoctors, ...doctorNames])];
        
        await supabase
          .from('patients')
          .update({ doctor_list: uniqueDoctors })
          .eq('user_id', user.id);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze results: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <header className="w-full max-w-4xl mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-slate-100">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <BeakerIcon className="w-8 h-8 text-blue-600" />
            Clinical Laboratory Analyzer
          </h1>
          <p className="text-slate-600 mt-2">
            Comprehensive medical test interpretation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl space-y-6">
        {/* Test Selection */}
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

        {/* Input Form */}
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
                          placeholder={`${test.min}-${test.max}`}
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
              className={`mt-6 w-full font-medium py-3 px-6 rounded-lg transition-colors ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze Results"}
            </button>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">
                Clinical Interpretation
              </h2>
            </div>
            <div className="whitespace-pre-wrap text-slate-700">
              {result}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* History Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <ClockIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Test History</h2>
          </div>
          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-3 px-6 rounded-lg">
            Load Historical Data
          </button>
        </div>
      </main>
    </div>
  );
}