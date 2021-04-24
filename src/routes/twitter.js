const { Router } = require('express');
const passport = require('passport');
const router = Router();
const storedCookiesToRedirectionUrl = {};

router.get(
  '/login/twitter',
  (req, res, next) => {
    storedCookiesToRedirectionUrl[req.sessionID] =
      req.query.rel || req.headers.rel || req.rel || `http://${req.headers.host}/`;
    next();
  },
  passport.authenticate('twitter'),
);

router.get('/oauth/callback', passport.authenticate('twitter'), (req, res) => {
  console.log('came here now');
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

module.exports = router;
