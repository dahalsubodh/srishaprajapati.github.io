/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PrayerFlag } from '../types';
import { Compass, Sparkles, Heart } from 'lucide-react';

interface BlessingCardProps {
  flag: PrayerFlag;
  onClose: () => void;
}

export default function BlessingCard({ flag, onClose }: BlessingCardProps) {
  return (
    <div
      className="bg-[var(--paper-deep)] border-2 border-[var(--ink)] rounded-2xl p-6 relative overflow-hidden animate-fade-in shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        borderTopWidth: '8px',
        borderTopColor: flag.color,
      }}
    >
      {/* Background Tibetan Watermark */}
      <div 
        className="absolute right-[-20px] bottom-[-20px] font-sans font-bold opacity-5 text-9xl select-none pointer-events-none"
        style={{ color: flag.color }}
      >
        {flag.character}
      </div>

      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-[var(--ink)] font-bold text-xl shadow-inner"
            style={{ backgroundColor: flag.color }}
          >
            {flag.character}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--ink-soft)] block">
              Active Prayer Blessing
            </span>
            <h3 className="font-display text-xl font-medium text-[var(--ink)]">
              {flag.word}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--ink)] hover:underline cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Flag specifics */}
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-b border-[var(--ink)]/10 py-3 mb-4">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--ink-soft)] opacity-70 block mb-0.5">
            Symbolizes
          </span>
          <span className="text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
            <Compass size={12} style={{ color: flag.color }} />
            {flag.translation}
          </span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--ink-soft)] opacity-70 block mb-0.5">
            Tibetan Character
          </span>
          <span className="text-xs font-mono font-bold text-[var(--ink)] flex items-center gap-1.5">
            <Sparkles size={12} style={{ color: flag.color }} />
            {flag.character} ({flag.word.split(' ')[0]})
          </span>
        </div>
      </div>

      {/* Blessing body */}
      <div className="relative">
        <p className="text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed font-sans italic">
          "{flag.blessing}"
        </p>
      </div>

      {/* Decorative stamp bottom-right */}
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-[var(--ink)]/5">
        <span className="text-[10px] text-[var(--ink-soft)]/50 font-bold tracking-wider uppercase flex items-center gap-1">
          <Heart size={10} className="text-[var(--brick)] fill-[var(--brick)]" /> Windhorse Blessing
        </span>
        <span className="text-[10px] text-[var(--ink-soft)]/60 italic font-medium">
          Set free on the peak winds
        </span>
      </div>
    </div>
  );
}
