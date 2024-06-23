const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductPage, getEditProductPage, postEditProductPage, postDeleteProductPage } = require('../controllers/admin/ProductController.js');
const router = express.Router();



router.get('/', getAdminProductPage);

router.get('/add', getAddProductPage);

router.post('/add',postAddProductPage);

router.get('/edit/:productId', getEditProductPage);

router.post('/edit', postEditProductPage);

router.post('/delete', postDeleteProductPage);


// router.get('/users',(req, res, next)=>{
//     const viewsdata = {
//         pageTitle: 'User Page',
//     }
//     res.render('user', viewsdata);
// });

module.exports = router;