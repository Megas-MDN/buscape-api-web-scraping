const { Router } = require('express');
const errorHandler = require('../middlewares/errorHandler');
const notImplemented = require('../middlewares/notImplemented');
const productsController = require('../controllers/productsController');

const router = Router();
router.get('/', productsController.getAll);

router.get('/buscape/tv', productsController.getByCategoryTV);
// router.get('/buscape/geladeira', productsController);
// router.get('/buscape/celular', productsController);

router.use(notImplemented);
router.use(errorHandler);

module.exports = router;
