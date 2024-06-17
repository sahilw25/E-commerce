const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');

const getCartDetailFromFile = (callBack) => {
    const cartPath = path.join(rootDir, 'data', 'cart.json');
    fs.readFile(cartPath, (error, cartContent) => {
        let cart = {products: []};

        if(!error){
            cart = JSON.parse(cartContent);
        }

        return callBack(cart);
    });
}

exports.addProductToCart = (productId, productPrice) => {
    const cartPath = path.join(rootDir, 'data', 'cart.json');

    getCartDetailFromFile(cart => {
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() == productId);
        let updatedProduct;

        if(existingProductIndex != -1){
            updatedProduct = {...cart.products[existingProductIndex]};
            updatedProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else{
            updatedProduct = { id: productId, quantity:1};
            cart.products = [...cart.products, updatedProduct];
        }

        fs.writeFile(cartPath, JSON.stringify(cart), (error) => {
            console.log(error);
        });
    });
};

exports.deleteProductFromCart = (productId) => {
    const cartPath = path.join(rootDir, 'data', 'cart.json');
    getCartDetailFromFile(cart => {
        let cartProducts = cart.products;
        let updatedCartProducts = cartProducts.filter(prod => prod.id.toString() != productId.toString());

        fs.writeFile(cartPath, JSON.stringify(updatedCartProducts), (error) => {
            console.log(error);
        });
    });
};