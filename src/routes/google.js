const { Router } = require('express');
const passport = require('passport');
const { fetchCalenderDetails } = require('../handlers');
const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

router.get('/google/calender/fetch', fetchCalenderDetails);

module.exports = router;
