/**
 * Central configuration for all Performance and Royalty ranks.
 * Used by rewardEngine, royaltyEngine, and member routes.
 */

const REWARD_RANKS = [
  { id: 1,  name: 'Pearl',          target: 1500,   reward: 100   },
  { id: 2,  name: 'Sapphire',       target: 2500,   reward: 200   },
  { id: 3,  name: 'Ruby',           target: 3500,   reward: 300   },
  { id: 4,  name: 'Emerald',        target: 4500,   reward: 400   },
  { id: 5,  name: 'Platinum',       target: 6000,   reward: 500   },
  { id: 6,  name: 'Royal Platinum', target: 10000,  reward: 1000  },
  { id: 7,  name: 'Diamond',        target: 15000,  reward: 1500  },
  { id: 8,  name: 'Double Diamond', target: 25000,  reward: 2500  },
  { id: 9,  name: 'Crown',          target: 50000,  reward: 5000  },
  { id: 10, name: 'Princess',       target: 100000, reward: 10000 },
  { id: 11, name: 'King',           target: 200000, reward: 20000 },
  { id: 12, name: 'Kohinoor',       target: 500000, reward: 25000 },
]

const ROYALTY_RANKS = [
  { id: 1, name: 'Warrior',   target: 100000,  percent: 1 },
  { id: 2, name: 'Fighter',   target: 200000,  percent: 2 },
  { id: 3, name: 'Ranger',    target: 300000,  percent: 3 },
  { id: 4, name: 'Gladiator', target: 500000,  percent: 4 },
]

module.exports = { REWARD_RANKS, ROYALTY_RANKS }
