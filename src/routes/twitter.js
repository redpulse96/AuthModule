const { Router } = require('express');
const passport = require('passport');
const router = Router();
const storedCookiesToRedirectionUrl = {};

router.get(
  '/login/twitter',
  (req, res, next) => {
    storedCookiesToRedirectionUrl[req.sessionID] =
      req.headers.rel || req.rel || `http://${req.headers.host}/`;
    next();
  },
  passport.authenticate('twitter', {
    session: true,
    authInfo: true,
    passReqToCallback: true,
    successReturnToOrRedirect: 'http://localhost:8080/oauth/callback',
    successRedirect: 'http://localhost:8080/oauth/callback',
  }),
);

router.get('/oauth/callback', (req, res) => {
  let redirectUrl;
  for (const key in storedCookiesToRedirectionUrl) {
    if (req.sessionStore && req.sessionStore.sessions && req.sessionStore.sessions[key]) {
      redirectUrl = storedCookiesToRedirectionUrl[key];
    }
  }
  passport.authenticate('twitter', {
    failureRedirect: redirectUrl,
    successRedirect: redirectUrl,
  });
  res.redirect(redirectUrl);
});

module.exports = router;
