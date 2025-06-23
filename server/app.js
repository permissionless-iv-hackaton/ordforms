const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const authRoutes = require('./routes/authRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const bitcoinRoutes = require('./routes/bitcoinRoutes');
const uploadRoutes = require('./routes/upload.js');


dotenv.config();

const app = express();

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || '/api/auth/github/callback'
      },
      (_accessToken, _refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ordforms-secret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/bitcoin', bitcoinRoutes);
app.use('/api', uploadRoutes);

app.get('/', (_, res) => res.send('Permissionless Submission Backend Running'));

module.exports = app;
