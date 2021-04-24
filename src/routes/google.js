const { Router } = require('express');
const passport = require('passport');
const { fetchCalenderDetails } = require('../handlers');
const router = Router();
const storedCookiesToRedirectionUrl = {};

router.get(
  '/auth/google',
  (req, res, next) => {
    storedCookiesToRedirectionUrl[req.sessionID] =
      req.query.rel || req.headers.rel || req.params.rel || `http://${req.headers.host}/`;
    next();
  },
  passport.authenticate('google'),
);

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // Successful authentication, redirect home.
  let redirectUrl = '';
  for (const key in storedCookiesToRedirectionUrl) {
    if (req.sessionStore && req.sessionStore.sessions && req.sessionStore.sessions[key]) {
      redirectUrl = storedCookiesToRedirectionUrl[key];
    }
  }
  const buff = new Buffer.from(JSON.stringify(req.profile));
  redirectUrl += `?response=${buff.toString('base64')}`;
  return res.redirect(redirectUrl);
});

router.get('/auth/google-calendar/callback', (req, res) => {
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
