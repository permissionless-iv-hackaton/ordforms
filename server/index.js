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
const signatureRoutes = require('./routes/signatureRoutes');


dotenv.config();

const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';

const clientID = isDevelopment 
  ? process.env.GH_OAUTH_CLIENT_ID_DEV 
  : process.env.GH_OAUTH_CLIENT_ID;

const clientSecret = isDevelopment 
  ? process.env.GH_OAUTH_CLIENT_SECRET_DEV 
  : process.env.GH_OAUTH_CLIENT_SECRET;

const callbackURL = isDevelopment
  ? process.env.GH_OAUTH_CALLBACK_URL_DEV
  : process.env.GH_OAUTH_CALLBACK_URL;

if (clientID && clientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      (_accessToken, _refreshToken, profile, done) => {
        done(null, profile);
      }
    )
  );
} else {
  console.log('GitHub OAuth not configured - skipping GitHub authentication');
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
app.use('/api/signature', signatureRoutes);

app.get('/', (_, res) => res.send('Permissionless Submission Backend Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
