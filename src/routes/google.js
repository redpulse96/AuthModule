const { Router } = require('express');
const passport = require('passport');
const { fetchCalenderDetails } = require('../handlers');
const router = Router();
let storedCookiesToRedirectionUrl = {};

router.get(
  '/auth/google',
  (req, res, next) => {
    storedCookiesToRedirectionUrl[req.sessionID] =
      req.headers.rel || req.rel || `http://${req.headers.host}/`;
    next();
  },
  passport.authenticate('google', { scope: ['profile'] }),
);

router.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
  // Successful authentication, redirect home.
  let redirectUrl = '';
  for (const key in storedCookiesToRedirectionUrl) {
    if (req.sessionStore && req.sessionStore.sessions && req.sessionStore.sessions[key]) {
      redirectUrl = storedCookiesToRedirectionUrl[key];
    }
  }
  res.redirect(redirectUrl);
});

router.get('/google/calender/fetch', fetchCalenderDetails);

module.exports = router;
