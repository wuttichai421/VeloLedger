const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'flowaccount.db');

function formatDate() {
  const d = new Date();
  const y = d.getFullYear() + 543;
  const m = d.toLocaleDateString('en-US', { month: 'short' });
  const thMonths = { Jan: 'ม.ค.', Feb: 'ก.พ.', Mar: 'มี.ค.', Apr: 'เม.ย.', May: 'พ.ค.', Jun: 'มิ.ย.', Jul: 'ก.ค.', Aug: 'ส.ค.', Sep: 'ก.ย.', Oct: 'ต.ค.', Nov: 'พ.ย.', Dec: 'ธ.ค.' };
  const day = d.getDate();
  return `${day} ${thMonths[m] || m} ${y}`;
}

const DOC_PREFIX = { quote: 'Q', invoice: 'INV', receipt: 'REC', tax_invoice: 'TAX', delivery_order: 'DO' };

function wrapDb(sqliteDb) {
  return {
    exec(sql) {
      sqliteDb.run(sql);
    },
    prepare(sql) {
      return {
        all(...params) {
          const stmt = sqliteDb.prepare(sql);
          stmt.bind(params);
          const rows = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          stmt.free();
          return rows;
        },
        get(...params) {
          const rows = this.all(...params);
          return rows[0];
        },
        run(...params) {
          const stmt = sqliteDb.prepare(sql);
          stmt.bind(params);
          stmt.step();
          stmt.free();
        },
      };
    },
  };
}

function nextDocNo(db, type) {
  const rows = db.prepare('SELECT no FROM documents WHERE type = ?').all(type);
  const nums = rows.map((r) => parseInt(r.no.replace(/\D/g, ''), 10)).filter((n) => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${DOC_PREFIX[type]}-${String(next).padStart(3, '0')}`;
}

async function initDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const SQL = await initSqlJs();
  let db;
  if (fs.existsSync(dbPath)) {
    const buf = fs.readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }

  const save = () => {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  };

  const wrapped = wrapDb(db);
  wrapped.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('income','expense')),
      date TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      no TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('quote','invoice','receipt','tax_invoice','delivery_order')),
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      customer TEXT,
      items TEXT,
      due_date TEXT
    );
    CREATE TABLE IF NOT EXISTS accountants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);

  const txCount = wrapped.prepare('SELECT COUNT(*) as c FROM transactions').get();
  if (!txCount || txCount.c === 0) {
    const seedTx = [
      ['1', 'รับเงินจาก ลูกค้า A', 15000, 'income', '5 มี.ค. 2568'],
      ['2', 'ค่าส่งของ - Kerry', 120, 'expense', '4 มี.ค. 2568'],
      ['3', 'ใบเสนอราคา #Q-001', 25000, 'income', '3 มี.ค. 2568'],
      ['4', 'ค่าเช่าห้อง - มี.ค.', 8000, 'expense', '1 มี.ค. 2568'],
      ['5', 'ขายสินค้าออนไลน์', 8500, 'income', '28 ก.พ. 2568'],
    ];
    const ins = wrapped.prepare('INSERT INTO transactions (id, label, amount, type, date) VALUES (?,?,?,?,?)');
    seedTx.forEach((row) => { ins.run(...row); });
  }

  const docCount = wrapped.prepare('SELECT COUNT(*) as c FROM documents').get();
  if (!docCount || docCount.c === 0) {
    const seedDoc = [
      ['1', 'Q-001', 'quote', 'ใบเสนอราคา - บริษัท ABC', '5 มี.ค. 2568', 25000, 'บริษัท ABC จำกัด', 'บริการที่ปรึกษา 1 โปรเจกต์', null],
      ['2', 'INV-002', 'invoice', 'ใบแจ้งหนี้ - ร้าน XYZ', '4 มี.ค. 2568', 15000, 'ร้าน XYZ', 'สินค้าตามรายการ', null],
      ['3', 'REC-001', 'receipt', 'ใบเสร็จรับเงิน - ลูกค้า A', '5 มี.ค. 2568', 15000, 'ลูกค้า A', null, null],
      ['4', 'TAX-001', 'tax_invoice', 'ใบกำกับภาษี - ร้าน XYZ', '4 มี.ค. 2568', 10700, 'ร้าน XYZ', null, null],
      ['5', 'DO-001', 'delivery_order', 'ใบวางบิล - ร้าน ABC', '5 มี.ค. 2568', 8500, 'ร้าน ABC', 'สินค้าส่งมอบตามรายการ', null],
    ];
    const ins = wrapped.prepare('INSERT INTO documents (id, no, type, title, date, amount, customer, items, due_date) VALUES (?,?,?,?,?,?,?,?,?)');
    seedDoc.forEach((row) => { ins.run(...row); });
  }

  save();
  wrapped.save = save;
  wrapped._raw = db;
  return { db: wrapped, nextDocNo: (type) => nextDocNo(wrapped, type), formatDate };
}

module.exports = { initDb, formatDate };
