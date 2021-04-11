const { Router } = require('express');
const router = Router();

const facebookRouter = require('./facebok');
const twitterRouter = require('./twitter');
const googleRouter = require('./google');
const joinMeRouter = require('./joinme');

router.use(facebookRouter);
router.use(twitterRouter);
router.use(googleRouter);
router.use(joinMeRouter);

module.exports = router;
