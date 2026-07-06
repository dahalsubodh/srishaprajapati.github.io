/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BalloonMemory, MilestoneRide, PrayerFlag } from './types';
import { INITIAL_BALLOONS, INITIAL_MILESTONES } from './data';
import PrayerFlagRow from './components/PrayerFlagRow';
import ScooterCustomizer from './components/ScooterCustomizer';
import MilestoneScrapbook from './components/MilestoneScrapbook';
import BlessingCard from './components/BlessingCard';
import DevotionBook from './components/DevotionBook';
import { Heart, Compass, Volume2, VolumeX, Mail } from 'lucide-react';

export default function App() {
  // Glow cursor track state
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [hasHover, setHasHover] = useState(false);

  // Core state synced to localStorage
  const [balloons, setBalloons] = useState<BalloonMemory[]>([]);
  const [milestones, setMilestones] = useState<MilestoneRide[]>([]);
  const [activeFlag, setActiveFlag] = useState<PrayerFlag | null>(null);

  // Soft hum ambient sound state (completely harmless simulated indicator or actual state)
  const [isMuted, setIsMuted] = useState(true);

  // Track pointer for ambient glow
  useEffect(() => {
    const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setHasHover(isHoverDevice);

    if (isHoverDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Initialize and load persistent data
  useEffect(() => {
    const storedBalloons = localStorage.getItem('srisha_subodh_balloons');
    if (storedBalloons) {
      setBalloons(JSON.parse(storedBalloons));
    } else {
      setBalloons(INITIAL_BALLOONS);
      localStorage.setItem('srisha_subodh_balloons', JSON.stringify(INITIAL_BALLOONS));
    }

    const storedMilestones = localStorage.getItem('srisha_subodh_milestones');
    if (storedMilestones) {
      setMilestones(JSON.parse(storedMilestones));
    } else {
      setMilestones(INITIAL_MILESTONES);
      localStorage.setItem('srisha_subodh_milestones', JSON.stringify(INITIAL_MILESTONES));
    }
  }, []);

  const handleAddBalloon = (newBalloon: BalloonMemory) => {
    const updated = [...balloons, newBalloon];
    setBalloons(updated);
    localStorage.setItem('srisha_subodh_balloons', JSON.stringify(updated));
  };

  const handleRemoveBalloon = (id: string) => {
    const updated = balloons.filter((b) => b.id !== id);
    setBalloons(updated);
    localStorage.setItem('srisha_subodh_balloons', JSON.stringify(updated));
  };

  const handleAddMilestone = (newMilestone: MilestoneRide) => {
    const updated = [newMilestone, ...milestones];
    setMilestones(updated);
    localStorage.setItem('srisha_subodh_milestones', JSON.stringify(updated));
  };

  const handleDeleteMilestone = (id: string) => {
    const updated = milestones.filter((m) => m.id !== id);
    setMilestones(updated);
    localStorage.setItem('srisha_subodh_milestones', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden font-sans selection:bg-[var(--marigold)] selection:text-[var(--paper)] pb-12">
      {/* Ambient grain overlay */}
      <div className="grain" aria-hidden="true"></div>

      {/* Interactive cursor glow for pointers */}
      {hasHover && (
        <div
          className="cursor-glow"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top Banner Interactive Prayer Flags */}
      <PrayerFlagRow
        activeFlagId={activeFlag?.id || null}
        onSelectFlag={(flag) => setActiveFlag(flag)}
      />

      {/* Site Header */}
      <header className="max-w-7xl mx-auto px-5 md:px-10 pt-8 pb-6 border-b-2 border-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[var(--brick)]">
            Volume 04 / Nepal Edition
          </div>
          <div className="text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-soft)] block mb-1">THE STORY OF SIRUU & SUBODH</span>
            <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] uppercase">
              SRISHA <span className="text-[var(--brick)] italic font-light font-serif lowercase">&amp;</span> SUBODH
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--ink-soft)] uppercase tracking-wider self-center md:self-auto">
            <span>Est. 2023</span>
            <span className="text-[var(--ink)] font-bold flex items-center gap-1.5">
              ● ONLINE
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[var(--ink-soft)] hover:text-[var(--brick)] ml-2 p-1 border border-[var(--ink)]/20 hover:border-black transition-all cursor-pointer inline-flex items-center justify-center"
                title={isMuted ? 'Listen to roadside mountain wind hum' : 'Mute hum'}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-[var(--brick)] animate-pulse" />}
              </button>
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 mt-6 md:mt-12 space-y-16">
        
        {/* Soft mountain hum sound audio element if unmuted */}
        {!isMuted && (
          <div className="bg-[var(--paper-deep)] border border-[var(--moss)] rounded-full px-4 py-2 text-xs text-[var(--moss)] flex items-center justify-center gap-2 max-w-[280px] mx-auto animate-pulse">
            <Compass size={12} className="animate-spin-slow" />
            <span className="font-semibold tracking-wide">Listening to Himalayan wind chimes...</span>
          </div>
        )}

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left/Top Custom Scooter Illustration */}
          <div className="lg:col-span-6 xl:col-span-5 reveal is-visible order-2 lg:order-1">
            <ScooterCustomizer
              balloons={balloons}
              onAddBalloon={handleAddBalloon}
              onRemoveBalloon={handleRemoveBalloon}
            />
          </div>

          {/* Right/Bottom Hero Copy */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 reveal is-visible order-1 lg:order-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[var(--brick)] block mb-2">
                Rooted in love, bound for the peaks
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-normal tracking-tight leading-[1.05] text-[var(--ink)]">
                Two seats, one scooter, <br className="hidden md:inline" />
                <span className="italic font-serif text-[var(--brick)] font-light">and every mountain trail worth taking.</span>
              </h2>
            </div>

            <p className="description text-sm md:text-base leading-relaxed text-[var(--ink-soft)] max-w-xl font-sans first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-2.5 first-letter:text-[var(--brick)]">
              Some days it's the ride to work through Lalitpur's morning haze, sharing sweet clay-cup milk tea. 
              Other days it's winding trails above the clouds of Nagarkot, chasing a frozen pink horizon neither 
              of us has seen before. Srisha's world runs on both — the quiet devotion of home, and the pull of 
              the next mountain peak. This is where those two roads are slowly being written down.
            </p>

            {/* Quick Active Flag display in Hero space */}
            {activeFlag ? (
              <BlessingCard
                flag={activeFlag}
                onClose={() => setActiveFlag(null)}
              />
            ) : (
              <div className="bg-[var(--paper-deep)]/40 border border-[var(--ink)]/10 rounded-2xl p-5 flex items-start gap-3 text-xs text-[var(--ink-soft)] leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-[var(--marigold)] shrink-0 flex items-center justify-center text-[var(--paper)] font-bold">
                  !
                </div>
                <div>
                  <span className="font-bold text-[var(--ink)] block mb-0.5">Set a Prayer Blessing Free</span>
                  Hover and click on the traditional Tibetan prayer flags along the top of the line to let their winds blow peace, harmony, and strength into our story.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Logs & Scrapbook Sections (Side-by-side on desktop) */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 pt-12 border-t-2 border-black">
          
          {/* Left/Large column: Trail Scrapbook */}
          <div className="xl:col-span-7 space-y-6">
            <MilestoneScrapbook
              milestones={milestones}
              onAddMilestone={handleAddMilestone}
              onDeleteMilestone={handleDeleteMilestone}
            />
          </div>

          {/* Right/Medium column: Letterbox Diary */}
          <div className="xl:col-span-5 space-y-6">
            <DevotionBook />
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-24 px-5 md:px-10 py-8 border-t-2 border-black flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[10px] font-mono uppercase tracking-widest text-[var(--ink-soft)]">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-bold text-[var(--ink)]">SRISHA &amp; SUBODH © 2026</span>
          <span className="hidden md:inline">|</span>
          <span>Designed with Devotion</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--indigo)]" /> Togetherness</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--brick)]" /> Adventure</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--moss)]" /> Home</span>
          </span>
        </div>

        <nav className="flex items-center gap-6 font-bold" aria-label="Contact and social">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--brick)] transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@srisha.com"
            className="hover:text-[var(--brick)] transition-colors flex items-center gap-1"
          >
            <Mail size={11} />
            Say Hello
          </a>
        </nav>
      </footer>
    </div>
  );
}
