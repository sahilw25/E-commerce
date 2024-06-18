const { saveProducts, fetchAllProducts, getProductById, updateProductById, deleteProductById} = require("../../models/Product");

exports.getAddProductPage = (req, res) => {
    const viewsdata = {
        edit: false,
        pageTitle: 'Add Product'
    };
    res.render('addproduct', viewsdata);
};

exports.postAddProductPage = (req, res) => {
    const product = {
        title: req.body.title,
        imageurl: req.body.image,
        price: req.body.price,
        description: req.body.description
    };
    saveProducts(product)
    .then(([product]) => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
    
};

exports.getAdminProductPage = (req, res) => {
    fetchAllProducts()
    .then(([products]) => {
        const viewsdata = {
            admin: true,
            pageTitle: 'Admin Products',
            products
        };
        res.render('product-list', viewsdata);
    })
    .catch((error) => {
        console.log(error);
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
        title:req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    };
    updateProductById(product, req.body.productId);
    res.redirect('/products');
};

exports.postDeleteProductPage = (req, res) => {
    const productId = req.body.productId;
    deleteProductById(productId, () => {
        res.redirect('/products');
    });
};