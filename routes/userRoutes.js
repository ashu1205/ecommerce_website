const express=require('express')
const router=express.Router();

//import controllers
const {signup,signin}=require('../controllers/userController')
//middleware
const auth=require('../middleware/auth')
//mapping

router.get('/signin',auth,(req,res)=>{
    if(res.locals.user){
        return res.json({
            message:"already logged in"
        })
    }
    res.render('products/login',{user:res.locals.user});
})
router.get('/signup',auth,(req,res)=>{
    if(res.locals.user){
        return res.json({
            message:"already logged in"
        })
    }
    res.render('products/signup',{user:res.locals.user});

})
router.post('/signin',signin)
router.post('/signup',signup)
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/home');
});


module.exports=router