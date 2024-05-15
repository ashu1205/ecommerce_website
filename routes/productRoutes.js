const express = require('express')
const router = express.Router();

//import controllers
const { createProduct, showProducts, deleteProduct, redirectToUpdate, updateProduct,
    getSingleProduct, addReview, deleteReview ,addToCart} 
    = require('../controllers/productController')

const auth = require('../middleware/auth')
const isSeller = require('../middleware/isSeller')
// router.get('/buynow',auth,(req,res,next)=>{
//     if(res.locals.user){
//         next()
//     }
//     else{
//         res.redirect('/login')
//     }
// } , buynow)

// ************ admin routes ***********
router.get('/createProduct', auth, isSeller, (req, res) => {
    res.render("products/createProduct.ejs")
})
router.post('/createProduct', auth, isSeller, createProduct)
router.delete('/deleteProduct/:id', auth, isSeller, deleteProduct)
router.get('/updateProduct/:id', auth, isSeller, redirectToUpdate)
router.patch('/updateProduct/:id', auth, isSeller, updateProduct)
// ************ admin routes end ***********

////********  product routes */
router.get('/home', auth, showProducts)
router.get('/product/:id', auth, getSingleProduct)

// ******* product routes end ****//

// *******review routes ****/
router.post('/review/:id', addReview)
router.delete('/review/:id/:pid', deleteReview)
// *******review routes end **/


/// **** add To cart ******//
router.post('/cart/:id',auth,addToCart)
module.exports = router