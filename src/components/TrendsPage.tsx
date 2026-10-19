import React, { useState } from 'react';
import { TRENDS_HISTORY } from '../mockData';
import { TrendingDown, Calendar, ShieldCheck, HelpCircle, Activity, Info } from 'lucide-react';
import Disclaimer from './Disclaimer';

export default function TrendsPage() {
  const [selectedParam, setSelectedParam] = useState<'hba1c' | 'ldl' | 'fastingGlucose'>('hba1c');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Configuration for each chart type
  const chartConfigs = {
    hba1c: {
      title: "HbA1c (Hemoglobin A1c) Trend",
      unit: "%",
      description: "Measures your average blood sugar levels over the past 3 months. Essential for tracking diabetes management.",
      minNormal: 0,
      maxNormal: 5.6,
      normalZoneText: "Normal (< 5.7%)",
      targetText: "Target: Under 6.5% (with management)",
      history: TRENDS_HISTORY.hba1c,
      minY: 5.0,
      maxY: 8.0,
      gradientColor: "text-medical-teal-600",
      strokeColor: "#0d7c7c",
      fillColor: "rgba(13, 124, 124, 0.1)",
      zoneFill: "rgba(34, 197, 94, 0.05)", // green-500/5
    },
    ldl: {
      title: "LDL Cholesterol Trend",
      unit: "mg/dL",
      description: "Often called 'bad' cholesterol. Lowering this value protects blood vessels from arterial plaque.",
      minNormal: 0,
      maxNormal: 100,
      normalZoneText: "Optimal (< 100 mg/dL)",
      targetText: "Borderline High: 100-129, High: > 130",
      history: TRENDS_HISTORY.ldl,
      minY: 80,
      maxY: 180,
      gradientColor: "text-amber-600",
      strokeColor: "#d97706",
      fillColor: "rgba(217, 119, 6, 0.1)",
      zoneFill: "rgba(34, 197, 94, 0.05)",
    },
    fastingGlucose: {
      title: "Fasting Blood Glucose Trend",
      unit: "mg/dL",
      description: "Blood sugar level measured after an overnight fast. Helps screen for insulin resistance.",
      minNormal: 70,
      maxNormal: 99,
      normalZoneText: "Healthy (70 - 99 mg/dL)",
      targetText: "Prediabetes: 100-125, Diabetes: >= 126",
      history: TRENDS_HISTORY.fastingGlucose,
      minY: 60,
      maxY: 160,
      gradientColor: "text-medical-teal-600",
      strokeColor: "#0d7c7c",
      fillColor: "rgba(13, 124, 124, 0.1)",
      zoneFill: "rgba(34, 197, 94, 0.05)",
    }
  };

  const current = chartConfigs[selectedParam];

  // Map coordinates in SVG
  const width = 500;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const points = current.history.map((pt, index) => {
    // scale X across the 3 indices
    const xRatio = current.history.length > 1 ? index / (current.history.length - 1) : 0.5;
    const x = paddingLeft + xRatio * (width - paddingLeft - paddingRight);

    // scale Y between minY and maxY
    const yRatio = (pt.value - current.minY) / (current.maxY - current.minY);
    const y = height - paddingBottom - yRatio * (height - paddingTop - paddingBottom);

    return { x, y, value: pt.value, label: pt.label, date: pt.date };
  });

  // Calculate coordinates for normal reference zone
  const yNormalMinRatio = (current.minNormal - current.minY) / (current.maxY - current.minY);
  const yNormalMin = height - paddingBottom - Math.max(0, yNormalMinRatio) * (height - paddingTop - paddingBottom);

  const yNormalMaxRatio = (current.maxNormal - current.minY) / (current.maxY - current.minY);
  const yNormalMax = height - paddingBottom - Math.min(1, yNormalMaxRatio) * (height - paddingTop - paddingBottom);

  // SVG Line path string
  let linePath = "";
  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      linePath += ` L ${points[i].x} ${points[i].y}`;
    }
  }

  // Shaded area path
  let areaPath = "";
  if (points.length > 0) {
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
  }

  return (
    <div id="trends-page" className="space-y-6 max-w-4xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-medical-teal-950 font-bold">Biomarker Trend Analysis</h1>
          <p className="text-sm text-stone-500 mt-1">Monitor how your laboratory metrics evolve across multiple visits.</p>
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-warm-cream-100 p-1 rounded-lg border border-warm-cream-200 shrink-0">
          <button
            onClick={() => setSelectedParam('hba1c')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${selectedParam === 'hba1c' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            HbA1c
          </button>
          <button
            onClick={() => setSelectedParam('ldl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${selectedParam === 'ldl' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            LDL Cholesterol
          </button>
          <button
            onClick={() => setSelectedParam('fastingGlucose')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${selectedParam === 'fastingGlucose' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
          >
            Fasting Glucose
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        
        {/* Chart View */}
        <div className="md:col-span-8 bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-900">{current.title}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{current.description}</p>
            </div>
            
            {/* Trend Indicator */}
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-1 rounded-md text-xs font-semibold border border-emerald-100">
              <TrendingDown className="w-3.5 h-3.5" />
              Gradually Decreasing (Good)
            </div>
          </div>

          {/* SVG Canvas with Responsive Wrapper */}
          <div className="relative w-full overflow-hidden mt-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
              
              {/* Y-Axis Guidelines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const yVal = current.minY + ratio * (current.maxY - current.minY);
                const y = height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
                return (
                  <g key={i} className="opacity-40">
                    <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e5e5e0" strokeWidth="1" strokeDasharray="3,3" />
                    <text x={paddingLeft - 8} y={y + 4} textAnchor="end" className="fill-stone-400 font-mono text-[9px]">
                      {yVal.toFixed(selectedParam === 'hba1c' ? 1 : 0)}
                    </text>
                  </g>
                );
              })}

              {/* Normal Zone Reference Range */}
              {yNormalMax < height && (
                <rect
                  x={paddingLeft}
                  y={Math.min(yNormalMax, yNormalMin)}
                  width={width - paddingLeft - paddingRight}
                  height={Math.abs(yNormalMin - yNormalMax)}
                  fill={current.zoneFill}
                  className="opacity-75"
                />
              )}

              {/* Normal Zone Text Label */}
              <text x={width - paddingRight - 8} y={yNormalMin - 4} className="fill-emerald-600/80 font-sans text-[8px] font-medium text-right" textAnchor="end">
                {current.normalZoneText}
              </text>

              {/* Trend Shaded Area */}
              {areaPath && <path d={areaPath} fill={current.fillColor} />}

              {/* Trend Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke={current.strokeColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* X-Axis Dates */}
              {points.map((pt, idx) => (
                <text key={idx} x={pt.x} y={height - paddingBottom + 16} textAnchor="middle" className="fill-stone-400 font-mono text-[9px] font-medium">
                  {pt.label}
                </text>
              ))}

              {/* Interactive Dots */}
              {points.map((pt, idx) => {
                const isHovered = hoveredPoint === idx;
                const isOut = pt.value > current.maxNormal || pt.value < current.minNormal;
                return (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulsing halo on hover */}
                    {isHovered && (
                      <circle cx={pt.x} cy={pt.y} r="10" fill={current.strokeColor} className="opacity-20 animate-ping" />
                    )}
                    
                    {/* Inner core circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? "6" : "4.5"}
                      fill={isOut ? "#ef4444" : current.strokeColor}
                      stroke="white"
                      strokeWidth="1.5"
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex gap-2 justify-end items-center text-[10px] text-stone-400 font-mono mt-2 pr-4">
            <span className="w-2 h-2 bg-emerald-500/20 rounded border border-emerald-500/50" />
            <span>Optimal Range Shading</span>
            <span className="w-2 h-2 bg-red-500 rounded-full ml-2" />
            <span>Out of Range Value</span>
          </div>
        </div>

        {/* Right Column: Trend Details & Insights */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-medical-teal-600" />
              Visit Breakdown
            </h4>

            <div className="space-y-2.5">
              {current.history.map((pt, idx) => {
                const isOutOfLimit = pt.value > current.maxNormal || pt.value < current.minNormal;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs flex justify-between items-center transition ${
                      hoveredPoint === idx ? 'bg-warm-cream-50 border-medical-teal-600/30 shadow-sm' : 'bg-stone-50/50 border-stone-100'
                    }`}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-stone-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {pt.label}
                      </div>
                      <div className="text-[10px] text-stone-400">{pt.date}</div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900 text-sm">
                        {pt.value} {current.unit}
                      </div>
                      {isOutOfLimit ? (
                        <span className="inline-block text-[9px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-full border border-amber-100">
                          Above Limit
                        </span>
                      ) : (
                        <span className="inline-block text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-100">
                          Optimal
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinician Advice Tips */}
          <div className="bg-warm-cream-50 border border-warm-cream-200 p-5 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-stone-800 font-serif flex items-center gap-1">
              <Info className="w-4 h-4 text-medical-teal-700" />
              Sustained Progress Advice
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your markers show a very favorable decline. Lowering HbA1c from 7.2% to 6.2% correlates with a significant reduction in long-term diabetes risks. 
            </p>
            <p className="text-xs text-stone-600 leading-relaxed font-semibold">
              Questions to ask your practitioner:
            </p>
            <ul className="text-xs text-stone-600 list-disc pl-4 space-y-1">
              <li>"Since my HbA1c is now at 6.2%, is my current Metformin dosage still optimal?"</li>
              <li>"Do we need to schedule a routine blood draw in 3 months or 6 months?"</li>
            </ul>
          </div>
        </div>

      </div>

      <Disclaimer />
    </div>
  );
}
