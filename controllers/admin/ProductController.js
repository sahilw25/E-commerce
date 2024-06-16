const { saveProducts, fetchAllProducts, getProductById, updateProductById} = require("../../models/Product");

exports.getAddProductPage = (req, res) => {
    const viewsdata = {
        edit: false,
        pageTitle: 'Add Product'
    };
    res.render('addproduct', viewsdata);
};

exports.postAddProductPage = (req, res) => {
    const product = {
        id: Date.now(),
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    };
    saveProducts(product);
    res.redirect('/');
};

exports.getAdminProductPage = (req, res) => {
    fetchAllProducts((products) => {
        const viewsdata = {
            admin: true,
            pageTitle: 'Admin Products',
            products
        };
        res.render('product-list', viewsdata);
    });
};

exports.getEditProductPage = (req, res) => {
    const productId = req.params.productId;
    getProductById(productId, (product) => {
        const viewsdata = {
            edit: true,
            product,
            pageTitle: 'Edit Product'
    };
    res.render('addproduct', viewsdata);    
    });  
};

exports.postEditProductPage = (req, res) => {
    const product = {
      id: req.body.productId,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    };
    updateProductById(product, req.body.productId);
    res.redirect('/products');
  };

