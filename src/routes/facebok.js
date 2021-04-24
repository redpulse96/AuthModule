const { Router } = require('express');
const passport = require('passport');
const router = Router();
const storedCookiesToRedirectionUrl = {};

router.get(
  '/auth/facebook',
  (req, res, next) => {
    storedCookiesToRedirectionUrl[req.sessionID] =
      req.query.rel || req.headers.rel || req.rel || `http://${req.headers.host}/`;
    next();
  },
  passport.authenticate('facebook'),
);

router.get('/return', passport.authenticate('facebook'), (req, res) => {
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

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;
