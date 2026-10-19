import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, ShieldAlert, Plus, Trash2, Save, Heart, Check } from 'lucide-react';
import Disclaimer from './Disclaimer';

interface ProfilePageProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export default function ProfilePage({ profile, onUpdateProfile }: ProfilePageProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  
  // Emergency contact state
  const [contactName, setContactName] = useState(profile.emergencyContact.name);
  const [contactPhone, setContactPhone] = useState(profile.emergencyContact.phone);
  const [contactRelation, setContactRelation] = useState(profile.emergencyContact.relation);

  const [savedStatus, setSavedStatus] = useState(false);

  const handleSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      email,
      emergencyContact: {
        name: contactName,
        phone: contactPhone,
        relation: contactRelation
      }
    });
    triggerSavedIndicator();
  };

  const triggerSavedIndicator = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !profile.allergies.includes(newAllergy.trim())) {
      onUpdateProfile({
        ...profile,
        allergies: [...profile.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
      triggerSavedIndicator();
    }
  };

  const removeAllergy = (allergyToRemove: string) => {
    onUpdateProfile({
      ...profile,
      allergies: profile.allergies.filter(a => a !== allergyToRemove)
    });
    triggerSavedIndicator();
  };

  const addCondition = () => {
    if (newCondition.trim() && !profile.knownConditions.includes(newCondition.trim())) {
      onUpdateProfile({
        ...profile,
        knownConditions: [...profile.knownConditions, newCondition.trim()]
      });
      setNewCondition('');
      triggerSavedIndicator();
    }
  };

  const removeCondition = (conditionToRemove: string) => {
    onUpdateProfile({
      ...profile,
      knownConditions: profile.knownConditions.filter(c => c !== conditionToRemove)
    });
    triggerSavedIndicator();
  };

  return (
    <div id="profile-page" className="space-y-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-serif text-medical-teal-950 font-bold">Your Health Profile & Safety Guards</h1>
        <p className="text-sm text-stone-500 mt-1">Configure your active allergies and healthcare details. This information helps Aesculo scan for drug conflicts or out-of-range warnings.</p>
      </div>

      {savedStatus && (
        <div id="save-banner" className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          Profile updated successfully and safety flags synchronized.
        </div>
      )}

      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Left Column: Basic Info & Emergency Contact */}
        <div className="md:col-span-7 space-y-6">
          <form onSubmit={handleSaveBasic} className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-serif text-stone-900 border-b border-warm-cream-100 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-medical-teal-600" />
              General Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm bg-warm-cream-50/50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-medical-teal-600 focus:border-medical-teal-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm bg-warm-cream-50/50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
                  required
                />
              </div>
            </div>

            {/* Emergency Contact fields */}
            <div className="pt-4 border-t border-warm-cream-100 space-y-4">
              <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                Emergency Contact
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-sm bg-warm-cream-50/50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={contactRelation}
                    onChange={(e) => setContactRelation(e.target.value)}
                    placeholder="e.g. Spouse, Parent"
                    className="w-full text-sm bg-warm-cream-50/50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full text-sm bg-warm-cream-50/50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
                />
              </div>
            </div>

            <button
              id="save-profile-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-medical-teal-700 hover:bg-medical-teal-800 text-white text-xs font-medium rounded-lg transition"
            >
              <Save className="w-4 h-4" />
              Save Account Details
            </button>
          </form>
        </div>

        {/* Right Column: Allergies & Conditions */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Allergy Panel */}
          <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-warm-cream-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                Drug Allergies
              </h3>
              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono">
                {profile.allergies.length} Listed
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Listing drug allergies allows the scanner to flag severe allergen risks if matching medications are ever processed.
            </p>

            {/* List of active allergies */}
            <div className="space-y-1.5 min-h-[80px]">
              {profile.allergies.length === 0 ? (
                <div className="text-center py-6 bg-stone-50 rounded-lg text-xs text-stone-400">
                  No active allergies registered.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.allergies.map((allergy) => (
                    <div
                      key={allergy}
                      className="inline-flex items-center gap-1.5 bg-red-50 text-red-800 border border-red-200/60 px-2.5 py-1 rounded-full text-xs"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        onClick={() => removeAllergy(allergy)}
                        className="text-red-500 hover:text-red-800 shrink-0 cursor-pointer"
                        title={`Remove ${allergy}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add allergy control */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Penicillin, Codeine"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
                className="flex-1 text-xs bg-warm-cream-50/50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
              />
              <button
                type="button"
                onClick={addAllergy}
                className="p-1.5 bg-medical-teal-100 hover:bg-medical-teal-200 text-medical-teal-800 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conditions Panel */}
          <div className="bg-white p-6 rounded-xl border border-warm-cream-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-warm-cream-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-medical-teal-600" />
                Chronic Conditions
              </h3>
              <span className="text-[10px] bg-medical-teal-50 text-medical-teal-800 border border-medical-teal-200 px-2 py-0.5 rounded-full font-mono">
                {profile.knownConditions.length} Listed
              </span>
            </div>

            <p className="text-xs text-stone-500">
              Declaring active conditions helps contextualize out-of-range lab results and general suggestions.
            </p>

            <div className="space-y-1.5 min-h-[80px]">
              {profile.knownConditions.length === 0 ? (
                <div className="text-center py-6 bg-stone-50 rounded-lg text-xs text-stone-400">
                  No active conditions registered.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.knownConditions.map((condition) => (
                    <div
                      key={condition}
                      className="inline-flex items-center gap-1.5 bg-medical-teal-50 text-medical-teal-800 border border-medical-teal-200/55 px-2.5 py-1 rounded-full text-xs"
                    >
                      <span>{condition}</span>
                      <button
                        type="button"
                        onClick={() => removeCondition(condition)}
                        className="text-medical-teal-600 hover:text-medical-teal-900 shrink-0 cursor-pointer"
                        title={`Remove ${condition}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add condition control */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Hypertension, Asthma"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCondition()}
                className="flex-1 text-xs bg-warm-cream-50/50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-medical-teal-600"
              />
              <button
                type="button"
                onClick={addCondition}
                className="p-1.5 bg-medical-teal-100 hover:bg-medical-teal-200 text-medical-teal-800 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      <Disclaimer />
    </div>
  );
}
