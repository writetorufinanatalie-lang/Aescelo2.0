import { DocumentReport, UserProfile } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "Sarah Jenkins",
  email: "sarah.jenkins@example.com",
  allergies: ["Penicillin", "Sulfa Drugs"],
  knownConditions: ["Type 2 Diabetes", "Mild Hypertension"],
  emergencyContact: {
    name: "Robert Jenkins",
    phone: "(555) 321-7654",
    relation: "Spouse"
  }
};

export const MOCK_REPORTS: DocumentReport[] = [
  {
    id: "rep-01",
    date: "2026-07-10",
    fileName: "lab_results_july_2026.pdf",
    title: "Routine Metabolic Panel & Lipid Panel",
    type: "lab_report",
    summary: "Routine lab report checking blood glucose, average blood sugar (HbA1c), and cholesterol levels. Overall shows excellent positive trends with A1c coming down closer to the target, though LDL cholesterol remains slightly elevated.",
    metadata: {
      doctor: "Dr. Evelyn Marcus, MD",
      facility: "Metro General Labs & Health",
      dateOfService: "2026-07-08"
    },
    medications: [],
    labValues: [
      {
        id: "lab-01-a1c",
        parameterName: "HbA1c (Hemoglobin A1c)",
        extractedValue: 6.2,
        unit: "%",
        standardRange: "< 5.7%",
        minNormal: 0,
        maxNormal: 5.6,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "HbA1c shows your average blood sugar over the past 3 months. Your level of 6.2% is slightly above normal (< 5.7%), indicating pre-diabetes range. However, this is a significant improvement compared to your previous readings of 6.8% and 7.2%."
      },
      {
        id: "lab-01-glu",
        parameterName: "Fasting Blood Glucose",
        extractedValue: 112,
        unit: "mg/dL",
        standardRange: "70 - 99 mg/dL",
        minNormal: 70,
        maxNormal: 99,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "This is the amount of sugar in your blood after fasting. 112 mg/dL is slightly elevated, indicating mild insulin resistance, which aligns with your Type 2 Diabetes history."
      },
      {
        id: "lab-01-ldl",
        parameterName: "LDL Cholesterol ('Bad' Cholesterol)",
        extractedValue: 124,
        unit: "mg/dL",
        standardRange: "< 100 mg/dL",
        minNormal: 0,
        maxNormal: 99,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "Often called 'bad' cholesterol, high levels can build up in your blood vessels over time. At 124 mg/dL, it is in the borderline-high range. Lowering this reduces cardiovascular risks."
      },
      {
        id: "lab-01-hdl",
        parameterName: "HDL Cholesterol ('Good' Cholesterol)",
        extractedValue: 54,
        unit: "mg/dL",
        standardRange: "> 40 mg/dL",
        minNormal: 40,
        maxNormal: 150,
        isOutOfRange: false,
        status: "normal",
        plainLanguageExplanation: "This is 'good' cholesterol because it helps clear bad cholesterol from your bloodstream. Your level of 54 mg/dL is healthy and protective of your heart."
      },
      {
        id: "lab-01-pot",
        parameterName: "Potassium (Serum)",
        extractedValue: 4.1,
        unit: "mEq/L",
        standardRange: "3.5 - 5.1 mEq/L",
        minNormal: 3.5,
        maxNormal: 5.1,
        isOutOfRange: false,
        status: "normal",
        plainLanguageExplanation: "Potassium is an essential mineral that helps your heart beat normally and your muscles work properly. Your level is perfectly in the middle of the healthy range."
      }
    ],
    flags: [
      {
        id: "flag-01-ldl",
        severity: "warning",
        title: "Borderline LDL Cholesterol",
        description: "Your LDL ('bad') cholesterol is 124 mg/dL, which is above the standard healthy limit of 100 mg/dL.",
        itemReference: "LDL Cholesterol",
        actionableQuestion: "Is this LDL level acceptable given my diabetes status, or should we consider starting a low-dose statin, or try specific dietary adjustments first?"
      },
      {
        id: "flag-01-a1c",
        severity: "info",
        title: "Consistent HbA1c Improvement",
        description: "Your HbA1c has dropped to 6.2%, down from 6.8% earlier this year and 7.2% last winter. This shows your management plan is highly effective.",
        itemReference: "HbA1c",
        actionableQuestion: "Are we on track to potentially adjust or decrease any of my glucose-lowering medications if my HbA1c continues to fall?"
      }
    ],
    generalNotes: "Keep up the excellent work with daily walks and diet modifications. The HbA1c decline is impressive and clinically meaningful."
  },
  {
    id: "rep-02",
    date: "2026-05-15",
    fileName: "rx_renewal_may_2026.jpg",
    title: "Daily Chronic Care Prescriptions",
    type: "prescription",
    summary: "Active prescription sheet from your primary care provider renewal. Contains your blood pressure medication (Lisinopril) and type 2 diabetes manager (Metformin).",
    metadata: {
      doctor: "Dr. Evelyn Marcus, MD",
      facility: "Metro Health Primary Care",
      dateOfService: "2026-05-15"
    },
    medications: [
      {
        id: "med-02-met",
        name: "Metformin Hydrochloride",
        dosage: "1000 mg",
        frequency: "Twice daily with meals (breakfast and dinner)",
        purpose: "Blood sugar manager / Type 2 Diabetes treatment",
        plainLanguageExplanation: "Metformin is a common first-line pill for diabetes. It works by making your cells more sensitive to insulin (so they can absorb sugar better) and decreasing the amount of sugar made by your liver.",
        precautions: [
          "Take with food to minimize stomach upset.",
          "Limit heavy alcohol use, as it increases the rare risk of a serious condition called lactic acidosis.",
          "Ensure your kidney function is checked annually."
        ],
        sideEffects: [
          "Mild stomach upset, nausea, or diarrhea (usually improves over a couple of weeks)",
          "Metallic taste in the mouth",
          "Vitamin B12 deficiency over long-term use"
        ],
        fdaLabelWarnings: "BOXED WARNING: Lactic acidosis is a rare but serious complication that can occur due to metformin accumulation. Risk factors include kidney impairment, liver impairment, and excessive alcohol intake.",
        rxNormStatus: "RxNorm Normalized (CUI: 860974)"
      },
      {
        id: "med-02-lis",
        name: "Lisinopril",
        dosage: "10 mg",
        frequency: "Once daily in the morning",
        purpose: "ACE inhibitor / Blood pressure control & kidney protection",
        plainLanguageExplanation: "Lisinopril is an ACE inhibitor. It relaxes your blood vessels so blood flows more easily, which lowers your blood pressure. In people with diabetes, it also has a special protective effect on the kidneys.",
        precautions: [
          "Avoid using salt substitutes containing potassium without consulting your doctor, as Lisinopril can increase potassium in your blood.",
          "Stand up slowly from sitting/lying positions to avoid feeling dizzy or lightheaded.",
          "Do not take if pregnant or planning to become pregnant."
        ],
        sideEffects: [
          "A dry, tickly, persistent cough (harmless, but if annoying, your doctor can switch your medication)",
          "Dizziness or lightheadedness when starting",
          "Mild headache"
        ],
        fdaLabelWarnings: "WARNING: Avoid use during pregnancy. Lisinopril can cause injury or death to the developing fetus.",
        rxNormStatus: "RxNorm Normalized (CUI: 29046)"
      }
    ],
    labValues: [],
    flags: [
      {
        id: "flag-02-stomach",
        severity: "info",
        title: "Metformin GI Tolerance",
        description: "Metformin dose is 1000mg twice daily, which is a standard maintenance dose, but can cause digestive comfort issues if taken on an empty stomach.",
        itemReference: "Metformin 1000mg",
        actionableQuestion: "If I experience stomach issues, can I switch to the Extended-Release (XR) version of Metformin, which is known to be gentler on the stomach?"
      },
      {
        id: "flag-02-cough",
        severity: "warning",
        title: "Potential Cough Side Effect",
        description: "Lisinopril can sometimes cause a dry, persistent cough that does not go away with standard cough drops.",
        itemReference: "Lisinopril 10mg",
        actionableQuestion: "If I develop a dry, non-productive cough, is it safe to assume it's from Lisinopril, and can we explore alternative blood pressure options like an ARB (e.g. Losartan)?"
      }
    ],
    generalNotes: "Take consistently. Recheck basic blood electrolytes and kidney panels every 6 months while taking Lisinopril."
  },
  {
    id: "rep-03",
    date: "2026-02-12",
    fileName: "lab_feb_2026.pdf",
    title: "Semi-Annual Metabolic Review",
    type: "lab_report",
    summary: "Previous metabolic panel. Showed higher blood sugar levels (A1c at 6.8%) and elevated blood cholesterol levels, which originally prompted medication adjustments.",
    metadata: {
      doctor: "Dr. Evelyn Marcus, MD",
      facility: "Metro General Labs & Health",
      dateOfService: "2026-02-10"
    },
    medications: [],
    labValues: [
      {
        id: "lab-03-a1c",
        parameterName: "HbA1c (Hemoglobin A1c)",
        extractedValue: 6.8,
        unit: "%",
        standardRange: "< 5.7%",
        minNormal: 0,
        maxNormal: 5.6,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "HbA1c of 6.8% was in the diabetic category (> 6.5%), indicating that glucose management could be optimized through medication dosage or lifestyle alterations."
      },
      {
        id: "lab-03-glu",
        parameterName: "Fasting Blood Glucose",
        extractedValue: 128,
        unit: "mg/dL",
        standardRange: "70 - 99 mg/dL",
        minNormal: 70,
        maxNormal: 99,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "Fasting glucose at 128 mg/dL is over the 126 mg/dL diagnostic threshold for diabetes, indicating active hyperglycemic trends at the time of testing."
      },
      {
        id: "lab-03-ldl",
        parameterName: "LDL Cholesterol ('Bad' Cholesterol)",
        extractedValue: 145,
        unit: "mg/dL",
        standardRange: "< 100 mg/dL",
        minNormal: 0,
        maxNormal: 99,
        isOutOfRange: true,
        status: "high",
        plainLanguageExplanation: "LDL level was significantly elevated at 145 mg/dL, showing a clear indication for cardiovascular preventive discussion."
      },
      {
        id: "lab-03-hdl",
        parameterName: "HDL Cholesterol ('Good' Cholesterol)",
        extractedValue: 49,
        unit: "mg/dL",
        standardRange: "> 40 mg/dL",
        minNormal: 40,
        maxNormal: 150,
        isOutOfRange: false,
        status: "normal",
        plainLanguageExplanation: "HDL cholesterol was in the healthy range, though lower than the subsequent July level of 54."
      }
    ],
    flags: [
      {
        id: "flag-03-a1c",
        severity: "danger",
        title: "Elevated Diabetes Indicator",
        description: "Your HbA1c level of 6.8% was high, reflecting sustained average blood sugars above target.",
        itemReference: "HbA1c 6.8%",
        actionableQuestion: "Should we increase my daily Metformin dose or look closer at starch/sugar intake to bring this indicator back below 6.5%?"
      }
    ],
    generalNotes: "Slight metabolic worsening. Advised increasing Metformin dose and intensifying cardiovascular exercise habits."
  },
  {
    id: "rep-04",
    date: "2025-12-20",
    fileName: "rx_dental_infection.pdf",
    title: "Urgent Care Dental Antibiotic",
    type: "prescription",
    summary: "Temporary acute prescription from Westside Dental Care for a tooth abscess. Highlighted by our system due to a critical allergy warning.",
    metadata: {
      doctor: "Dr. David Vance, DDS",
      facility: "Westside Dental Group",
      dateOfService: "2025-12-20"
    },
    medications: [
      {
        id: "med-04-amox",
        name: "Amoxicillin",
        dosage: "500 mg",
        frequency: "One capsule three times daily for 7 days",
        purpose: "Penicillin antibiotic / Bacterial infection solver",
        plainLanguageExplanation: "Amoxicillin is a common penicillin-class antibiotic used to treat bacterial infections, such as middle ear infections, strep throat, and dental abscesses.",
        precautions: [
          "Complete the entire 7-day course even if you feel better earlier, to prevent bacteria from becoming resistant.",
          "Can decrease the effectiveness of some oral contraceptives."
        ],
        sideEffects: [
          "Nausea, diarrhea, or abdominal discomfort",
          "Yeast infection or thrush"
        ],
        fdaLabelWarnings: "CRITICAL: Contraindicated in patients with a history of penicillin allergy. Severe allergic reactions (anaphylaxis) can occur.",
        rxNormStatus: "RxNorm Normalized (CUI: 308182)"
      }
    ],
    labValues: [],
    flags: [
      {
        id: "flag-04-allergy",
        severity: "danger",
        title: "Active Allergy Conflict Found",
        description: "This document prescribes Amoxicillin, which belongs to the Penicillin class. Your profile lists Penicillin as an active allergy.",
        itemReference: "Amoxicillin 500mg",
        actionableQuestion: "I see Amoxicillin is listed on my report, but I have a documented Penicillin allergy. Can we swap this to Clindamycin or Erythromycin instead?"
      }
    ],
    generalNotes: "Discontinued after consultation. Swapped to safe alternative."
  }
];

// Historical values of keys parameters for plotting
export const TRENDS_HISTORY = {
  hba1c: [
    { date: "2025-12-10", value: 7.2, label: "Dec 2025" },
    { date: "2026-02-12", value: 6.8, label: "Feb 2026" },
    { date: "2026-07-10", value: 6.2, label: "July 2026" }
  ],
  ldl: [
    { date: "2025-12-10", value: 165, label: "Dec 2025" },
    { date: "2026-02-12", value: 145, label: "Feb 2026" },
    { date: "2026-07-10", value: 124, label: "July 2026" }
  ],
  fastingGlucose: [
    { date: "2025-12-10", value: 139, label: "Dec 2025" },
    { date: "2026-02-12", value: 128, label: "Feb 2026" },
    { date: "2026-07-10", value: 112, label: "July 2026" }
  ]
};
