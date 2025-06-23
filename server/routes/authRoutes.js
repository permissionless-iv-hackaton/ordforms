const express = require('express');
const passport = require('passport');
const { db } = require('../services/firebaseService');

const router = express.Router();

router.get('/linkedin', (_, res) => res.send('LinkedIn OAuth Placeholder'));

router.get('/github', passport.authenticate('github', { scope: ['read:user'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  async (req, res) => {
    const user = req.user;
    if (user) {
      await db.collection('users').doc(user.id).set(
        { username: user.username },
        { merge: true }
      );
    }
    res.redirect('/success');
  }
);

module.exports = router;
