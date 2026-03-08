const express = require('express');

function rowToDoc(r) {
  return {
    id: String(r.id),
    no: r.no,
    type: r.type,
    title: r.title,
    date: r.date,
    amount: r.amount,
    customer: r.customer ?? undefined,
    items: r.items ?? undefined,
    dueDate: r.due_date ?? undefined,
  };
}

module.exports = function createDocumentsRouter(db, nextDocNo, formatDate) {
  const router = express.Router();

  router.get('/', (req, res) => {
    try {
      const rows = db.prepare('SELECT * FROM documents ORDER BY date DESC, id DESC').all();
      res.json(rows.map(rowToDoc));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.get('/:id', (req, res) => {
    try {
      const r = db.prepare('SELECT * FROM documents WHERE id = ? OR no = ?').get(req.params.id, req.params.id);
      if (!r) return res.status(404).json({ error: 'Not found' });
      res.json(rowToDoc(r));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', (req, res) => {
    try {
      const { type, title, amount, customer, items, dueDate } = req.body;
      if (!type || !title || amount == null) {
        return res.status(400).json({ error: 'Missing type, title or amount' });
      }
      const id = String(Date.now());
      const no = nextDocNo(type);
      const date = formatDate();
      db.prepare(
        'INSERT INTO documents (id, no, type, title, date, amount, customer, items, due_date) VALUES (?,?,?,?,?,?,?,?,?)'
      ).run(id, no, type, title, date, Number(amount), customer || null, items || null, dueDate || null);
      if (db.save) db.save();
      res.status(201).json(rowToDoc({ id, no, type, title, date, amount: Number(amount), customer, items, due_date: dueDate }));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
};
