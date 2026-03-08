const express = require('express');

module.exports = function createTransactionsRouter(db, formatDate) {
  const router = express.Router();

  router.get('/', (req, res) => {
    try {
      const rows = db.prepare('SELECT * FROM transactions ORDER BY date DESC, id DESC').all();
      res.json(rows.map((r) => ({ ...r, id: String(r.id) })));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', (req, res) => {
    try {
      const { label, amount, type } = req.body;
      if (label == null || amount == null || type == null) {
        return res.status(400).json({ error: 'Missing label, amount or type' });
      }
      const id = String(Date.now());
      const date = formatDate();
      db.prepare('INSERT INTO transactions (id, label, amount, type, date) VALUES (?,?,?,?,?)').run(id, label, Number(amount), type, date);
      if (db.save) db.save();
      res.status(201).json({ id, label, amount: Number(amount), type, date });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
