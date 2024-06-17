const express = require('express');
const router = express.Router();
const { getHomePage, getProductDetailPage } = require('../controllers/HomeController');
const { getCartPage, postCartPage, deleteCartItem } = require('../controllers/cartController');

router.get('/', getHomePage);
router.get('/product/details/:productId', getProductDetailPage);

router.post('/cart', postCartPage );
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem);

module.exports = router;    