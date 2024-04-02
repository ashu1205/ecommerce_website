const express=require('express')
const router=express.Router();

//import controllers
const {signup,signin}=require('../controllers/userController')
//middleware
const auth=require('../middleware/auth')
//mapping

router.get('/signin',(req,res)=>{
    res.render('login');
})
router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signin',signin)
router.post('/signup',signup)
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/home');
});



module.exports=router