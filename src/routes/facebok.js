const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/return',
  passport.authenticate('facebook', {
    failureRedirect: process.env.REDIRECT_URL,
    successRedirect: process.env.REDIRECT_URL,
  }),
  function (req, res) {
    console.log('came here now');
    res.redirect('/');
  },
);

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
  res.render('profile', { user: req.user });
});

module.exports = router;
