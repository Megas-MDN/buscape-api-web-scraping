const { Router } = require('express');
const errorHandler = require('../middlewares/errorHandler');
const notImplemented = require('../middlewares/notImplemented');

const router = Router();
router.get('/', (req, res) => res.sendStatus(200));

router.use(notImplemented);
router.use(errorHandler);

module.exports = router;
