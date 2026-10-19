import React, { useState } from 'react';
import { DocumentReport } from '../types';
import { Search, Filter, Calendar, FileText, ChevronRight, Trash2, Pill, Activity, AlertTriangle, Eye } from 'lucide-react';
import Disclaimer from './Disclaimer';

interface HistoryPageProps {
  reports: DocumentReport[];
  onSelectReport: (report: DocumentReport) => void;
  onDeleteReport: (id: string) => void;
}

export default function HistoryPage({ reports, onSelectReport, onDeleteReport }: HistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'prescription' | 'lab_report'>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || report.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div id="history-page" className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-serif text-medical-teal-950 font-bold">Your Electronic Health Folders</h1>
        <p className="text-sm text-stone-500 mt-1">Audit, search, and manage all your previously processed medical records.</p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border border-warm-cream-200 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search document names, medication purposes, or parameters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-teal-600 focus:border-medical-teal-600"
          />
        </div>

        {/* Categories */}
        <div className="flex bg-warm-cream-100 p-1 rounded-lg border border-warm-cream-200 gap-1 overflow-x-auto shrink-0">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition whitespace-nowrap ${selectedType === 'all' ? 'bg-white text-medical-teal-850 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            All Docs
          </button>
          <button
            onClick={() => setSelectedType('prescription')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition whitespace-nowrap ${selectedType === 'prescription' ? 'bg-white text-medical-teal-850 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setSelectedType('lab_report')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition whitespace-nowrap ${selectedType === 'lab_report' ? 'bg-white text-medical-teal-850 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            Lab Reports
          </button>
        </div>

      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-warm-cream-200/60 p-8 space-y-3">
            <div className="p-3 bg-warm-cream-50 w-fit mx-auto rounded-full border border-warm-cream-100 text-stone-400">
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-sm font-serif font-bold text-stone-600">No records match your criteria</p>
            <p className="text-xs text-stone-450 max-w-sm mx-auto leading-relaxed">
              Try altering your keywords or upload a new physical paper from your Dashboard to begin tracking.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReports.map((report) => {
              const flagCount = report.flags.length;
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl border border-warm-cream-200 shadow-sm hover:shadow-md transition duration-200 overflow-hidden"
                >
                  <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    
                    {/* Left: icon & text info */}
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div className={`p-3 rounded-lg shrink-0 ${
                        report.type === 'prescription' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-medical-teal-50 text-medical-teal-700 border border-medical-teal-100'
                      }`}>
                        {report.type === 'prescription' ? <Pill className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          <h3 className="text-lg font-bold font-serif text-stone-900 truncate">
                            {report.title}
                          </h3>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            report.type === 'prescription' ? 'bg-indigo-50 text-indigo-800' : 'bg-medical-teal-50 text-medical-teal-800'
                          }`}>
                            {report.type === 'prescription' ? 'Rx' : 'Lab'}
                          </span>
                        </div>

                        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                          {report.summary}
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[11px] text-stone-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <strong className="text-stone-500 font-mono">{report.date}</strong>
                          </span>
                          <span>File: <strong className="text-stone-500 font-mono">{report.fileName}</strong></span>
                          {flagCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-100">
                              <AlertTriangle className="w-3 h-3" />
                              {flagCount} Discuss Point{flagCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: action buttons */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                      
                      <button
                        onClick={() => onSelectReport(report)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-medical-teal-700 hover:bg-medical-teal-800 text-white text-xs font-semibold rounded-lg shadow transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Examine Analysis
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteReport(report.id)}
                        className="inline-flex items-center justify-center p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
