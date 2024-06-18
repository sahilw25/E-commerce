const {fetchAllProducts, getProductById } = require("../models/Product");

exports.getHomePage = (req, res) =>{
    fetchAllProducts()
    .then(([products]) => {
        const viewsdata = {
            admin: false,
            products,
            pageTitle: 'Home page'
        };
        res.render('product-list', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getProductDetailPage = (req, res) => {
    const productId = req.params.productId;
    getProductById(productId)
    .then(([product]) => {
        const viewsdata = {
            product: product[0],
            pageTitle: product[0].title
        };
        res.render('ProductDetail', viewsdata);
    }).catch((error) => {
        console.log(error);
    });
};

  