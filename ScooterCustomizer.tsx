/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BalloonMemory } from '../types';
import { Sparkles, MessageCircle, Heart, Check } from 'lucide-react';

interface ScooterCustomizerProps {
  balloons: BalloonMemory[];
  onAddBalloon: (balloon: BalloonMemory) => void;
  onRemoveBalloon: (id: string) => void;
}

const COLOR_PALETTE = [
  { name: 'Marigold Gold', value: 'var(--marigold)', hoverClass: 'bg-[var(--marigold)]' },
  { name: 'Himalayan Blue', value: 'var(--indigo)', hoverClass: 'bg-[var(--indigo)]' },
  { name: 'Brick Red', value: 'var(--brick)', hoverClass: 'bg-[var(--brick)]' },
  { name: 'Forest Moss', value: 'var(--moss)', hoverClass: 'bg-[var(--moss)]' },
];

export default function ScooterCustomizer({
  balloons,
  onAddBalloon,
  onRemoveBalloon,
}: ScooterCustomizerProps) {
  // Customizable aesthetics
  const [scooterColor, setScooterColor] = useState('var(--marigold)');
  const [riderJacketColor, setRiderJacketColor] = useState('var(--brick)');
  const [passengerDressColor, setPassengerDressColor] = useState('var(--indigo)');

  // Form states
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('Us');
  const [balloonColor, setBalloonColor] = useState('var(--brick)');
  const [balloonCount, setBalloonCount] = useState(0);

  // Active balloon message being inspected
  const [inspectedBalloon, setInspectedBalloon] = useState<BalloonMemory | null>(null);

  const handleLaunchBalloon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Distribute balloons slightly differently each time
    const count = balloonCount + 1;
    setBalloonCount(count);

    // Calculate dynamic coordinates so they fan out neatly
    const angleRad = (count * 45 * Math.PI) / 180;
    const distance = 60 + (count % 3) * 15;
    const xOffset = Math.sin(angleRad) * distance;
    const yOffset = -70 - Math.cos(angleRad) * 20 - (count % 4) * 10;

    const newBalloon: BalloonMemory = {
      id: `b-custom-${Date.now()}`,
      message: message.trim(),
      sender: sender.trim() || 'Us',
      color: balloonColor,
      xOffset: Math.round(xOffset),
      yOffset: Math.round(yOffset),
      scale: 0.95 - (count % 3) * 0.05,
      bobDelay: `${(count * 0.3) % 1.5}s`,
    };

    onAddBalloon(newBalloon);
    setMessage('');
    // Automatically inspect the newly added balloon briefly
    setInspectedBalloon(newBalloon);
    setTimeout(() => {
      setInspectedBalloon((prev) => (prev?.id === newBalloon.id ? null : prev));
    }, 4500);
  };

  return (
    <div className="bg-[var(--paper-deep)] border border-[var(--ink)] rounded-2xl p-6 shadow-sm flex flex-col md:grid md:grid-cols-12 gap-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
        <Heart size={200} className="text-[var(--ink)]" />
      </div>

      {/* SVG Canvas column (Left 7 cols on desktop) */}
      <div className="md:col-span-7 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-[380px] aspect-[340/280] relative">
          {/* Main customized SVG */}
          <svg
            viewBox="0 0 340 280"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full select-none"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            {/* Scooter base shadows & road trace */}
            <path
              d="M80 252 L260 252"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeDasharray="4 8"
              opacity="0.3"
            />

            {/* Scooter body - dynamically colored */}
            <path
              d="M120 220 C120 200, 150 190, 180 195 L220 205 C240 210, 245 230, 240 245 L130 245 C120 245, 120 230, 120 220"
              fill={scooterColor}
              stroke="var(--ink)"
              strokeWidth="1.6"
              className="transition-colors duration-500"
            />
            {/* Front head mask & splash */}
            <path
              d="M120 210 L110 170"
              stroke="var(--ink)"
              strokeWidth="1.8"
            />
            <circle
              cx="110"
              cy="170"
              r="6.5"
              fill={scooterColor}
              stroke="var(--ink)"
              strokeWidth="1.2"
              className="transition-colors duration-500"
            />

            {/* Wheels */}
            <circle cx="145" cy="245" r="18" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
            <circle cx="145" cy="245" r="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.2" />
            
            <circle cx="225" cy="245" r="18" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
            <circle cx="225" cy="245" r="8" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.2" />

            {/* Scooter exhaust & mechanical lines */}
            <path d="M230 238 L255 232" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
            <path d="M165 245 L205 245" stroke="var(--ink)" strokeWidth="1.5" />

            {/* Rider (Subodh) */}
            <circle cx="155" cy="155" r="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
            <path
              d="M150 167 L145 200 L165 200 L160 167"
              fill={riderJacketColor}
              stroke="var(--ink)"
              strokeWidth="1.4"
              opacity="0.9"
              className="transition-colors duration-500"
            />
            {/* Rider arms / grip */}
            <path
              d="M155 143 Q140 143, 140 155"
              stroke="var(--ink)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Passenger, riding pillion (Srisha) */}
            <path
              d="M220 185 C240 185, 260 170, 280 170"
              stroke="var(--ink)"
              strokeWidth="1.2"
              strokeDasharray="2.5 2.5"
              fill="none"
            />
            <circle cx="285" cy="168" r="10.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
            <path
              d="M278 178 L294 178 C302 178, 308 190, 305 205 L272 205 C268 190, 272 178, 278 178"
              fill={passengerDressColor}
              stroke="var(--ink)"
              strokeWidth="1.4"
              opacity="0.85"
              className="transition-colors duration-500"
            />
            {/* Connecting hug arm */}
            <path
              d="M275 180 Q210 180, 160 182"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Dynamic Memory Balloons trailing behind */}
            {balloons.map((balloon) => {
              // Anchor is pillion seat at around (280, 170)
              const lineX2 = 280 + balloon.xOffset;
              const lineY2 = 170 + balloon.yOffset;
              const isInspected = inspectedBalloon?.id === balloon.id;

              return (
                <g
                  key={balloon.id}
                  className="balloon"
                  style={{
                    ['--d' as any]: balloon.bobDelay,
                  }}
                  onClick={() => setInspectedBalloon(balloon)}
                >
                  {/* Balloon String */}
                  <line
                    x1="280"
                    y1="168"
                    x2={lineX2}
                    y2={lineY2 + 12}
                    stroke="var(--ink)"
                    strokeWidth="0.6"
                    opacity="0.6"
                  />
                  {/* Balloon Body */}
                  <ellipse
                    cx={lineX2}
                    cy={lineY2}
                    rx={10 * balloon.scale}
                    ry={14 * balloon.scale}
                    fill={balloon.color}
                    stroke="var(--ink)"
                    strokeWidth={isInspected ? 2 : 1.2}
                    opacity="0.95"
                    style={{
                      filter: isInspected ? 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' : 'none',
                    }}
                  />
                  {/* Micro heart decoration inside balloon if selected */}
                  {isInspected && (
                    <path
                      d={`M${lineX2} ${lineY2 + 2} Q${lineX2 - 4} ${lineY2 - 3}, ${lineX2} ${lineY2 - 6} Q${lineX2 + 4} ${lineY2 - 3}, ${lineX2} ${lineY2 + 2}`}
                      fill="var(--paper)"
                      opacity="0.8"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Real-time speech bubble for inspected balloon */}
          {inspectedBalloon && (
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 bg-[var(--paper)] border-2 border-[var(--ink)] rounded-xl p-3 shadow-md max-w-[220px] text-center z-20 animate-fade-in">
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--paper)] border-r-2 border-b-2 border-[var(--ink)] rotate-45"></div>
              <p className="text-xs text-[var(--ink)] font-semibold leading-relaxed" style={{ fontFamily: 'var(--sans)' }}>
                "{inspectedBalloon.message}"
              </p>
              <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[var(--ink)]/10 text-[10px] font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                <span>By {inspectedBalloon.sender}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBalloon(inspectedBalloon.id);
                    setInspectedBalloon(null);
                  }}
                  className="text-red-700 hover:text-red-900 transition-colors cursor-pointer px-1"
                  title="Pop balloon"
                >
                  Pop
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic color customize sliders */}
        <div className="w-full mt-4 border-t border-[var(--ink)]/10 pt-4">
          <h4 className="text-[11px] uppercase tracking-widest font-bold text-[var(--ink-soft)] mb-3 text-center">
            Scooter & Attire Crafting Swatches
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {/* Scooter */}
            <div>
              <span className="text-[10px] font-bold uppercase block text-center mb-1 text-[var(--ink-soft)]">Scooter</span>
              <div className="flex items-center justify-center gap-1.5">
                {COLOR_PALETTE.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setScooterColor(col.value)}
                    className={`w-5 h-5 rounded-full border border-[var(--ink)] transition-transform cursor-pointer relative flex items-center justify-center ${col.hoverClass} ${
                      scooterColor === col.value ? 'scale-115 ring-2 ring-[var(--indigo)] ring-offset-1' : 'hover:scale-110'
                    }`}
                  >
                    {scooterColor === col.value && <Check size={8} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rider */}
            <div>
              <span className="text-[10px] font-bold uppercase block text-center mb-1 text-[var(--ink-soft)]">Rider</span>
              <div className="flex items-center justify-center gap-1.5">
                {COLOR_PALETTE.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setRiderJacketColor(col.value)}
                    className={`w-5 h-5 rounded-full border border-[var(--ink)] transition-transform cursor-pointer relative flex items-center justify-center ${col.hoverClass} ${
                      riderJacketColor === col.value ? 'scale-115 ring-2 ring-[var(--indigo)] ring-offset-1' : 'hover:scale-110'
                    }`}
                  >
                    {riderJacketColor === col.value && <Check size={8} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Pillion */}
            <div>
              <span className="text-[10px] font-bold uppercase block text-center mb-1 text-[var(--ink-soft)]">Pillion</span>
              <div className="flex items-center justify-center gap-1.5">
                {COLOR_PALETTE.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setPassengerDressColor(col.value)}
                    className={`w-5 h-5 rounded-full border border-[var(--ink)] transition-transform cursor-pointer relative flex items-center justify-center ${col.hoverClass} ${
                      passengerDressColor === col.value ? 'scale-115 ring-2 ring-[var(--indigo)] ring-offset-1' : 'hover:scale-110'
                    }`}
                  >
                    {passengerDressColor === col.value && <Check size={8} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Launcher column (Right 5 cols on desktop) */}
      <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[var(--ink)]/15 pt-6 md:pt-0 md:pl-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[var(--marigold)]" />
            <h3 className="font-display text-lg font-medium text-[var(--ink)]">
              The Balloon Launcher
            </h3>
          </div>
          <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-4">
            Type a quiet memory, wish, or promise. Launch it into the sky to watch it float behind your scooter as a trailing keepsake forever.
          </p>

          <form onSubmit={handleLaunchBalloon} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Your Memory or Blessing
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={90}
                placeholder="E.g., Sunrise cardamom tea at Swayambhu..."
                className="w-full h-20 bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2.5 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--indigo)] resize-none"
                required
              />
              <span className="text-[9px] text-[var(--ink-soft)]/70 text-right block mt-0.5">
                {90 - message.length} characters remaining
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Who wrote this?
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  maxLength={12}
                  className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Balloon Color
                </label>
                <div className="flex items-center h-8 gap-1.5">
                  {COLOR_PALETTE.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setBalloonColor(col.value)}
                      className={`w-5 h-5 rounded-full border border-[var(--ink)] cursor-pointer relative transition-transform ${col.hoverClass} ${
                        balloonColor === col.value ? 'scale-115 ring-2 ring-[var(--indigo)] ring-offset-1' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--ink)] text-[var(--paper)] text-[10px] uppercase font-bold tracking-[0.25em] hover:bg-[var(--brick)] transition-colors duration-300 border border-[var(--ink)] flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <MessageCircle size={14} />
              Release Memory Balloon
            </button>
          </form>
        </div>

        {/* Quick state tally */}
        <div className="mt-6 pt-4 border-t border-[var(--ink)]/10 flex items-center justify-between text-[11px] text-[var(--ink-soft)] font-medium">
          <span className="flex items-center gap-1">
            <Heart size={12} className="text-[var(--brick)] fill-[var(--brick)]" />
            Keepsakes: {balloons.length} Floating
          </span>
          <span className="italic opacity-70">
            Click any balloon to pop or read
          </span>
        </div>
      </div>
    </div>
  );
}
