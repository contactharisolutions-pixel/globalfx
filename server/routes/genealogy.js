const router       = require('express').Router()
const authenticate = require('../middleware/authenticate')
const prisma = require('../lib/prisma')
router.use(authenticate)

// ─── GET /api/genealogy/directs ───────────────────────────────
router.get('/directs', async (req, res, next) => {
  try {
    const directs = await prisma.user.findMany({
      where:   { sponsor_id: req.user.id },
      select:  { user_id: true, name: true, status: true, created_at: true, packages: { where: { status: 'active' }, select: { amount: true } } },
      orderBy: { created_at: 'desc' },
    })
    res.json({ directs: directs.map((u) => ({ ...u, total_invested: u.packages.reduce((s, p) => s + +p.amount, 0), packages: undefined })) })
  } catch (err) { next(err) }
})

// ─── GET /api/genealogy/level-report ─────────────────────────
router.get('/level-report', async (req, res, next) => {
  const page     = parseInt(req.query.page  || '1')
  const level    = parseInt(req.query.level || '0')
  const pageSize = 20
  try {
    // 1. Get counts per level for summary
    const levelCounts = await prisma.$queryRaw`
      WITH RECURSIVE tree AS (
        SELECT id, 1 AS lvl FROM "User" WHERE sponsor_id = ${req.user.id}
        UNION ALL
        SELECT u.id, t.lvl + 1 FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id WHERE t.lvl < 10
      )
      SELECT lvl, COUNT(*) as count FROM tree GROUP BY lvl ORDER BY lvl
    `
    const levelsSummary = {}
    levelCounts.forEach(lc => levelsSummary[lc.lvl] = { length: Number(lc.count) })

    if (level > 0) {
      const skip = (page - 1) * pageSize
      const rows = await prisma.$queryRaw`
        WITH RECURSIVE tree AS (
          SELECT id, user_id, name, status, created_at, 1 AS lvl
          FROM "User" WHERE sponsor_id = ${req.user.id}
          UNION ALL
          SELECT u.id, u.user_id, u.name, u.status, u.created_at, t.lvl + 1
          FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id WHERE t.lvl < 10
        )
        SELECT t.id, t.user_id, t.name, t.status, t.lvl, t.created_at,
               COALESCE(SUM(tp.amount), 0) AS total_invested
        FROM tree t
        LEFT JOIN "TradePackage" tp ON tp.user_id = t.id AND tp.status = 'active'
        WHERE t.lvl = ${level}
        GROUP BY t.id, t.user_id, t.name, t.status, t.lvl, t.created_at
        ORDER BY t.created_at DESC
        LIMIT ${pageSize} OFFSET ${skip}
      `
      const total = levelsSummary[level]?.length || 0
      res.json({
        levels: { [level]: rows.map(r => ({ ...r, total_invested: Number(r.total_invested) })) },
        pagination: { page, pageSize, total, pages: Math.ceil(total / pageSize) }
      })
    } else {
      // Just return summary info for all levels
      const summaryRows = await prisma.$queryRaw`
        WITH RECURSIVE tree AS (
          SELECT id, status, 1 AS lvl FROM "User" WHERE sponsor_id = ${req.user.id}
          UNION ALL
          SELECT u.id, u.status, t.lvl + 1 FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id WHERE t.lvl < 10
        )
        SELECT t.lvl, COUNT(t.id) as count, COUNT(t.id) FILTER (WHERE t.status = 'active') as active_count,
               COALESCE(SUM(tp.amount), 0) as total_invested
        FROM tree t
        LEFT JOIN "TradePackage" tp ON tp.user_id = t.id AND tp.status = 'active'
        GROUP BY t.lvl ORDER BY t.lvl
      `
      const levels = {}
      summaryRows.forEach(sr => {
        levels[sr.lvl] = { 
          length: Number(sr.count), 
          active_count: Number(sr.active_count),
          total_invested: Number(sr.total_invested)
        }
      })
      res.json({ levels })
    }
  } catch (err) { next(err) }
})

// ─── GET /api/genealogy/tree ──────────────────────────────────
// D3-ready hierarchical tree (max 3 levels for canvas performance)
router.get('/tree', async (req, res, next) => {
  try {
    const me = await prisma.user.findUnique({
      where:  { id: req.user.id },
      select: { user_id: true, name: true, status: true },
    })
    const rows = await prisma.$queryRaw`
      WITH RECURSIVE tree AS (
        SELECT id, user_id, name, status, sponsor_id, 1 AS lvl
        FROM "User" WHERE sponsor_id = ${req.user.id}
        UNION ALL
        SELECT u.id, u.user_id, u.name, u.status, u.sponsor_id, t.lvl + 1
        FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id
        WHERE t.lvl < 3
      )
      SELECT id, user_id, name, status, sponsor_id, lvl FROM tree
    `
    const nodeMap = {}
    rows.forEach((r) => { nodeMap[r.id] = { ...r, children: [] } })
    const root = { id: req.user.id, user_id: me.user_id, name: me.name, status: me.status, lvl: 0, children: [] }
    rows.forEach((r) => {
      if (+r.lvl === 1) root.children.push(nodeMap[r.id])
      else { const p = nodeMap[r.sponsor_id]; if (p) p.children.push(nodeMap[r.id]) }
    })
    res.json({ tree: root })
  } catch (err) { next(err) }
})

module.exports = router
