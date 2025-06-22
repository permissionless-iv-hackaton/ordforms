# 🟠 Permissionless Submission Tool

This is a fullstack application for handling Web3-integrated tender and grant submissions, combining modern UX with Bitcoin + Ordinals tech.

## 🔧 Tech Stack

- Frontend: React + TypeScript + Vite + Sass
- Backend: Node.js + Express + Firebase + Zaprite
- Features: Voucher-gated access, resume & project uploads, wallet integration, project hash timestamping, Ordinals logo inscription

---

## 🚀 How to Run Locally

### Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Ensure you set `ZAPRITE_API_KEY` and provide `firebase-adminsdk.json` from your Firebase console.

### Frontend
```bash
cd client
npm install
npm run dev
```

The frontend uses Vite and proxies `/api` to `http://localhost:5000`.

---

## 🔐 Deployment

### Frontend
- Push `/client` folder to Vercel
- Set environment variables if needed

### Backend
- Deploy `/server` to Render/Heroku
- Add Firebase service account JSON
- Add `.env` with Zaprite key

---

## 📬 API Routes

- `/api/submission/verify-voucher`
- `/api/submission/create`
- `/api/bitcoin/wallet/link`
- `/api/bitcoin/ordinals/store`
- `/api/bitcoin/zaprite/pay`

---

## 🧠 Future Ideas

- Integrate OpenTimestamps + inscription hashproofs
- Resume metadata extraction
- Reviewer/selection dashboard

---

## ⚖️ License
MIT — built permissionlessly.
