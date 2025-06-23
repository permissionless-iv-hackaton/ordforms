import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import authRoutes from './routes/authRoutes';
import submissionRoutes from './routes/submissionRoutes';
import bitcoinRoutes from './routes/bitcoinRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/api/auth/github/callback',
    },
    (_accessToken: string, _refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: (err: any, user?: unknown) => void) => {
  done(null, obj);
});

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'ordforms-secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/bitcoin', bitcoinRoutes);

app.get('/', (_, res) => res.send('Permissionless Submission Backend Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
