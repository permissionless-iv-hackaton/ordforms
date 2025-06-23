# 🟠 Permissionless Submission Tool

This is a fullstack application for handling Web3-integrated tender and grant submissions, combining modern UX with Bitcoin + Ordinals tech.

## 🔧 Tech Stack

- Frontend: React + TypeScript + Vite + Sass
- Backend: Node.js + Express + Firebase + Zaprite + GitHub OAuth
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
For GitHub OAuth, also set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `GITHUB_CALLBACK_URL`.

### Frontend
```bash
cd client
npm install
npm run dev
```

The frontend uses Vite and proxies `/api` to `http://localhost:5000`.

After connecting your GitHub account and Xverse wallet, you can inscribe using
OrdinalsBot or select an existing inscription. Payments are handled via Bitcoin,
Zaprite or PayPal USD stablecoin.

### Testnet Details

All inscriptions and payments operate on Bitcoin testnet4. PayPal USD payments
are directed to the Sepolia wallet `0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9`.
Inscription fees are paid from the internal wallet
`2MxnPXCMyXZCAH92QFUpf6ELaqV2EU4d4b2` using the OrdinalsBot API. The
corresponding WIF key (`INTERNAL_BTC_WIF`) is required for OP_RETURN pushes.

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
- `/api/submission/:id`
- `/api/bitcoin/wallet/link`
- `/api/bitcoin/ordinals/store`
- `/api/bitcoin/zaprite/pay`
- `/api/bitcoin/paypal/pay`
- `/api/bitcoin/ordinals/cost`
- `/api/bitcoin/ordinals/inscribe`
- `/api/bitcoin/opreturn/push`
- `/api/auth/github`
- `/api/auth/github/callback`

---

## 🧠 Future Ideas

- Integrate OpenTimestamps + inscription hashproofs
- Resume metadata extraction
- Reviewer/selection dashboard
- Xverse wallet integration with Ordinals inscriptions

---

## ⚖️ License
MIT — built permissionlessly.

The flow is:
1. `/case` - read the hackathon opportunity.
2. `/form` - submit personal or corporate data and upload your resume.
3. `/wallet` - connect Xverse and specify your Ordinals address.
4. `/timestamp` - push the hash via OP_RETURN.
5. `/success` - confirmation.
