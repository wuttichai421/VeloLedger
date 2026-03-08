# FlowAccount API (Backend)

เซิร์ฟเวอร์ REST API สำหรับ FlowAccount ใช้ Express + SQLite (sql.js)

## ติดตั้งและรัน

```bash
cd server
npm install
npm start
```

หรือจากโฟลเดอร์โปรเจกต์:

```bash
npm run server:install
npm run server
```

API จะรันที่ **http://localhost:3001** (หรือค่าในตัวแปร `PORT`)

## Endpoints

| Method | Path | คำอธิบาย |
|--------|------|----------|
| GET | /api/health | ตรวจสอบว่า API ทำงาน |
| GET | /api/transactions | รายการรายรับ-รายจ่าย |
| POST | /api/transactions | เพิ่มรายการ (body: label, amount, type) |
| GET | /api/documents | รายการเอกสาร |
| GET | /api/documents/:id | ดูเอกสารตาม id หรือเลขที่ (เช่น DO-001) |
| POST | /api/documents | เพิ่มเอกสาร (body: type, title, amount, customer?, items?, dueDate?) |
| GET | /api/accountants | รายการนักบัญชี |
| POST | /api/accountants | เพิ่มนักบัญชี (body: name, email) |

## ข้อมูล

- ข้อมูลเก็บใน `server/data/flowaccount.db` (SQLite)
- ครั้งแรกรันจะ seed ข้อมูลตัวอย่าง (รายการ 5 รายการ, เอกสาร 5 ฉบับ)
