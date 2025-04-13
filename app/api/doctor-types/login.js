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
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 