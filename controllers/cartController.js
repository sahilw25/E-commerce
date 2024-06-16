const { getProductById } = require("../models/Product");
const { addProductToCart } = require("../models/cart");

exports.postCartPage = (req,res) => {
    const productId = req.body.productId;
    getProductById(productId, product => {
        addProductToCart(productId, product.price );
        res.redirect('/');
    });

}

exports.getCartPage = (req,res) => {}