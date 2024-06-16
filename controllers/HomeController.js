const {fetchAllProducts, getProductById } = require("../models/Product");

exports.getHomePage = (req, res) =>{
    fetchAllProducts((products) => {
        const viewsdata = {
        admin: false,
        products,
        pageTitle: 'Home Page - Products List'
    };
    res.render('product-list', viewsdata);
    });
};

exports.getProductDetailPage = (req, res) => {
    const productId = req.params.productId;
    getProductById(productId, (product) => {
        const viewsdata = {
            product,
            pageTitle: product.title
        };
        res.render('ProductDetail', viewsdata);
    });
};

  