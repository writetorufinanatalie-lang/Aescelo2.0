import React from 'react';
import { ShieldCheck, HelpCircle, FileText, Database, ShieldAlert, Heart } from 'lucide-react';
import Disclaimer from './Disclaimer';

export default function AboutPage() {
  return (
    <div id="about-page" className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-serif text-medical-teal-950 font-bold">About Aesculo</h1>
        <p className="text-sm text-stone-500 mt-1">Our mission, clinical scope boundaries, and the technical integrations powering this tool.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Core Philosophy */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-medical-teal-600" />
              Empowering Patient Advocacy
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              When patients understand their healthcare documents, they can have far more collaborative, high-value conversations with their clinical providers. 
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Unfortunately, standard prescriptions and laboratory panels are filled with shorthand like <code className="bg-stone-100 px-1 rounded font-mono text-xs">q.d.</code> (once daily), <code className="bg-stone-100 px-1 rounded font-mono text-xs">p.o.</code> (by mouth), or confusing blood markers like <code className="bg-stone-100 px-1 rounded font-mono text-xs">HbA1c</code> or <code className="bg-stone-100 px-1 rounded font-mono text-xs">EGFR</code>. 
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Aesculo acts as a translation layer. It extracts data, normalizes drug names, overlays official patient leaflet warnings, and outputs a highly organized talking-points summary.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              What We Are NOT (The Diagnostic Line)
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We draw a non-negotiable boundary around medical diagnoses. Aesculo does not tell you if you are sick, nor does it recommend custom prescription changes or medical interventions.
            </p>
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 space-y-2 text-xs text-amber-900">
              <div className="font-semibold flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Explicit Design Constraints:
              </div>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                <li><strong className="text-stone-800">We do not write:</strong> "You have Type 2 Diabetes."</li>
                <li><strong className="text-stone-800">We do write:</strong> "Your HbA1c is 6.2%, which falls in the pre-diabetic reference range."</li>
                <li><strong className="text-stone-800">We do not write:</strong> "Stop taking Lisinopril."</li>
                <li><strong className="text-stone-800">We do write:</strong> "Lisinopril is associated with a dry cough. If you experience this, ask your doctor if switching to an ARB class drug is an option."</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column: APIs & Technical Integrity */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-medical-teal-600" />
              Integrated Healthcare Repositories
            </h3>
            <p className="text-xs text-stone-500">
              Aesculo utilizes free, authoritative medical reference catalogs to check values:
            </p>

            <div className="space-y-4">
              <div className="border-l-2 border-medical-teal-600 pl-3">
                <h4 className="text-xs font-bold text-stone-800">openFDA Drug Label API</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Connects to the U.S. Food and Drug Administration's open drug database to cross-reference boxed safety warnings, standard package inserts, and contraindicated conditions.
                </p>
              </div>

              <div className="border-l-2 border-medical-teal-600 pl-3">
                <h4 className="text-xs font-bold text-stone-800">RxNorm (NIH / NLB)</h4>
                <p className="text-xs text-stone-500 mt-1">
                  A standardized nomenclature for clinical drugs developed by the National Library of Medicine. Ensures misspelt or clinical shorthand drug names (e.g. "metformin hcl") resolve to their normalized medical definitions.
                </p>
              </div>

              <div className="border-l-2 border-medical-teal-600 pl-3">
                <h4 className="text-xs font-bold text-stone-800">LOINC Standards</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Logical Observation Identifiers Names and Codes. Standards used for clinical laboratory measurements to match reference ranges accurately across laboratory vendors.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-warm-cream-100 p-5 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-stone-800 font-serif">Quick Questions?</h4>
            <p className="text-stone-600">
              <strong className="text-stone-700">How is my data handled?</strong><br />
              All extractions are handled on-demand. Your uploaded reports can be cleared from your local history at any time.
            </p>
            <p className="text-stone-600 mt-2">
              <strong className="text-stone-700">Are the translations 100% accurate?</strong><br />
              While our extraction AI is highly reliable, handwriting and ink smudges can affect character recognition. Always double check precise metrics with your physical papers.
            </p>
          </div>
        </div>

      </div>

      <Disclaimer />
    </div>
  );
}
