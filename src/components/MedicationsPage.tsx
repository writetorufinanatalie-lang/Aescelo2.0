import React, { useState } from 'react';
import { MOCK_REPORTS } from '../mockData';
import { MedicationExtraction } from '../types';
import { Pill, Search, ChevronRight, FileText, Calendar, ShieldAlert, AlertCircle, BookOpen, Info } from 'lucide-react';
import Disclaimer from './Disclaimer';

export default function MedicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedId, setSelectedMedId] = useState<string | null>("med-02-met"); // Metformin default

  // Extract all unique medications across all reports
  const allMeds: (MedicationExtraction & { reportId: string; reportTitle: string; reportDate: string })[] = [];
  
  MOCK_REPORTS.forEach(report => {
    report.medications.forEach(med => {
      // Avoid adding duplicate IDs, but map where it was seen
      const existing = allMeds.find(m => m.name.toLowerCase() === med.name.toLowerCase());
      if (!existing) {
        allMeds.push({
          ...med,
          reportId: report.id,
          reportTitle: report.title,
          reportDate: report.date
        });
      }
    });
  });

  const filteredMeds = allMeds.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    med.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMed = allMeds.find(med => med.id === selectedMedId) || allMeds[0];

  // Latin abbreviations reference guide
  const latinAbbreviations = [
    { abbreviation: "p.o. (PO)", translation: "By mouth / Swallowed", origin: "Per os" },
    { abbreviation: "q.d. (QD)", translation: "Once daily", origin: "Quaque die" },
    { abbreviation: "b.i.d. (BID)", translation: "Twice daily", origin: "Bis in die" },
    { abbreviation: "t.i.d. (TID)", translation: "Three times daily", origin: "Ter in die" },
    { abbreviation: "p.r.n. (PRN)", translation: "As needed (for specific symptoms)", origin: "Pro re nata" },
    { abbreviation: "h.s. (HS)", translation: "At bedtime", origin: "Hora somni" },
  ];

  return (
    <div id="medications-page" className="space-y-6 max-w-6xl mx-auto font-sans">
      
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-serif text-medical-teal-950 font-bold">Your Aggregated Medication Locker</h1>
        <p className="text-sm text-stone-500 mt-1">A consolidated checklist of all drugs extracted from your uploaded documents, combined with FDA warnings.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Left Column: Medication Selection & Search */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search medications or purposes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-teal-600 focus:border-medical-teal-600"
            />
          </div>

          {/* List panel */}
          <div className="bg-white rounded-xl border border-warm-cream-200 shadow-sm overflow-hidden divide-y divide-warm-cream-100">
            <div className="bg-warm-cream-50/50 p-3 border-b border-warm-cream-100 flex justify-between items-center">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">All Active & Historic Prescriptions</span>
              <span className="text-[10px] bg-medical-teal-100 text-medical-teal-800 border border-medical-teal-200/50 px-2 py-0.5 rounded-full font-mono">
                {filteredMeds.length} Items
              </span>
            </div>

            {filteredMeds.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No medications matched your query.
              </div>
            ) : (
              filteredMeds.map((med) => {
                const isSelected = med.id === activeMed?.id;
                return (
                  <button
                    key={med.id}
                    onClick={() => setSelectedMedId(med.id)}
                    className={`w-full text-left p-4 hover:bg-warm-cream-50/50 transition flex items-center justify-between gap-3 ${
                      isSelected ? 'bg-medical-teal-50/60 border-l-4 border-medical-teal-700' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <Pill className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-medical-teal-700' : 'text-stone-400'}`} />
                        <h4 className="font-serif font-bold text-stone-900 truncate text-sm">{med.name}</h4>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 truncate">{med.dosage} • {med.frequency}</p>
                      <p className="text-[10px] text-medical-teal-800/80 mt-0.5 bg-medical-teal-50/50 w-fit px-1.5 py-0.2 rounded border border-medical-teal-100/50 truncate">
                        {med.purpose}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                  </button>
                );
              })
            )}
          </div>

          {/* Latin legends panel */}
          <div className="bg-warm-cream-50 border border-warm-cream-200 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-stone-800 font-serif flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-medical-teal-700" />
              Latin Prescription Shortcuts
            </h4>
            <p className="text-[11px] text-stone-500 leading-normal">
              Doctors write prescriptions using Latin medical codes. Standard legend translations include:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {latinAbbreviations.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] border-b border-warm-cream-200/50 pb-1 last:border-0 last:pb-0">
                  <span className="font-mono font-bold text-medical-teal-800">{item.abbreviation}</span>
                  <span className="text-stone-600 font-medium">{item.translation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Medication View */}
        <div className="md:col-span-7">
          {activeMed ? (
            <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-6">
              
              {/* Header Details */}
              <div className="flex items-start justify-between gap-4 border-b border-warm-cream-100 pb-5">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1 bg-medical-teal-50 text-medical-teal-800 border border-medical-teal-200 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    <Pill className="w-3 h-3 text-medical-teal-600" />
                    Verified Clinical Compound
                  </span>
                  <h2 className="text-2xl font-serif text-stone-900 font-bold">{activeMed.name}</h2>
                  <p className="text-sm text-stone-600 font-medium">Strength: <strong className="font-mono">{activeMed.dosage}</strong></p>
                  <p className="text-xs text-stone-500">Frequency: <span className="font-serif italic">{activeMed.frequency}</span></p>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block text-[10px] bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 rounded font-mono">
                    {activeMed.rxNormStatus || "RxNorm Verified"}
                  </span>
                </div>
              </div>

              {/* Purpose & Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Clinical Indication (Purpose)</h4>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs text-stone-700 leading-relaxed font-mono">
                  {activeMed.purpose}
                </div>
                
                <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider pt-2">Plain Language Explanation</h4>
                <p className="text-xs text-stone-600 leading-relaxed bg-medical-teal-50/30 p-3.5 rounded-lg border border-medical-teal-100/40">
                  {activeMed.plainLanguageExplanation}
                </p>
              </div>

              {/* Side effects & Precautions */}
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Potential Side Effects</h4>
                  <ul className="text-xs text-stone-600 list-disc pl-4 space-y-1">
                    {activeMed.sideEffects.map((side, i) => (
                      <li key={i}>{side}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Precautionary Guidelines</h4>
                  <ul className="text-xs text-stone-600 list-disc pl-4 space-y-1">
                    {activeMed.precautions.map((prec, i) => (
                      <li key={i}>{prec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Boxed Warning section (openFDA mock representation) */}
              {activeMed.fdaLabelWarnings && (
                <div className="bg-red-50/50 border border-red-200/60 p-4 rounded-lg space-y-2">
                  <h4 className="text-xs uppercase font-bold text-red-800 tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    Official FDA Safety Alert Summary
                  </h4>
                  <p className="text-xs text-red-900 leading-relaxed font-sans">
                    {activeMed.fdaLabelWarnings}
                  </p>
                  <p className="text-[10px] text-red-500/80 italic">
                    Source: National openFDA Drug Label Catalog (No key requested)
                  </p>
                </div>
              )}

              {/* Appeared in Reports link */}
              <div className="bg-warm-cream-50 p-4 rounded-lg flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <FileText className="w-4 h-4 text-stone-400" />
                  <span>First detected in report: <strong className="text-stone-700">{activeMed.reportTitle}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-stone-400 font-mono text-[10px]">
                  <Calendar className="w-3 h-3" />
                  {activeMed.reportDate}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-sm text-stone-400 bg-white border rounded-xl">
              Select a medication on the left to inspect compound details.
            </div>
          )}
        </div>

      </div>

      <Disclaimer />
    </div>
  );
}
