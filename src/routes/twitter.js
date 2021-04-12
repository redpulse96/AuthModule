const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.get(
  '/auth/twitter',
  passport.authenticate('twitter', {
    session: true,
    authInfo: true,
    passReqToCallback: true,
  }),
);

router.get('/oauth/callback', (req, res) => {
  passport.authenticate('twitter', {
    failureRedirect: process.env.REDIRECT_URL,
    successRedirect: process.env.REDIRECT_URL,
  });
  res.redirect(process.env.REDIRECT_URL);
});

module.exports = router;
