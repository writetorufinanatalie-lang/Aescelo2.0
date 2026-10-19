import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div id="disclaimer-compact" className="flex items-start gap-2 text-amber-800 bg-amber-50/70 border border-amber-200/50 p-3 rounded-lg text-xs font-sans leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold">Patient Information Tool:</strong> Aesculo translates clinical shorthand for educational purposes. It does not diagnose, treat, or provide medical instructions.
        </p>
      </div>
    );
  }

  return (
    <div id="disclaimer-full" className="bg-amber-50/50 border border-amber-200/60 p-5 rounded-xl shadow-sm font-sans">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-900 font-serif">Important Medical Information Disclaimer</h4>
          <p className="mt-1.5 text-xs text-amber-800 leading-relaxed">
            Aesculo is an educational aid designed to translate jargon, clinical shorthand, and laboratory terminology into plain language. 
            <span className="font-semibold"> It is explicitly NOT a medical diagnosis tool, treatment recommender, or doctor substitute.</span>
          </p>
          <ul className="mt-2 space-y-1 text-xs text-amber-800/90 list-disc pl-4 leading-relaxed">
            <li>We translate information already written on your physical report; we do not invent clinical conclusions.</li>
            <li>Any highlighted flags are intended solely as <strong className="font-semibold">suggested talking points for your doctor or pharmacist</strong>, never as recommendations to change your current treatment plan or dosages.</li>
            <li>In the event of a medical emergency or immediate clinical concern, please contact your doctor or dial 911 immediately.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
