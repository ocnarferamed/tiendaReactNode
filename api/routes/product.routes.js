const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');


router.get('/all', product.getProducts);
router.put('/update/:id', product.updateProducts);


module.exports = router;