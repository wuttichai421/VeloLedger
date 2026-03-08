const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const createTransactionsRouter = require('./routes/transactions');
const createDocumentsRouter = require('./routes/documents');
const createAccountantsRouter = require('./routes/accountants');

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  const { db, nextDocNo, formatDate } = await initDb();
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/transactions', createTransactionsRouter(db, formatDate));
  app.use('/api/documents', createDocumentsRouter(db, nextDocNo, formatDate));
  app.use('/api/accountants', createAccountantsRouter(db));

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  const server = app.listen(PORT, () => {
    console.log(`VeloLedger API http://localhost:${PORT}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`พอร์ต ${PORT} ถูกใช้งานอยู่ ลองปิด process อื่นหรือใช้ PORT=3002 npm run start`);
    }
    throw err;
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
