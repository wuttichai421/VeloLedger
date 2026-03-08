const express = require('express');

module.exports = function createAccountantsRouter(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    try {
      const rows = db.prepare('SELECT * FROM accountants ORDER BY id DESC').all();
      res.json(rows.map((r) => ({ id: String(r.id), name: r.name, email: r.email })));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });
      const id = String(Date.now());
      db.prepare('INSERT INTO accountants (id, name, email) VALUES (?,?,?)').run(id, name, email);
      if (db.save) db.save();
      res.status(201).json({ id, name, email });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
