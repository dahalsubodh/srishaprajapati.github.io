/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRAYER_FLAGS } from '../data';
import { PrayerFlag } from '../types';

interface PrayerFlagRowProps {
  onSelectFlag: (flag: PrayerFlag) => void;
  activeFlagId: string | null;
}

export default function PrayerFlagRow({ onSelectFlag, activeFlagId }: PrayerFlagRowProps) {
  const [hoveredFlag, setHoveredFlag] = useState<PrayerFlag | null>(null);

  // Map of index to flag mapping so we can duplicate the 5-color sequence across the 10 flags on the string
  const getFlagForIndex = (index: number): PrayerFlag => {
    return PRAYER_FLAGS[index % PRAYER_FLAGS.length];
  };

  const flagPositions = [
    { x: 60, y: 26, delay: '0s' },
    { x: 140, y: 34, delay: '0.35s' },
    { x: 220, y: 38, delay: '0.7s' },
    { x: 300, y: 36, delay: '1.05s' },
    { x: 380, y: 30, delay: '1.4s' },
    { x: 620, y: 30, delay: '0.2s' },
    { x: 700, y: 36, delay: '0.55s' },
    { x: 780, y: 38, delay: '0.9s' },
    { x: 860, y: 34, delay: '1.25s' },
    { x: 930, y: 28, delay: '1.6s' },
  ];

  return (
    <div className="relative w-full z-30 select-none">
      {/* Prayer flag string SVG */}
      <div className="flag-line h-[70px] md:h-[90px]" aria-label="Interactive Tibetan Prayer Flags">
        <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="w-full h-full">
          <path
            className="flag-string"
            d="M0,20 Q250,55 500,20 T1000,20"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
            opacity="0.3"
          />
          {flagPositions.map((pos, idx) => {
            const flag = getFlagForIndex(idx);
            const isSelected = activeFlagId === flag.id;
            
            return (
              <g key={idx}>
                <rect
                  className={`flag transition-all duration-300 ${isSelected ? 'flag-active' : ''}`}
                  x={pos.x}
                  y={pos.y}
                  width="28"
                  height="36"
                  rx="1"
                  style={{
                    ['--c' as any]: flag.color,
                    animationDelay: pos.delay,
                  }}
                  onClick={() => onSelectFlag(flag)}
                  onMouseEnter={() => setHoveredFlag(flag)}
                  onMouseLeave={() => setHoveredFlag(null)}
                />
                {/* Micro Tibetan syllable on the flag */}
                <text
                  x={pos.x + 14}
                  y={pos.y + 22}
                  fontSize="11"
                  fontFamily="sans-serif"
                  fill="var(--ink)"
                  textAnchor="middle"
                  opacity="0.75"
                  className="pointer-events-none select-none font-medium"
                >
                  {flag.character}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating small tooltip info on hover */}
      {hoveredFlag && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 bg-[var(--paper-deep)] border border-[var(--ink)] text-[var(--ink)] text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 animate-fade-in pointer-events-none z-40 transition-all"
          style={{ fontFamily: 'var(--sans)' }}
        >
          <span className="font-bold text-[13px]" style={{ color: hoveredFlag.color }}>{hoveredFlag.character}</span>
          <span className="font-semibold">{hoveredFlag.word}</span>
          <span className="opacity-60">|</span>
          <span className="italic">{hoveredFlag.translation}</span>
        </div>
      )}
    </div>
  );
}
