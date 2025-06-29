# 🏗️ OrdForms Infrastructure Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    ORDFORMS                                     │
│                           Permissionless Submission Tool                        │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │   React App     │    │   TypeScript    │    │   Webpack       │            │
│  │   (Port 8080)   │    │   Components    │    │   Dev Server    │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
│           │                       │                       │                    │
│           └───────────────────────┼───────────────────────┘                    │
│                                   │                                            │
│  ┌─────────────────────────────────┼─────────────────────────────────────────┐  │
│  │                           SASS/SCSS Styling                              │  │
│  │  • formPage.scss                                                          │  │
│  │  • main.scss                                                              │  │
│  └─────────────────────────────────┼─────────────────────────────────────────┘  │
│                                   │                                            │
│  ┌─────────────────────────────────┼─────────────────────────────────────────┐  │
│  │                        React Router Pages                                │  │
│  │  • /case (CaseStudy)                                                    │  │
│  │  • /form (FormPage)                                                     │  │
│  │  • /wallet (WalletPage)                                                 │  │
│  │  • /timestamp (TimestampPage)                                           │  │
│  │  • /success (Success)                                                   │  │
│  └─────────────────────────────────┼─────────────────────────────────────────┘  │
└───────────────────────────────────┼─────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 API GATEWAY                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │   Express.js    │    │   CORS          │    │   Session       │            │
│  │   (Port 3000)   │    │   Middleware    │    │   Management    │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
│           │                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                              API ROUTES                                 │  │
│  │  • /api/auth/* (GitHub OAuth)                                          │  │
│  │  • /api/submission/* (Form handling)                                   │  │
│  │  • /api/bitcoin/* (Wallet & payments)                                  │  │
│  │  • /api/signature/* (AI signature generation)                          │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               SERVICE LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │  Firebase       │    │  Zaprite        │    │  PayPal         │            │
│  │  Service        │    │  Service        │    │  Service        │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
│           │                       │                       │                    │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │  Ordinals       │    │  Timestamp      │    │  OP_RETURN      │            │
│  │  Service        │    │  Service        │    │  Service        │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │   GitHub        │    │   Firebase      │    │   Zaprite       │            │
│  │   OAuth API     │    │   Firestore     │    │   Bitcoin API   │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
│           │                       │                       │                    │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  │   OrdinalsBot   │    │   PayPal        │    │   Bitcoin       │            │
│  │   API           │    │   API           │    │   Testnet4      │            │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Technology Stack Details

### Frontend Stack
- **Framework**: React 18.3.1 + TypeScript 5.8.3
- **Routing**: React Router DOM 6.30.1
- **Styling**: Sass/SCSS with CSS modules
- **Build Tool**: Webpack 5.99.9
- **Development**: Webpack Dev Server (Port 8080)
- **State Management**: React Hooks (useState, useEffect)

### Backend Stack
- **Runtime**: Node.js 18 (Alpine Linux)
- **Framework**: Express.js 4.21.2
- **Authentication**: Passport.js + GitHub OAuth2
- **File Upload**: Multer 2.0.1
- **PDF Processing**: pdf-parse 1.1.1
- **Sessions**: express-session 1.18.1
- **CORS**: cors 2.8.5

### External Integrations
- **Database**: Firebase Firestore
- **Storage**: Firebase Cloud Storage
- **Authentication**: GitHub OAuth2
- **Payments**: 
  - Zaprite (Bitcoin payments)
  - PayPal (USD stablecoin)
- **Blockchain**: 
  - Bitcoin Testnet4
  - Ordinals inscriptions via OrdinalsBot
  - OP_RETURN for timestamping
- **AI**: Signature generation service

## 🚀 Deployment Architecture

### Development Environment
```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   Port 8080     │◄──►│   Port 3000     │
│   (Webpack)     │    │   (Express)     │
└─────────────────┘    └─────────────────┘
```

### Production Environment (Vercel)
```
┌─────────────────────────────────────────────────────────────────┐
│                           VERCEL                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   Static Build  │    │   Serverless    │                    │
│  │   (dist/client) │    │   Functions     │                    │
│  │   React App     │    │   (server/)     │                    │
│  └─────────────────┘    └─────────────────┘                    │
│           │                       │                            │
│  ┌─────────────────────────────────┼─────────────────────────┐  │
│  │                    Vercel Routing                          │  │
│  │  • /api/* → Serverless Functions                          │  │
│  │  • /* → Static React App                                  │  │
│  └─────────────────────────────────┼─────────────────────────┘  │
└───────────────────────────────────┼─────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                       │
│  GitHub OAuth | Firebase | Zaprite | PayPal | OrdinalsBot      │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. User Authentication Flow
```
User → GitHub OAuth → Callback → Session → Form Access
```

### 2. Form Submission Flow
```
Form Data → PDF Upload → Firebase Storage → Hash Generation → Timestamp
```

### 3. Payment Flow
```
User → Wallet Connection → Payment Selection → Zaprite/PayPal → Confirmation
```

### 4. Blockchain Integration Flow
```
Document → Hash → OP_RETURN → Bitcoin Testnet4 → Ordinals Inscription
```

## 🔐 Security Architecture

### Authentication
- **GitHub OAuth2**: User identity verification
- **Session Management**: Express sessions with secure cookies
- **CORS**: Configured for production domains

### Data Protection
- **Environment Variables**: Sensitive data stored in Vercel env vars
- **Firebase Security Rules**: Database access control
- **File Validation**: PDF format validation and virus scanning

### Blockchain Security
- **Testnet**: All operations on Bitcoin testnet4
- **Wallet Integration**: Xverse wallet for secure key management
- **OP_RETURN**: Immutable timestamping on Bitcoin blockchain

## 📊 Monitoring & Logging

### Application Monitoring
- **Vercel Analytics**: Performance and error tracking
- **Console Logging**: Server-side debugging
- **Error Handling**: Graceful degradation for service failures

### Blockchain Monitoring
- **Transaction Tracking**: Bitcoin testnet explorer integration
- **Inscription Status**: OrdinalsBot API status monitoring
- **Payment Verification**: Zaprite and PayPal webhook handling

## 🚀 Scalability Considerations

### Horizontal Scaling
- **Serverless**: Vercel functions auto-scale
- **CDN**: Static assets served globally
- **Database**: Firebase Firestore auto-scaling

### Performance Optimization
- **Code Splitting**: Webpack optimization for bundle size
- **Caching**: Browser and CDN caching strategies
- **Lazy Loading**: React components loaded on demand

## 🔧 Development Workflow

### Local Development
```bash
npm run dev          # Start both frontend and backend
npm run dev:client   # Frontend only (Port 8080)
npm run dev:server   # Backend only (Port 3000)
```

### Production Build
```bash
npm run build        # Build client for production
npm start           # Start production server
```

### Docker Deployment
```bash
docker build -t ordforms .
docker run -p 3000:3000 ordforms
```

## 📋 Environment Variables

### Required for Development
```env
# GitHub OAuth
GH_OAUTH_CLIENT_ID_DEV
GH_OAUTH_CLIENT_SECRET_DEV
GH_OAUTH_CALLBACK_URL_DEV

# Firebase
FIREBASE_SERVICE_ACCOUNT
FIREBASE_BUCKET

# Payments
ZAPRITE_API_KEY
INTERNAL_BTC_WIF

# Blockchain
ORDINALSBOT_API_KEY
```

### Required for Production
```env
# GitHub OAuth
GH_OAUTH_CLIENT_ID
GH_OAUTH_CLIENT_SECRET
GH_OAUTH_CALLBACK_URL

# Session
SESSION_SECRET

# All other development variables
```

## 🎯 Key Features Architecture

### Voucher-Gated Access
- Environment variable validation
- Form access control
- Session-based permissions

### AI Signature Generation
- Autonomous agent support
- SVG/HTML format output
- Ordinals inscription integration

### Multi-Chain Security
- Bitcoin OP_RETURN timestamping
- Ordinals inscription storage
- Cross-chain verification

This infrastructure provides a robust, scalable foundation for the permissionless submission tool with comprehensive blockchain integration and modern web development practices. 