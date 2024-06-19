const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require('../models/cart');
const { getProductById, fetchAllProducts } = require('../models/Product');
const Product = require('../models/ProductModel');

exports.postCartPage = (req, res) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
  .then((product) => {
    addProductToCart(productId, product.price);
    res.redirect('/');
  })
  .catch((error) => {
    console.log(error);
  })
};

exports.getCartPage = (req, res) => {
  getCartDetailsFromFile((cart) => {
    const cartProducts = cart.products;

    Product.findAll()
    .then((products) => {
      const productsData = [];
      let totalPrice = 0;
      for (let cartItem of cartProducts) {
        let singleProduct = products.find((prod) => prod.id.toString() === cartItem.id.toString());
        cartProductPrice = +cartItem.quantity * +singleProduct.price;
        totalPrice += cartProductPrice;
        productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice });
      }

      const viewsData = {
        pageTitle: 'Cart Details',
        cartProducts: productsData,
        totalPrice
      };

      res.render('cartDetails', viewsData);
    }).catch((error) => {
      console.log(error);
    });
  });
};

exports.deleteCartItem = (req, res) => {
    const productId = req.body.productId;
    deleteProductFromCart(productId, () => {
        res.redirect('/cart');
    });
};