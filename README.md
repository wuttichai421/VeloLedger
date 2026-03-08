# VeloLedger

แอปโปรแกรมบัญชีออนไลน์ สำหรับ SME ไทย — จัดการเอกสาร รายรับรายจ่าย รายงาน และเชื่อมต่อนักบัญชี

- **เว็บ (PWA)** · **iOS** · **Android**

---

## เทคโนโลยี

- [Expo](https://expo.dev) (React Native) + [Expo Router](https://docs.expo.dev/router/introduction/)
- TypeScript
- Backend ตัวอย่าง: Node.js (โฟลเดอร์ `server/`)

---

## วิธีรันบนเครื่องตัวเอง

### 1. ติดตั้ง

```bash
npm install
```

### 2. รันแอป

```bash
# เปิดเว็บ
npm run web

# หรือเปิดทุกแพลตฟอร์ม (เลือกจากเมนู)
npx expo start
```

- **เว็บ:** เปิดเบราว์เซอร์ไปที่ URL ที่แสดง (เช่น http://localhost:8081)
- **มือถือ:** ติดตั้งแอป Expo Go แล้วสแกน QR code

### 3. (ถ้าใช้ API ฝั่ง server) รัน backend

```bash
npm run server:install   # ครั้งแรก
npm run server
```

---

## โครงสร้างหลัก

| โฟลเดอร์/ไฟล์ | คำอธิบาย |
|----------------|----------|
| `app/` | หน้าและ route (Expo Router) |
| `app/(tabs)/` | แท็บล่าง: ภาพรวม, รายรับ-รายจ่าย, เอกสาร, เชื่อมต่อ, เพิ่มเติม |
| `components/` | คอมโพเนนต์ร่วม (NavbarSidebar, AccountantContent ฯลฯ) |
| `constants/` | ค่าคงที่ (ธีม, API) |
| `context/` | Theme, App state |
| `server/` | Backend ตัวอย่าง (Node.js) |

---

## Build สำหรับ deploy

### เว็บ (Static / PWA)

```bash
npm run build:web
# หรือ
npx expo export --platform web
```

ผลลัพธ์อยู่ในโฟลเดอร์ `dist/` — นำไป deploy ที่ Vercel, Netlify หรือ hosting อื่นได้

### แอปมือถือ

ใช้ [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas build --platform all
```

---

## ลิงก์

- **Repo:** [github.com/wuttichai421/VeloLedger](https://github.com/wuttichai421/VeloLedger)
- **เอกสาร route ในแอป:** [app-routes.md](./app-routes.md)

---

## License

Private / ใช้ภายในโปรเจกต์
