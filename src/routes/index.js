const { Router } = require('express');
const errorHandler = require('../middlewares/errorHandler');
const notImplemented = require('../middlewares/notImplemented');
const buscapeController = require('../controllers/productsController');

const router = Router();
router.get('/', (req, res) => res.sendStatus(200));

router.get('/buscape/tv', buscapeController.getByCategoryTV);
// router.get('/buscape/geladeira', buscapeController);
// router.get('/buscape/celular', buscapeController);

router.use(notImplemented);
router.use(errorHandler);

module.exports = router;
