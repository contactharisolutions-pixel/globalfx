/**
 * ranks.js — BitLance Income Engine Configuration
 * Single source of truth for all income/bonus tables.
 */

// ── Fixed Package Amounts ──────────────────────────────────────
const PACKAGE_AMOUNTS = [150, 300, 500, 1000, 2000, 5000]

// ── 3-Level Sponsor Income (Fixed $ per package amount) ───────
// Key = package amount, Value = [L1_$, L2_$, L3_$]
const SPONSOR_INCOME_TABLE = {
  150:  [10,  12,  5 ],
  300:  [20,  25,  8 ],
  500:  [30,  35,  10],
  1000: [80,  85,  15],
  2000: [110, 120, 25],
  5000: [270, 280, 80],
}

// ── Business Match Reward & Monthly Salary Tiers ──────────────
// Sorted descending by match (so highest tier is checked first)
const BUSINESS_MATCH_TIERS = [
  { match: 1000000, reward: 5000, salary: 5000 },
  { match: 500000,  reward: 4000, salary: 2500 },
  { match: 300000,  reward: 3000, salary: 1800 },
  { match: 100000,  reward: 2500, salary: 1500 },
  { match: 50000,   reward: 2000, salary: 1200 },
  { match: 40000,   reward: 1400, salary: 1000 },
  { match: 30000,   reward: 1200, salary: 800  },
  { match: 25000,   reward: 1000, salary: 600  },
  { match: 20000,   reward: 600,  salary: 500  },
  { match: 15000,   reward: 500,  salary: 300  },
  { match: 10000,   reward: 300,  salary: 250  },
  { match: 5000,    reward: 100,  salary: 150  },
  { match: 2000,    reward: 80,   salary: 100  },
  { match: 1000,    reward: 50,   salary: 50   },
]

// ── Corporate Royalty Tiers ────────────────────────────────────
// Requires 50:50 matched business volume >= business threshold
// % of total company monthly turnover
const CORPORATE_ROYALTY_TIERS = [
  { business: 100000,  percent: 1 },
  { business: 200000,  percent: 2 },
  { business: 300000,  percent: 3 },
  { business: 400000,  percent: 4 },
  { business: 500000,  percent: 5 },
]

// ── Monsoon Bonanza Tiers ──────────────────────────────────────
// One-time milestone bonus based on total team size (all downline)
const MONSOON_BONANZA_TIERS = [
  { teamSize: 50,   bonus: 20   },
  { teamSize: 100,  bonus: 50   },
  { teamSize: 200,  bonus: 100  },
  { teamSize: 500,  bonus: 250  },
  { teamSize: 1000, bonus: 500  },
  { teamSize: 2000, bonus: 1000 },
  { teamSize: 5000, bonus: 2000 },
]

module.exports = {
  PACKAGE_AMOUNTS,
  SPONSOR_INCOME_TABLE,
  BUSINESS_MATCH_TIERS,
  CORPORATE_ROYALTY_TIERS,
  MONSOON_BONANZA_TIERS,
}
