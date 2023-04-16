const { Router } = require('express');
const errorHandler = require('../middlewares/errorHandler');
const notImplemented = require('../middlewares/notImplemented');
const productsController = require('../controllers/productsController');

const router = Router();
router.get('/', productsController.getAll);
router.get('/test', (req, res) =>
  res.status(200).send({ message: 'Test ok!' })
);

router.get('/search', productsController.search);

router.use(notImplemented);
router.use(errorHandler);

module.exports = router;
