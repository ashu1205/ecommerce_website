const express=require('express')
const router=express.Router();

//import controllers
const {createProduct,showProducts,deleteProduct,redirectToUpdate,updateProduct}=require('../controllers/productController')
//middleware
const auth=require('../middleware/auth')
//mapping
router.get('/home',auth,showProducts)
// router.get('/buynow',auth,(req,res,next)=>{
//     if(res.locals.user){
//         next()
//     }
//     else{
//         res.redirect('/login')
//     }
// } , buynow)

// ************ admin routes ***********
router.get('/createProduct',(req,res)=>{
    res.render("createProduct.ejs")
})
router.post('/createProduct',createProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.get('/updateProduct/:id',redirectToUpdate)
router.patch('/updateProduct/:id',updateProduct)
// ************ admin routes end ***********


module.exports=router