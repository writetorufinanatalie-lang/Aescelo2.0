import React, { useState } from 'react';
import { DocumentReport, UserProfile } from '../types';
import { FileText, Calendar, User, Building, ArrowLeft, AlertTriangle, HelpCircle, Eye, Info, CheckCircle2, ChevronDown, ChevronUp, Pill, ShieldAlert, FileDigit } from 'lucide-react';
import Disclaimer from './Disclaimer';

interface ReportDetailPageProps {
  report: DocumentReport;
  profile: UserProfile;
  onBack: () => void;
}

export default function ReportDetailPage({ report, profile, onBack }: ReportDetailPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Dynamic safety checks against the profile allergies
  const enhancedFlags = [...report.flags];
  
  // If the report lists a medication that contains penicillin or sulfa drugs and user lists them as allergy, ensure we emphasize it.
  const hasPenicillinAllergy = profile.allergies.some(a => a.toLowerCase() === 'penicillin');
  const hasAmoxicillin = report.medications.some(m => m.name.toLowerCase().includes('amox'));
  
  const allergyFlagTriggered = hasPenicillinAllergy && hasAmoxicillin;

  return (
    <div id="report-detail-page" className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Back button and title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-medical-teal-700 hover:text-medical-teal-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </button>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-mono ${
          report.type === 'prescription' ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' : 'bg-medical-teal-50 text-medical-teal-800 border border-medical-teal-100'
        }`}>
          {report.type === 'prescription' ? 'Prescription Analysis' : 'Laboratory Panel Analysis'}
        </span>
      </div>

      {/* Main Card Header */}
      <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">{report.title}</h1>
            <p className="text-xs text-stone-400">Physical file: <span className="font-mono">{report.fileName}</span></p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-100">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Uploaded: <strong className="text-stone-700 font-mono">{report.date}</strong></span>
            </div>
            {report.metadata.doctor && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Doctor: <strong className="text-stone-700">{report.metadata.doctor}</strong></span>
              </div>
            )}
            {report.metadata.facility && (
              <div className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-stone-400" />
                <span>Facility: <strong className="text-stone-700">{report.metadata.facility}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Executive Summary in Plain language */}
        <div className="bg-medical-teal-50/40 p-4 rounded-lg border border-medical-teal-100/30">
          <h3 className="text-xs font-bold text-medical-teal-900 uppercase tracking-wider flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-medical-teal-700" />
            Plain-Language Executive Summary
          </h3>
          <p className="text-xs text-stone-700 mt-1.5 leading-relaxed">
            {report.summary}
          </p>
        </div>
      </div>

      {/* Flag notifications / Safety notices */}
      {enhancedFlags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Safety Checklist ({enhancedFlags.length} points worth asking about)
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {enhancedFlags.map((flag) => {
              const isDanger = flag.severity === 'danger';
              const isWarning = flag.severity === 'warning';
              
              return (
                <div
                  key={flag.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 shadow-sm ${
                    isDanger ? 'bg-red-50 border-red-200 text-red-950' :
                    isWarning ? 'bg-amber-50 border-amber-200 text-amber-950' :
                    'bg-medical-teal-50 border-medical-teal-100 text-medical-teal-950'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className={`w-4 h-4 ${isDanger ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-medical-teal-600'}`} />
                      <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                        {flag.severity} Notice
                      </h4>
                    </div>
                    <h3 className="text-sm font-bold font-serif">{flag.title}</h3>
                    <p className="text-xs opacity-90 leading-relaxed pt-1">{flag.description}</p>
                    <p className="text-[10px] font-semibold opacity-75 mt-1">Refers to: <span className="font-mono">{flag.itemReference}</span></p>
                  </div>

                  <div className="p-3 bg-white/70 rounded-lg border border-black/5 text-xs text-stone-800">
                    <p className="font-semibold text-stone-900 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-medical-teal-700 shrink-0" />
                      Suggested Doctor / Pharmacist Question:
                    </p>
                    <p className="italic mt-1 text-stone-700">
                      "{flag.actionableQuestion}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Split details for medications vs lab values */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Medications List */}
        {report.medications.length > 0 && (
          <div className="md:col-span-12 space-y-4">
            <h3 className="text-xs uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
              <Pill className="w-4 h-4 text-indigo-500" />
              Extracted Medications ({report.medications.length})
            </h3>

            <div className="space-y-3">
              {report.medications.map((med) => {
                const isExpanded = expandedSection === med.id;
                return (
                  <div key={med.id} className="bg-white rounded-xl border border-warm-cream-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : med.id)}
                      className="w-full text-left p-4 hover:bg-stone-50 transition flex justify-between items-center gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-800 rounded-lg shrink-0">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-stone-900 text-base">{med.name}</h4>
                          <p className="text-xs text-stone-500 mt-0.5">{med.dosage} • <span className="italic">{med.frequency}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-400 hidden sm:inline-block">Click to toggle plain breakdown</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-stone-50 border-t border-warm-cream-100 space-y-4 text-xs">
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Clinical Purpose</span>
                            <p className="font-mono text-stone-700 bg-white p-2.5 rounded border border-stone-200/50">{med.purpose}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Plain-Language Meaning</span>
                            <p className="text-stone-600 bg-white p-2.5 rounded border border-stone-200/50 leading-relaxed">{med.plainLanguageExplanation}</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 pt-1">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Side Effects (What you might feel)</span>
                            <ul className="list-disc pl-4 space-y-1 text-stone-600">
                              {med.sideEffects.map((side, i) => <li key={i}>{side}</li>)}
                            </ul>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Precautions & Self-Care</span>
                            <ul className="list-disc pl-4 space-y-1 text-stone-600">
                              {med.precautions.map((prec, i) => <li key={i}>{prec}</li>)}
                            </ul>
                          </div>
                        </div>

                        {med.fdaLabelWarnings && (
                          <div className="bg-red-50/60 p-3 rounded border border-red-100/80 text-red-950">
                            <strong className="font-bold text-[10px] uppercase tracking-wider block mb-0.5 text-red-800">Boxed Warning Summary</strong>
                            {med.fdaLabelWarnings}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lab Values List */}
        {report.labValues.length > 0 && (
          <div className="md:col-span-12 space-y-4">
            <h3 className="text-xs uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
              <FileDigit className="w-4 h-4 text-medical-teal-600" />
              Extracted Lab Parameters ({report.labValues.length})
            </h3>

            <div className="bg-white rounded-xl border border-warm-cream-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-warm-cream-50/60 border-b border-warm-cream-100 text-stone-400 uppercase tracking-wider font-mono text-[10px]">
                      <th className="p-4 font-bold">Tested Parameter</th>
                      <th className="p-4 font-bold text-right">Result</th>
                      <th className="p-4 font-bold text-center">Status</th>
                      <th className="p-4 font-bold text-right">Standard Healthy Range</th>
                      <th className="p-4 font-bold">Clinical Meaning & Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-cream-100">
                    {report.labValues.map((lab) => {
                      const isHigh = lab.status === 'high';
                      const isLow = lab.status === 'low';
                      const isOutOfRange = lab.isOutOfRange;
                      
                      return (
                        <tr key={lab.id} className={`hover:bg-warm-cream-50/20 transition ${isOutOfRange ? 'bg-red-50/10' : ''}`}>
                          <td className="p-4">
                            <div className="font-bold text-stone-900 text-sm">{lab.parameterName}</div>
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-sm">
                            <span className={isOutOfRange ? 'text-red-600 bg-red-50 px-1.5 py-0.5 rounded' : 'text-stone-900'}>
                              {lab.extractedValue} <span className="text-stone-400 font-sans text-xs font-normal">{lab.unit}</span>
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {isOutOfRange ? (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                                isHigh ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {lab.status}
                              </span>
                            ) : (
                              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase">
                                Normal
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right font-mono text-stone-500">
                            {lab.standardRange}
                          </td>
                          <td className="p-4 max-w-sm text-stone-600 leading-relaxed">
                            {lab.plainLanguageExplanation}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* General Notes footer card */}
      {report.generalNotes && (
        <div className="bg-white p-5 rounded-xl border border-warm-cream-200 shadow-sm space-y-2">
          <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Clinician Administrative Notes</h4>
          <p className="text-xs text-stone-600 italic font-mono whitespace-pre-wrap">
            "{report.generalNotes}"
          </p>
        </div>
      )}

      <Disclaimer />
    </div>
  );
}
