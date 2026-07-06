/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MilestoneRide } from '../types';
import { MapPin, Plus, Calendar, Compass, Mountain, Heart, Trash2 } from 'lucide-react';

interface MilestoneScrapbookProps {
  milestones: MilestoneRide[];
  onAddMilestone: (milestone: MilestoneRide) => void;
  onDeleteMilestone: (id: string) => void;
}

const PALETTE_VARS = [
  { label: 'Gold', value: 'var(--marigold)' },
  { label: 'Blue', value: 'var(--indigo)' },
  { label: 'Red', value: 'var(--brick)' },
  { label: 'Green', value: 'var(--moss)' },
];

export default function MilestoneScrapbook({
  milestones,
  onAddMilestone,
  onDeleteMilestone,
}: MilestoneScrapbookProps) {
  // Add dialog state
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [altitude, setAltitude] = useState('');
  const [date, setDate] = useState('');
  const [vibe, setVibe] = useState('');
  const [description, setDescription] = useState('');
  const [accentColor, setAccentColor] = useState('var(--marigold)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;

    const newMilestone: MilestoneRide = {
      id: `m-custom-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      altitude: altitude.trim() || undefined,
      date: date || new Date().toISOString().split('T')[0],
      vibe: vibe.trim() || 'Cozy Ride',
      description: description.trim(),
      accentColor,
    };

    onAddMilestone(newMilestone);

    // Reset Form
    setTitle('');
    setLocation('');
    setAltitude('');
    setDate('');
    setVibe('');
    setDescription('');
    setAccentColor('var(--marigold)');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--ink)]/15 pb-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-[var(--ink)]">
            Our Scrapbook of Trails & Rides
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-1">
            Every dusty trail, dawn ascent, and slow sunset commute recorded on our trusted scooter.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="self-start sm:self-center bg-[var(--paper-deep)] hover:bg-[var(--ink)] hover:text-[var(--paper)] text-[var(--ink)] text-[10px] uppercase font-bold tracking-[0.2em] py-2 px-4 border border-[var(--ink)] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
        >
          {showAddForm ? 'Close Editor' : 'Record a New Ride'}
          <Plus size={14} className={`transform transition-transform duration-200 ${showAddForm ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* Slide-out or Dropdown adding form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--paper-deep)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-md transition-all duration-300 space-y-4 animate-fade-in"
        >
          <div className="flex items-center gap-2 border-b border-[var(--ink)]/10 pb-2 mb-2">
            <Compass className="text-[var(--indigo)] animate-spin-slow" size={16} />
            <h3 className="font-display text-lg font-medium">Record a New Journey</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Ride / Milestone Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Sunrise over Phulchowki Peak"
                required
                className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g., Lalitpur Foothills, Nepal"
                required
                className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
              />
            </div>

            {/* Altitude & Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Altitude (optional)
                </label>
                <input
                  type="text"
                  value={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                  placeholder="E.g., 2,760m"
                  className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                />
              </div>
            </div>

            {/* Vibe & Accent Scheme */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Vibe Descriptor
                </label>
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  placeholder="E.g., Cozy & Cold, Misty Ascent"
                  className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Scrapbook Color Code
                </label>
                <div className="flex items-center h-8 gap-2">
                  {PALETTE_VARS.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setAccentColor(col.value)}
                      className={`w-5 h-5 rounded-full border border-[var(--ink)] cursor-pointer transition-transform relative`}
                      style={{ backgroundColor: col.value }}
                    >
                      {accentColor === col.value && (
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-[var(--paper)]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
              Your Diary / Experience
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write about the cold wind in your face, the laughter, the hot tea, or how the road felt..."
              required
              rows={3}
              className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2.5 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-transparent hover:underline text-xs text-[var(--ink-soft)] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--ink)] hover:bg-[var(--brick)] hover:text-[var(--paper)] text-[var(--paper)] text-[10px] uppercase font-bold tracking-[0.2em] py-2 px-5 border border-[var(--ink)] transition-colors duration-300 cursor-pointer"
            >
              Paste Into Scrapbook
            </button>
          </div>
        </form>
      )}

      {/* Grid of Polaroid memory cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="bg-[var(--paper)] border-2 border-[var(--ink)] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
            style={{
              borderLeftWidth: '6px',
              borderLeftColor: milestone.accentColor,
            }}
          >
            {/* Stamp/Badge decoration */}
            <div
              className="absolute right-4 top-4 border border-[var(--ink)]/20 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity"
              style={{
                color: milestone.accentColor,
                borderColor: milestone.accentColor,
                transform: 'rotate(4deg)',
              }}
            >
              {milestone.vibe}
            </div>

            <div>
              {/* Card Meta details */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-[var(--ink-soft)] mb-2 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="opacity-70" />
                  {milestone.date}
                </span>
                {milestone.altitude && (
                  <span className="flex items-center gap-1">
                    <Mountain size={12} className="opacity-70" />
                    {milestone.altitude}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-medium text-[var(--ink)] mb-2.5">
                {milestone.title}
              </h3>

              {/* Description body */}
              <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-sans mb-4">
                {milestone.description}
              </p>
            </div>

            {/* Card Footer details */}
            <div className="flex items-center justify-between border-t border-[var(--ink)]/10 pt-3 mt-2">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--ink-soft)]">
                <MapPin size={12} style={{ color: milestone.accentColor }} />
                {milestone.location}
              </span>

              <div className="flex items-center gap-2">
                {/* Heart toggle for affection */}
                <span className="text-[10px] italic text-[var(--ink-soft)]/50 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <Heart size={10} className="text-[var(--brick)] fill-[var(--brick)]" /> Loved ride
                </span>

                {/* Trash button for custom milestones */}
                {milestone.id.startsWith('m-custom-') && (
                  <button
                    onClick={() => onDeleteMilestone(milestone.id)}
                    className="text-red-700/60 hover:text-red-700 hover:scale-105 transition-all cursor-pointer p-1"
                    title="Remove from scrapbook"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
