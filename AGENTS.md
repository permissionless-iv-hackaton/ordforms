# Contribution Guidelines

This repository contains a modern web application with a React frontend and an Express backend. The goal is to provide a voucher–gated submission tool for grants and tenders, integrating Bitcoin Ordinals and payment options.

## Structure
- `client/` – React application built with TypeScript and Webpack.
- `server/` – Express API with routes for submissions, wallet integration and payments.
- `api/` – entry point used by Vercel to start the server.

## Setup
1. Install dependencies with `npm install`.
2. Create `firebase-adminsdk.json` or set `FIREBASE_SERVICE_ACCOUNT` with your Firebase service account JSON.
3. Set `FIREBASE_BUCKET` for Cloud Storage.
4. Provide additional env variables such as `ZAPRITE_API_KEY`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_CALLBACK_URL` and `INTERNAL_BTC_WALLET`.
5. Run `npm run dev` for development or `npm run build` for production.

## Notes for Codex Agents
- Firebase credentials are **required**. The application will fail to start without them.
- Run `npm run build:client` before committing changes that affect the frontend bundle.
- Ensure any added npm packages are saved in `package.json`.
