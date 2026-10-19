export type ReportType = 'prescription' | 'lab_report';

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface UserProfile {
  email: string;
  name: string;
  allergies: string[];
  knownConditions: string[];
  emergencyContact: EmergencyContact;
}

export interface MedicationExtraction {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  plainLanguageExplanation: string;
  precautions: string[];
  sideEffects: string[];
  fdaLabelWarnings?: string;
  rxNormStatus?: string;
}

export interface LabValueExtraction {
  id: string;
  parameterName: string;
  extractedValue: number;
  unit: string;
  standardRange: string;
  minNormal?: number;
  maxNormal?: number;
  isOutOfRange: boolean;
  status: 'high' | 'low' | 'normal';
  plainLanguageExplanation: string;
}

export interface ReportFlag {
  id: string;
  severity: 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  itemReference: string;
  actionableQuestion: string; // "What to ask your doctor"
}

export interface DocumentReport {
  id: string;
  date: string;
  fileName: string;
  title: string;
  type: ReportType;
  summary: string;
  metadata: {
    doctor?: string;
    facility?: string;
    dateOfService?: string;
  };
  medications: MedicationExtraction[];
  labValues: LabValueExtraction[];
  flags: ReportFlag[];
  generalNotes: string;
}
