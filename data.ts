/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MilestoneRide, PrayerFlag, BalloonMemory } from './types';

export const INITIAL_MILESTONES: MilestoneRide[] = [
  {
    id: 'm1',
    title: 'Patan Morning Haze',
    description: 'Chasing the golden hour mist through the narrow gallis of Lalitpur. We stopped for hot clay-cup sweet milk tea under a centuries-old peepal tree, with the scooter resting against an ancient stone chaitya.',
    date: '2025-10-14',
    location: 'Mangal Bazaar, Lalitpur',
    altitude: '1,400m',
    vibe: 'Quiet & Warm',
    accentColor: 'var(--marigold)'
  },
  {
    id: 'm2',
    title: 'Nagarkot Ridge Above the Clouds',
    description: 'A freezing pre-dawn ascent on the scooter. The engine hummed faithfully as the steep mountain road wound up. At the crest, the sea of clouds parted, revealing the icy crowns of the Langtang range bathed in pink.',
    date: '2025-12-05',
    location: 'Nagarkot Hillside',
    altitude: '2,175m',
    vibe: 'Breathtaking Adventure',
    accentColor: 'var(--indigo)'
  },
  {
    id: 'm3',
    title: 'Bungamati Harvest Fields',
    description: 'Riding down south where the valley breathes ancient rhythms. Fields of drying hay glowing under the autumn sun. We sat on the scooter pillion, watching the farmers and listening to the distant temple bells.',
    date: '2026-03-22',
    location: 'Bungamati Village',
    altitude: '1,350m',
    vibe: 'Peaceful & Devotional',
    accentColor: 'var(--moss)'
  },
  {
    id: 'm4',
    title: 'Swayambhu Sunset',
    description: 'A quick dash after work. Climbing the spiral highway with the city expanding below us. The butter lamps were being lit, and we stood by the stupa looking down at the shimmering valley in companionable silence.',
    date: '2026-05-18',
    location: 'Swayambhunath Hill',
    altitude: '1,450m',
    vibe: 'Spiritual & Serene',
    accentColor: 'var(--brick)'
  }
];

export const PRAYER_FLAGS: PrayerFlag[] = [
  {
    id: 'flag-blue',
    character: 'ཨོཾ་',
    word: 'Sky (Blue)',
    translation: 'Peace / Space',
    color: 'var(--indigo)',
    blessing: 'May our space together be vast and calm, providing room for both of us to grow, dream, and find inner peace in the midst of any storm.'
  },
  {
    id: 'flag-white',
    character: 'མ',
    word: 'Air (White)',
    translation: 'Harmony / Wind',
    color: 'var(--paper-deep)',
    blessing: 'May the wind carry away all misunderstandings, leaving our communications clear, honest, and filled with deep, unspoken understanding.'
  },
  {
    id: 'flag-red',
    character: 'ཎི',
    word: 'Fire (Red)',
    translation: 'Passion / warmth',
    color: 'var(--brick)',
    blessing: 'May the fire of our devotion and shared adventure burn forever warm, bringing courage, light, and warmth to our home on the coldest nights.'
  },
  {
    id: 'flag-green',
    character: 'པད',
    word: 'Water (Green)',
    translation: 'Compassion / Life',
    color: 'var(--moss)',
    blessing: 'May our compassion flow like mountain streams—nurturing, adaptive, and always finding a way around the hardest rocks of life.'
  },
  {
    id: 'flag-yellow',
    character: 'མེ',
    word: 'Earth (Yellow)',
    translation: 'Grounding / Strength',
    color: 'var(--marigold)',
    blessing: 'May our bond be rooted deep in the solid earth of trust and shared values, giving us the stability to reach for the highest mountain peaks.'
  }
];

export const INITIAL_BALLOONS: BalloonMemory[] = [
  {
    id: 'b1',
    message: 'To chasing every mountain sunrise together on two wheels.',
    sender: 'Subodh',
    color: 'var(--brick)',
    xOffset: -20,
    yOffset: -80,
    scale: 1,
    bobDelay: '0s'
  },
  {
    id: 'b2',
    message: 'Always feeling safe with my hands in your jacket pockets.',
    sender: 'Srisha',
    color: 'var(--marigold)',
    xOffset: 5,
    yOffset: -105,
    scale: 0.9,
    bobDelay: '0.4s'
  },
  {
    id: 'b3',
    message: 'That sweet Patan milk tea under the old peepal tree...',
    sender: 'Us',
    color: 'var(--indigo)',
    xOffset: 30,
    yOffset: -75,
    scale: 0.95,
    bobDelay: '0.8s'
  }
];
