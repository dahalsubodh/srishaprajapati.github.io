/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BalloonMemory {
  id: string;
  message: string;
  sender: string;
  color: string; // HEX or CSS variable
  xOffset: number; // For placement relative to standard balloon anchor
  yOffset: number;
  scale: number;
  bobDelay: string;
}

export interface MilestoneRide {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  altitude?: string;
  vibe: string;
  accentColor: string;
}

export interface PrayerFlag {
  id: string;
  character: string;
  word: string;
  translation: string;
  color: string;
  blessing: string;
}
