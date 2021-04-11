const { Router } = require('express');
const passport = require('passport');
const router = Router();
const { joinMeHandler } = require('../handlers');

router.post('/auth/joinme', passport.authenticate('local'), joinMeHandler);

module.exports = router;
