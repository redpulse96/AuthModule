const { Router } = require('express');
const router = Router();

const facebookRouter = require('./facebok');
const twitterRouter = require('./twitter');
const googleRouter = require('./google');

router.use(facebookRouter);
router.use(twitterRouter);
router.use(googleRouter);

module.exports = router;
