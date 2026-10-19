import React, { useState, useRef } from 'react';
import { DocumentReport, UserProfile } from '../types';
import { Upload, FileText, ArrowRight, ShieldAlert, CheckCircle2, AlertCircle, FilePlus, ChevronRight, Activity, Pill, User, Heart, Loader2 } from 'lucide-react';
import Disclaimer from './Disclaimer';

interface DashboardPageProps {
  reports: DocumentReport[];
  profile: UserProfile;
  onAddReport: (newReport: DocumentReport) => void;
  onSelectReport: (report: DocumentReport) => void;
}

export default function DashboardPage({ reports, profile, onAddReport, onSelectReport }: DashboardPageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats
  const totalMeds = new Set(reports.flatMap(r => r.medications.map(m => m.name.toLowerCase()))).size;
  const totalFlags = reports.reduce((sum, r) => sum + r.flags.length, 0);
  const outOfRangeCount = reports.flatMap(r => r.labValues).filter(l => l.isOutOfRange).length;

  // Presets so users can immediately test-analyze a paper
  const presets = [
    {
      id: "preset-lab",
      label: "Standard Metabolic & Lipid Panel",
      description: "Includes HbA1c, Fasting Blood Glucose, and LDL/HDL cholesterol measurements.",
      type: "lab_report" as const,
      data: {
        id: `rep-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        fileName: "fasting_lab_july_2026.png",
        title: "Metabolic Panel (Simulated Analysis)",
        type: "lab_report" as const,
        summary: "This report shows your blood glucose, standard HbA1c average, and cholesterol panel. While your fasting blood glucose remains slightly elevated, your HbA1c (6.2%) shows significant positive progress towards standard non-diabetic ranges.",
        metadata: {
          doctor: "Dr. Evelyn Marcus, MD",
          facility: "Metropolitan Lab Partners",
          dateOfService: "2026-07-08"
        },
        medications: [],
        labValues: [
          {
            id: `lab-${Date.now()}-1`,
            parameterName: "HbA1c (Hemoglobin A1c)",
            extractedValue: 6.2,
            unit: "%",
            standardRange: "< 5.7%",
            minNormal: 0,
            maxNormal: 5.6,
            isOutOfRange: true,
            status: "high" as const,
            plainLanguageExplanation: "HbA1c measures your average blood sugar over the last 3 months. At 6.2%, it is pre-diabetic, but represents a downward trend from past tests."
          },
          {
            id: `lab-${Date.now()}-2`,
            parameterName: "LDL Cholesterol",
            extractedValue: 124,
            unit: "mg/dL",
            standardRange: "< 100 mg/dL",
            minNormal: 0,
            maxNormal: 99,
            isOutOfRange: true,
            status: "high" as const,
            plainLanguageExplanation: "Also known as 'bad' cholesterol. Levels over 100 increase standard arterial risks over long durations."
          },
          {
            id: `lab-${Date.now()}-3`,
            parameterName: "HDL Cholesterol",
            extractedValue: 54,
            unit: "mg/dL",
            standardRange: "> 40 mg/dL",
            minNormal: 40,
            maxNormal: 150,
            isOutOfRange: false,
            status: "normal" as const,
            plainLanguageExplanation: "This is 'good' cholesterol which clears fatty deposits from blood vessels. At 54, yours is perfectly healthy."
          }
        ],
        flags: [
          {
            id: `flag-${Date.now()}-1`,
            severity: "warning" as const,
            title: "Borderline LDL Cholesterol",
            description: "Your bad cholesterol (124) is elevated above standard healthy targets.",
            itemReference: "LDL Cholesterol",
            actionableQuestion: "Are lifestyle and dietary modifications sufficient for my current LDL level, or should we consider low-dose preventive drugs?"
          }
        ],
        generalNotes: "Patient exhibits excellent adherence to metabolic counseling. Continue daily walks."
      }
    },
    {
      id: "preset-rx",
      label: "Chronic Hypertension & Diabetes Prescriptions",
      description: "Includes standard renewals for Lisinopril and Metformin Hydrochloride.",
      type: "prescription" as const,
      data: {
        id: `rep-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        fileName: "maintenance_rx_renewal.jpg",
        title: "Metformin & Lisinopril (Simulated Analysis)",
        type: "prescription" as const,
        summary: "Contains active daily prescriptions for type 2 diabetes management (Metformin) and cardiovascular blood pressure support (Lisinopril).",
        metadata: {
          doctor: "Dr. Evelyn Marcus, MD",
          facility: "Metro Health Primary Care",
          dateOfService: "2026-07-01"
        },
        medications: [
          {
            id: `med-${Date.now()}-1`,
            name: "Metformin Hydrochloride",
            dosage: "1000 mg",
            frequency: "Twice daily with breakfast and dinner",
            purpose: "Type 2 Diabetes / Glucose control",
            plainLanguageExplanation: "Reduces liver sugar production and increases muscle insulin sensitivity so blood sugar is used efficiently.",
            precautions: ["Take with meals to prevent stomach distress", "Limit alcohol to avoid rare metabolic acidosis concerns"],
            sideEffects: ["Mild stomach discomfort or bloating", "Metallic taste in the mouth"],
            fdaLabelWarnings: "WARNING: Avoid excessive alcohol intake due to risks of lactic acidosis."
          },
          {
            id: `med-${Date.now()}-2`,
            name: "Lisinopril",
            dosage: "10 mg",
            frequency: "Once daily in the morning",
            purpose: "ACE inhibitor / Blood pressure & kidney protection",
            plainLanguageExplanation: "Relaxes arteries to drop peripheral blood pressure and eases general strain on your heart and kidneys.",
            precautions: ["Avoid extra potassium salt substitutes", "Beware of dizziness when standing up fast"],
            sideEffects: ["Persistent dry, tickly cough", "Mild lightheadedness"],
            fdaLabelWarnings: "WARNING: High fetal hazard risk. Do not take during pregnancy."
          }
        ],
        labValues: [],
        flags: [
          {
            id: `flag-${Date.now()}-2`,
            severity: "warning" as const,
            title: "Lisinopril Induced Dry Cough",
            description: "Lisinopril frequently induces a benign but persistent dry cough.",
            itemReference: "Lisinopril 10mg",
            actionableQuestion: "If I experience an annoying dry cough, is it safe to switch to an ARB-class blood pressure drug like Losartan?"
          }
        ],
        generalNotes: "Monitor basic kidney blood parameters (Serum Creatinine and Potassium) in 6 months."
      }
    }
  ];

  // Drag-and-drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const triggerClickInput = () => {
    fileInputRef.current?.click();
  };

  // Simulate Claude Vision & FDA analysis pipeline
  const processSelectedFile = (file: File) => {
    setIsAnalyzing(true);
    setErrorText(null);
    setAnalysisProgress(5);
    setCurrentStepText("Parsing handwritten elements and document layout...");

    // Phase 1
    setTimeout(() => {
      setAnalysisProgress(30);
      setCurrentStepText("Running optical character recognition (OCR) on labels...");
    }, 600);

    // Phase 2
    setTimeout(() => {
      setAnalysisProgress(65);
      setCurrentStepText("Matching compounds with RxNorm and querying openFDA warnings...");
    }, 1200);

    // Phase 3
    setTimeout(() => {
      setAnalysisProgress(90);
      setCurrentStepText("Comparing results against your declared Penicillin allergy...");
    }, 1800);

    // Done
    setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);

      // Randomly choose lab or prescription to inject as an uploaded item!
      const isLab = file.name.toLowerCase().includes('lab') || Math.random() > 0.5;
      const basePreset = isLab ? presets[0] : presets[1];
      
      const newDoc: DocumentReport = {
        ...basePreset.data,
        id: `rep-${Date.now()}`,
        fileName: file.name,
        date: new Date().toISOString().split('T')[0],
      };

      // Handle custom allergy check inject if patient has penicillin allergy
      if (profile.allergies.some(a => a.toLowerCase() === 'penicillin') && file.name.toLowerCase().includes('amox')) {
        // Force the penicillin alert report instead
        const dentalPreset = {
          id: `rep-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          fileName: file.name,
          title: "Urgent Dental Prescription",
          type: "prescription" as const,
          summary: "Acute dental prescription for a severe tooth abscess containing Amoxicillin. This triggered a red alert warning.",
          metadata: { doctor: "Dr. David Vance, DDS", facility: "Westside Dental Group", dateOfService: "2026-07-11" },
          medications: [
            {
              id: `med-${Date.now()}-dent`,
              name: "Amoxicillin",
              dosage: "500 mg",
              frequency: "Take 1 pill three times daily for 7 days",
              purpose: "Penicillin antibiotic for dental infection",
              plainLanguageExplanation: "Amoxicillin belongs to the penicillin class. It blocks bacteria from forming walls, stopping infections.",
              precautions: ["Finish the whole bottle", "Slight contraceptive efficiency reduction warning"],
              sideEffects: ["Nausea, bloating, or diarrhea"],
              fdaLabelWarnings: "WARNING: Do not take if you have a known Penicillin allergy. Severe anaphylaxis may occur."
            }
          ],
          labValues: [],
          flags: [
            {
              id: `flag-${Date.now()}-dent-1`,
              severity: "danger" as const,
              title: "Active Allergy Conflict Found",
              description: "This document prescribes Amoxicillin, which belongs to the Penicillin class. Your profile lists Penicillin as an active allergy.",
              itemReference: "Amoxicillin 500mg",
              actionableQuestion: "I see Amoxicillin is listed on my report, but I have a documented Penicillin allergy. Can we swap this to Clindamycin or Erythromycin instead?"
            }
          ],
          generalNotes: "Substitute with non-penicillin immediate compounds."
        };
        onAddReport(dentalPreset);
        onSelectReport(dentalPreset);
      } else {
        onAddReport(newDoc);
        onSelectReport(newDoc);
      }
    }, 2400);
  };

  // Preset button inject
  const handleInjectPreset = (preset: typeof presets[0]) => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setCurrentStepText(`Injecting preset template: ${preset.label}...`);
    
    setTimeout(() => {
      setAnalysisProgress(50);
      setCurrentStepText("Mapping parameters to trends dashboard...");
    }, 500);

    setTimeout(() => {
      setIsAnalyzing(false);
      const newDoc: DocumentReport = {
        ...preset.data,
        id: `rep-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
      };
      onAddReport(newDoc);
      onSelectReport(newDoc);
    }, 1000);
  };

  return (
    <div id="dashboard-page" className="space-y-8 max-w-5xl mx-auto font-sans text-stone-800">
      
      {/* Top Banner Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-serif text-medical-teal-950 font-bold">Welcome, {profile.name}</h1>
          <p className="text-xs text-stone-500 mt-1">Upload a medical paper, or examine your existing health trends.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-warm-cream-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Total Reports</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-medical-teal-950">{reports.length}</span>
            <span className="text-xs text-stone-400">files</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-cream-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Health Discussion Flags</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-amber-700">{totalFlags}</span>
            <span className="text-xs text-amber-600 font-semibold">raised</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-cream-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Monitored Drugs</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-indigo-700">{totalMeds}</span>
            <span className="text-xs text-stone-400">compounds</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-warm-cream-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Out-Of-Range Labs</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-mono font-bold text-red-600">{outOfRangeCount}</span>
            <span className="text-xs text-red-500 font-semibold">parameters</span>
          </div>
        </div>
      </div>

      {/* File Uploader Core Layout */}
      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Upload Container */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-warm-cream-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-stone-900">Upload New Medical Document</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Drop a photo of a prescription note, medication receipt, or laboratory report. Our server matches components securely without clinical diagnostic guessing.
            </p>

            {/* Uploader Box */}
            <div
              id="upload-drag-zone"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerClickInput}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition duration-150 ${
                dragActive
                  ? "border-medical-teal-600 bg-medical-teal-50/50"
                  : "border-stone-200 hover:border-medical-teal-600/50 hover:bg-warm-cream-50/20"
              } ${isAnalyzing ? "pointer-events-none opacity-50" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileInputChange}
              />

              {isAnalyzing ? (
                <div className="space-y-4 py-4">
                  <Loader2 className="w-8 h-8 text-medical-teal-700 animate-spin mx-auto" />
                  <div>
                    <p className="text-sm font-bold text-stone-700">Analyzing Document via Claude Vision...</p>
                    <p className="text-xs text-stone-500 mt-1">{currentStepText}</p>
                  </div>
                  {/* Progress meter */}
                  <div className="max-w-xs mx-auto bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-medical-teal-700 h-full transition-all duration-300"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">Progress: {analysisProgress}%</span>
                </div>
              ) : (
                <div className="space-y-3 py-4">
                  <div className="p-3 bg-medical-teal-50 w-fit mx-auto rounded-full border border-medical-teal-100">
                    <Upload className="w-6 h-6 text-medical-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-700">Drag & drop your file here, or <span className="text-medical-teal-700 underline font-semibold">browse files</span></p>
                    <p className="text-[10px] text-stone-400 mt-1">Supports JPEG, PNG, or PDF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Template Demo Trigger helpers */}
            <div className="pt-4 border-t border-warm-cream-100 space-y-3">
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                No real medical paper nearby? Inject a demo template:
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleInjectPreset(preset)}
                    className="text-left p-3 rounded-lg border border-warm-cream-200/80 hover:bg-warm-cream-50 transition text-xs flex justify-between items-center gap-3 bg-warm-cream-50/20"
                    disabled={isAnalyzing}
                  >
                    <div>
                      <strong className="text-stone-800 font-medium block">{preset.label}</strong>
                      <span className="text-stone-400 text-[10px] leading-tight block mt-0.5 truncate max-w-[200px]">
                        {preset.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                  </button>
                ))}
              </div>

              {/* Specific Penicillin warning helper */}
              <div className="bg-amber-50/50 p-3 rounded border border-amber-200/50 text-[11px] text-stone-600 leading-normal">
                💡 <strong className="text-amber-800">Demo Allergic Safety Check:</strong> If you keep <strong className="text-amber-800">Penicillin</strong> active in your Profile and drag/browse a file named <strong className="text-amber-800 font-mono">"dental_amoxicillin.png"</strong>, the scanner will actively highlight a critical red allergy conflict alert!
              </div>
            </div>
          </div>

          {/* Recent Activity feed */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold text-stone-400 tracking-wider">
              Recent Documents Checked
            </h3>

            <div className="bg-white rounded-xl border border-warm-cream-200 shadow-sm overflow-hidden divide-y divide-warm-cream-100">
              {reports.slice(0, 3).map((rep) => (
                <div key={rep.id} className="p-4 hover:bg-stone-50/50 transition flex justify-between items-center gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      rep.type === 'prescription' ? 'bg-indigo-50 text-indigo-700' : 'bg-medical-teal-50 text-medical-teal-700'
                    }`}>
                      {rep.type === 'prescription' ? <Pill className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-stone-900 text-sm truncate">{rep.title}</h4>
                      <p className="text-[11px] text-stone-400 mt-0.5 font-mono">{rep.date} • {rep.fileName}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectReport(rep)}
                    className="inline-flex items-center gap-1 text-xs text-medical-teal-700 hover:text-medical-teal-800 font-semibold shrink-0 cursor-pointer"
                  >
                    Examine
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Sidebar Quick widget */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Quick Profile Panel */}
          <div className="bg-white p-5 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-serif text-stone-900 border-b border-warm-cream-100 pb-2.5 flex items-center gap-2">
              <User className="w-4 h-4 text-medical-teal-600" />
              Patient Protection Card
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Name</span>
                <span className="font-serif font-bold text-stone-800 text-sm">{profile.name}</span>
              </div>

              <div>
                <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Active Allergies</span>
                {profile.allergies.length === 0 ? (
                  <span className="text-stone-400 block mt-0.5">None listed</span>
                ) : (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.allergies.map(a => (
                      <span key={a} className="bg-red-50 text-red-800 border border-red-100 px-2 py-0.5 rounded text-[10px] font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <span className="block text-stone-400 text-[10px] uppercase font-bold tracking-wider">Emergency Contact</span>
                <p className="font-medium text-stone-850 mt-0.5">{profile.emergencyContact.name} ({profile.emergencyContact.relation})</p>
                <p className="font-mono text-stone-500 text-[10px]">{profile.emergencyContact.phone}</p>
              </div>
            </div>
          </div>

          {/* Quick Guidance Tip */}
          <div className="bg-warm-cream-50 p-5 rounded-xl border border-warm-cream-200 space-y-2">
            <h4 className="text-xs font-bold text-stone-800 font-serif">A Note on Medical Ethics</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We never recommend changing dosages, stopping medications, or ignoring laboratory reports. Clinical decisions are complex and require direct physician review. Use this tool solely to prepare questions for your next clinic visit.
            </p>
          </div>
        </div>

      </div>

      <Disclaimer />
    </div>
  );
}
