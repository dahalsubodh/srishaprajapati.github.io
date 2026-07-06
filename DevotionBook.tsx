/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PenTool, Heart, Send, CheckCircle2, Trash2 } from 'lucide-react';

interface DevotionLetter {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  date: string;
  sealColor: string;
}

const SEALS = [
  { name: 'Brick', value: 'var(--brick)' },
  { name: 'Blue', value: 'var(--indigo)' },
  { name: 'Marigold', value: 'var(--marigold)' },
  { name: 'Moss', value: 'var(--moss)' },
];

export default function DevotionBook() {
  const [letters, setLetters] = useState<DevotionLetter[]>([]);
  const [sender, setSender] = useState('Subodh');
  const [recipient, setRecipient] = useState('Srisha');
  const [content, setContent] = useState('');
  const [sealColor, setSealColor] = useState('var(--brick)');
  const [activeTab, setActiveTab] = useState<'read' | 'write'>('read');
  const [notification, setNotification] = useState('');

  // Seed default letters if none exist in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('srisha_subodh_letters');
    if (stored) {
      setLetters(JSON.parse(stored));
    } else {
      const defaultLetters: DevotionLetter[] = [
        {
          id: 'l1',
          sender: 'Subodh',
          recipient: 'Srisha',
          content: 'Srisha, thank you for riding on my pillion through all the bumps, dust, and cold winds. No matter how steep the climb to Nagarkot or Phulchowki gets, the weight of you behind me holding on tight is what keeps us grounded and flying at the same time. Looking forward to every new mountain sunrise on our scooter.',
          date: '2025-12-06',
          sealColor: 'var(--brick)'
        },
        {
          id: 'l2',
          sender: 'Srisha',
          recipient: 'Subodh',
          content: 'To my favorite rider. Some days when Lalitpur mornings are hazy and cold, just starting the scooter together warms up the whole day. Thank you for always checking if my hands are cold, and for stopping at every roadside sweet tea shop. Here is to our quiet devotion of home, and chasing peaks with you.',
          date: '2026-03-24',
          sealColor: 'var(--indigo)'
        }
      ];
      setLetters(defaultLetters);
      localStorage.setItem('srisha_subodh_letters', JSON.stringify(defaultLetters));
    }
  }, []);

  const handleSaveLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newLetter: DevotionLetter = {
      id: `l-custom-${Date.now()}`,
      sender: sender.trim() || 'Subodh',
      recipient: recipient.trim() || 'Srisha',
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      sealColor
    };

    const updated = [newLetter, ...letters];
    setLetters(updated);
    localStorage.setItem('srisha_subodh_letters', JSON.stringify(updated));

    setContent('');
    setActiveTab('read');
    setNotification('Your letter has been sealed and dropped into the mailbox!');
    setTimeout(() => setNotification(''), 4000);
  };

  const handleDeleteLetter = (id: string) => {
    const updated = letters.filter((l) => l.id !== id);
    setLetters(updated);
    localStorage.setItem('srisha_subodh_letters', JSON.stringify(updated));
  };

  return (
    <div className="bg-[var(--paper-deep)] border-2 border-[var(--ink)] rounded-2xl p-6 shadow-sm relative overflow-hidden">
      {/* Decorative notebook binding line */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[var(--ink)]/20 to-transparent border-r border-[var(--ink)]/10"></div>

      <div className="pl-4">
        {/* Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--ink)]/15 pb-4 mb-5">
          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--ink)] flex items-center gap-2">
              <PenTool size={20} className="text-[var(--brick)]" />
              The Devotion Letterbox
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Leave handwritten letters and quiet devotions for each other to discover.
            </p>
          </div>

          <div className="flex bg-[var(--paper)] border border-[var(--ink)] text-[10px]">
            <button
              onClick={() => setActiveTab('read')}
              className={`px-4 py-2 font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === 'read'
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
              }`}
            >
              Read Letters ({letters.length})
            </button>
            <button
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 font-bold uppercase tracking-wider cursor-pointer transition-all border-l border-[var(--ink)] ${
                activeTab === 'write'
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
              }`}
            >
              Write Letter
            </button>
          </div>
        </div>

        {notification && (
          <div className="mb-4 bg-[var(--paper)] border border-[var(--moss)] text-[var(--moss)] text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 animate-fade-in font-semibold">
            <CheckCircle2 size={15} />
            {notification}
          </div>
        )}

        {/* Read letters tab */}
        {activeTab === 'read' && (
          <div className="space-y-6 max-h-[460px] overflow-y-auto pr-2">
            {letters.length === 0 ? (
              <div className="text-center py-12 bg-[var(--paper)] rounded-xl border border-[var(--ink)]/10 border-dashed">
                <Heart className="mx-auto text-[var(--ink-soft)]/30 mb-2" size={32} />
                <p className="text-xs text-[var(--ink-soft)] italic">
                  The letterbox is quiet. Write a sweet note to seal and leave inside!
                </p>
              </div>
            ) : (
              letters.map((letter) => (
                <div
                  key={letter.id}
                  className="bg-[var(--paper)] border border-[var(--ink)] rounded-xl p-5 shadow-sm relative group transition-all duration-200"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(43,38,32,0.04) 23px, rgba(43,38,32,0.04) 24px)',
                    lineHeight: '24px',
                  }}
                >
                  {/* Seal Stamp */}
                  <div
                    className="absolute right-4 top-4 w-8 h-8 rounded-full border border-[var(--ink)]/30 flex items-center justify-center font-display text-[10px] font-bold text-[var(--paper)] select-none opacity-80"
                    style={{
                      backgroundColor: letter.sealColor,
                      transform: 'rotate(-12deg)',
                      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)',
                    }}
                    title="Wax sealed"
                  >
                    Seal
                  </div>

                  {/* Envelope Header */}
                  <div className="flex justify-between border-b border-[var(--ink)]/10 pb-1 mb-3 text-[11px] font-bold text-[var(--ink-soft)] uppercase tracking-wide">
                    <span>
                      From: <span className="text-[var(--indigo)] font-display italic font-semibold normal-case text-xs">{letter.sender}</span>
                      {' '} &nbsp;|&nbsp; &nbsp;To:{' '}
                      <span className="text-[var(--brick)] font-display italic font-semibold normal-case text-xs">{letter.recipient}</span>
                    </span>
                    <span>{letter.date}</span>
                  </div>

                  {/* Letter body */}
                  <p className="font-display text-sm md:text-base italic text-[var(--ink)] leading-relaxed pt-2 pl-1 pr-6 pb-2">
                    {letter.content}
                  </p>

                  {/* Devotion Footer / Seal toggle */}
                  <div className="flex justify-between items-center border-t border-[var(--ink)]/5 pt-2 mt-4 text-[10px] text-[var(--ink-soft)]/50 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Heart size={10} className="text-[var(--brick)] fill-[var(--brick)]" /> Sealed in love
                    </span>
                    
                    {letter.id.startsWith('l-custom-') && (
                      <button
                        onClick={() => handleDeleteLetter(letter.id)}
                        className="text-red-700/60 hover:text-red-700 transition-colors cursor-pointer p-1"
                        title="Discard letter"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Write letter tab */}
        {activeTab === 'write' && (
          <form onSubmit={handleSaveLetter} className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Sender (Author)
                </label>
                <select
                  value={sender}
                  onChange={(e) => {
                    setSender(e.target.value);
                    setRecipient(e.target.value === 'Subodh' ? 'Srisha' : 'Subodh');
                  }}
                  className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-lg p-2 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                >
                  <option value="Subodh">Subodh</option>
                  <option value="Srisha">Srisha</option>
                  <option value="Us">Us</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  disabled
                  className="w-full bg-[var(--paper-deep)] border border-[var(--ink)]/30 rounded-lg p-2 text-xs text-[var(--ink-soft)] focus:outline-none"
                />
              </div>
            </div>

            {/* Content letter text */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1">
                Your Letter
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Srisha, I was thinking about the time..."
                required
                rows={6}
                className="w-full bg-[var(--paper)] border border-[var(--ink)] rounded-xl p-3 text-xs md:text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--indigo)]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(43,38,32,0.03) 23px, rgba(43,38,32,0.03) 24px)',
                  lineHeight: '24px',
                }}
              />
            </div>

            {/* Wax seal selector */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  Wax Seal Color:
                </span>
                <div className="flex items-center gap-1.5">
                  {SEALS.map((seal) => (
                    <button
                      key={seal.value}
                      type="button"
                      onClick={() => setSealColor(seal.value)}
                      className={`w-6 h-6 rounded-full border border-[var(--ink)] cursor-pointer relative`}
                      style={{ backgroundColor: seal.value, boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)' }}
                    >
                      {sealColor === seal.value && (
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-[var(--paper)] font-bold">Seal</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-[var(--ink)] hover:bg-[var(--brick)] hover:text-[var(--paper)] text-[var(--paper)] text-[10px] uppercase font-bold tracking-[0.2em] py-2.5 px-6 border border-[var(--ink)] transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send size={13} />
                Seal & Mail Devotion
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
