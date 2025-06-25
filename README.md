# 🟠 Permissionless Submission Tool

This is a fullstack application for handling Web3-integrated tender and grant submissions, combining modern UX with multichain security including Bitcoin + Ordinals tech and AI templates through NodeOps
## 🔧 Tech Stack

- Frontend: React + TypeScript + Webpack + Sass
- Backend: Node.js (JavaScript) + Express + Firebase + Zaprite + GitHub OAuth
- Features: Voucher-gated access, resume & project uploads, wallet integration, project hash timestamping via Bitcoin OP_RETURN and EVM/IPFS, Ordinals logo inscription AI signature generation

---

## 🚀 How to Run Locally

### Backend
```bash
npm install
npm run dev
```

Ensure you set `ZAPRITE_API_KEY`. Firebase credentials are required and can be
provided through `firebase-adminsdk.json` or the
`FIREBASE_SERVICE_ACCOUNT` environment variable. For GitHub OAuth, also set
`GH_OAUTH_CLIENT_ID`, `GH_OATH_CLIENT_SECRET` and `GH_OATH_CALLBACK_URL`.

### Frontend
```bash
npm run dev
```

The frontend uses Webpack Dev Server and proxies `/api` to `http://localhost:5000`.
Webpack is configured via `webpack.config.json` at the project root.

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

### Frontend & Backend on Vercel
- Install Vercel CLI and run `vercel` to deploy.
- The build script outputs static files to `dist/client` and the Express API is served from `/api`.
- Set the following environment variables in Vercel:
  - `FIREBASE_SERVICE_ACCOUNT` – JSON string of your service account
  - `FIREBASE_BUCKET` – Cloud Storage bucket name (optional)
  - `ZAPRITE_API_KEY`, `GH_OAUTH_CLIENT_ID`, `GH_OATH_CLIENT_SECRET`, `GH_OATH_CALLBACK_URL`
  - `INTERNAL_BTC_WALLET` and any other secrets

---

### Docker Image
The repository includes a `Dockerfile` for building a lightweight image
compatible with [NodeOps](https://docs.nodeops.network/). The container can run
an autonomous agent that generates and optionally inscribes signatures. Build
and run it:

```bash
docker build -t ordforms .
docker run -p 3000:3000 ordforms
```

The container exposes port `3000` and runs the Express server. Set your
environment variables with `-e` flags or a `.env` file. To have the container
autonomously generate and inscribe a signature, run:

```bash
docker run -e SIGNATURE_ENDPOINT=http://localhost:3000/api/signature ordforms npm run agent
```

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
- `/api/signature/:type?format=svg|html&inscribe=true&generative=true&name=Custom`
- `/api/auth/github`
- `/api/auth/github/callback`

### Testing the Signature Route

Run `npm run test:signature` to request an example signature and create an
inscription order via Ordinalsbot. The endpoint supports `generative=true` to
return HTML that loads [p5.js] via Ordinals recursion from inscription
`bed725759768159b0868fe0e6c9cd26a4c437f9e0903f70893edad280e35d843i0`. Pass
`name=OrdForms` to customize the rendered text. Ensure the server is running on
`localhost:3000` and that your `.env` includes a valid `ORDINALSBOT_API_KEY`.

---

## 🧠 Future Ideas

- Resume metadata extraction
- Reviewer/selection dashboard
---

## ⚖️ License
MIT — built permissionlessly.

The flow is:
1. `/case` - read the hackathon opportunity.
2. `/form` - submit personal or corporate data and upload your resume.
3. `/wallet` - connect Xverse and specify your Ordinals address.
4. `/signatrue` - create signature inscription for subject
5. `/timestamp` - push the hash via OP_RETURN.
6. `/success` - confirmation.
