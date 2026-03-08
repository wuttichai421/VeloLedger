# ใช้ Git สองบัญชี GitHub แยกกัน (wuttichai421 / wuttichai1447)

## แนวคิด
- **Repo นี้ (VeloLedger)** เป็นของ `wuttichai421` → เวลา push ใช้บัญชี wuttichai421
- **Repo อื่น** ถ้าเป็นของ `wuttichai1447` → ใช้บัญชี wuttichai1447

จะสลับบัญชีอัตโนมัติได้โดยใช้ **SSH + คอนฟิกแยก Host** ต่อบัญชี

---

## วิธีที่ 1: SSH (แนะนำ – แยกบัญชีชัด)

### 1. สร้าง SSH key แยกกัน 2 ชุด (ถ้ายังไม่มี)

```powershell
# บัญชี wuttichai421
ssh-keygen -t ed25519 -C "your-421-email@example.com" -f "$env:USERPROFILE\.ssh\id_ed25519_github_421"

# บัญชี wuttichai1447
ssh-keygen -t ed25519 -C "your-1447-email@example.com" -f "$env:USERPROFILE\.ssh\id_ed25519_github_1447"
```

เพิ่ม public key แต่ละอันเข้า GitHub:  
Settings → SSH and GPG keys → New SSH key (ของแต่ละบัญชี)

### 2. ตั้งค่า SSH config

สร้าง/แก้ไฟล์ `C:\Users\<คุณ>\.ssh\config`:

```
# บัญชี wuttichai421
Host github-421
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github_421

# บัญชี wuttichai1447
Host github-1447
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github_1447
```

### 3. ในโปรเจกต์ VeloLedger (repo ของ wuttichai421)

```powershell
cd c:\Users\USER\FlowAccount
git remote set-url origin git@github-421:wuttichai421/VeloLedger.git
git config user.name "wuttichai421"
git config user.email "your-421-email@example.com"   # เปลี่ยนเป็นอีเมลที่ผูกกับบัญชี 421
```

จากนั้น `git push -u origin main` จะใช้บัญชี wuttichai421 โดยอัตโนมัติ

### 4. ในโปรเจกต์อื่นที่เป็นของ wuttichai1447

```powershell
git remote set-url origin git@github-1447:wuttichai1447/<ชื่อ-repo>.git
git config user.name "wuttichai1447"
git config user.email "your-1447-email@example.com"
```

---

## วิธีที่ 2: ใช้ HTTPS (สลับบัญชีมือ)

- ก่อน push ไป repo ของ **wuttichai421**: ลบ credential ของ GitHub ใน Windows (Control Panel → Credential Manager → Windows Credentials → ลบ `git:https://github.com`) แล้วรัน `git push` แล้วลงชื่อเข้าใช้เป็น wuttichai421
- ก่อน push ไป repo ของ **wuttichai1447**: ทำแบบเดียวกันแล้วลงชื่อเป็น wuttichai1447

หรือใช้ [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager) ที่รองรับหลายบัญชี GitHub

---

## สรุปสำหรับ repo นี้

| รายการ        | ค่า |
|---------------|-----|
| Remote (หลังตั้ง SSH) | `git@github-421:wuttichai421/VeloLedger.git` |
| บัญชีที่ใช้ push     | wuttichai421 |

หลังทำขั้นตอนใน “วิธีที่ 1” แล้ว รัน `git push -u origin main` อีกครั้งจากโฟลเดอร์โปรเจกต์นี้
