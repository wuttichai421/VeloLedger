# วิธี Deploy VeloLedger ขึ้นเว็บ

## ตัวเลือกที่ 1: Vercel (แนะนำ)

1. ไปที่ [vercel.com](https://vercel.com) แล้วลงชื่อเข้าใช้ด้วย GitHub
2. กด **Add New** → **Project**
3. เลือก repo **wuttichai421/VeloLedger**
4. ตั้งค่า:
   - **Framework Preset:** Other
   - **Build Command:** `npx expo export --platform web`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. กด **Deploy** — รอสักครู่ จะได้ URL เช่น `https://veloledger-xxx.vercel.app`

ไฟล์ `vercel.json` ในโปรเจกต์ตั้งค่าไว้แล้ว ถ้า Vercel อ่านได้จะใช้ค่าพวกนี้โดยอัตโนมัติ

---

## ตัวเลือกที่ 2: Netlify

1. ไปที่ [netlify.com](https://netlify.com) ลงชื่อเข้าใช้ด้วย GitHub
2. **Add new site** → **Import an existing project** → เลือก GitHub → เลือก repo **VeloLedger**
3. ตั้งค่า Build:
   - **Build command:** `npx expo export --platform web`
   - **Publish directory:** `dist`
4. Deploy — จะได้ URL เช่น `https://xxx.netlify.app`

---

## ก่อน deploy ครั้งแรก

บนเครื่องตัวเองลอง build ก่อนว่าไม่มี error:

```bash
npm install
npx expo export --platform web
```

ถ้าสำเร็จ จะมีโฟลเดอร์ `dist/` — นำโฟลเดอร์นี้หรือให้ Vercel/Netlify รันคำสั่งด้านบนแทนได้
