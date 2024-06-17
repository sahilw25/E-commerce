const fs = require('fs');
const path = require('path');
const roothDir = require('../util/path');
const { error } = require('console');
const { deleteProductFromCart } = require('./cart');

const getProductsFromFile = (callBack) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    fs.readFile(productPath, (error, productsData) => {
        if(error){
            return callBack([]);
        }

        return callBack(JSON.parse(productsData));
    });
};

exports.saveProducts = (product) => {
    const productPath = path.join(roothDir, 'data', 'products.json');

    getProductsFromFile((productsData) => { 
        productsData.push(product);
        fs.writeFile(productPath, JSON.stringify(productsData), (error) => {
            console.log(error);
        });
    });
};

exports.fetchAllProducts = (callBack) => {
    getProductsFromFile(callBack);
};

exports.getProductById = (productId, callBack) => {
    getProductsFromFile((products) => {
        const product = products.find((p) => p.id.toString() === productId);
        callBack(product);
    });
};

exports.updateProductById = (product, productId) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    getProductsFromFile(products => {
        const existingProductIndex = products.findIndex(prod => prod.id.toString() === productId);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = product;
        fs.writeFile(productPath, JSON.stringify(updatedProducts), error => {
            console.log(error);
        });
    });
};

exports.deleteProductById = (productId, callBack) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    getProductsFromFile(products => {
        let updatedProducts = products.filter(product => product.id.toString() !== productId.toString() );
        deleteProductFromCart(productId);

        fs.writeFile(productPath, JSON.stringify(updatedProducts), error => {
            console.log(error);
        });
        callBack();
    });
};
