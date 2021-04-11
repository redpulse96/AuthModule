const { Router } = require('express');
const router = Router();
const { joinMeHandler, callbackFn } = require('../handlers');

router.post('/auth/joinme', joinMeHandler);
router.get('/auth/joinme/callback', callbackFn);
// router.get('/auth/joinme/callback?qs', callbackFn);
router.post('/auth/joinme/token', callbackFn);

module.exports = router;
