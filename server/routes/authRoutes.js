const express = require('express');
const passport = require('passport');
const { db } = require('../services/firebaseService');

const router = express.Router();

router.get('/linkedin', (_, res) => res.send('LinkedIn OAuth Placeholder'));

router.get('/github', passport.authenticate('github', { scope: ['read:user'] }));

router.get(
  '/github/callback',
  (req, res, next) => {
    console.log('GitHub callback route hit:', req.url);
    next();
  },
  passport.authenticate('github', { failureRedirect: '/' }),
  async (req, res) => {
    console.log('GitHub authentication successful, user:', req.user);
    console.log('GitHub user profile details:', {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
      emails: req.user.emails,
      photos: req.user.photos
    });
    console.log('GitHub user _json:', req.user._json);
    console.log('GitHub user raw object keys:', Object.keys(req.user));
    
    const user = req.user;
    if (user && db) {
      try {
        await db.collection('users').doc(user.id).set(
          { username: user.username },
          { merge: true }
        );
      } catch (error) {
        console.log('Error saving user to Firebase:', error.message);
      }
    }
    
    // Redirect back to form page with user data
    const githubUsername = user.username || '';
    const githubDisplayName = user._json?.name || user.displayName || '';
    
    const userData = encodeURIComponent(JSON.stringify({
      name: githubDisplayName, // Only use if there's actually a display name
      surname: '', // GitHub doesn't provide surname separately
      username: githubUsername, // Always use GitHub username
      avatar: user.photos?.[0]?.value || '',
      email: user.emails?.[0]?.value || ''
    }));
    
    console.log('Sending to frontend:', {
      username: githubUsername,
      name: githubDisplayName,
      hasName: !!githubDisplayName
    });
    
    res.redirect(`/form?github_user=${userData}`);
  }
);

module.exports = router;
