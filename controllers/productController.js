const Product=require('../models/productModel')
const Review=require('../models/reviewModel')
const User=require('../models/user')
async function createProduct(req,res){
    try {
        
        // const {productName,productPrice,productDescription,productImageUrl,productCategory}=req.body;

        let data=await Product.create(req.body)

        if(data){
            // res.render("showProduct.ejs")
            console.log(data);
            req.flash("success","product added successfully")
            res.redirect('/home')
        }
    } catch (error) {
        console.log("error "+error);
    }
}
async function showProducts(req,res){
    try {
        const data = await Product.find({});
        // console.log(req.user);
        if(data){
            // console.log("Helllo")
            return res.render("products/showProducts.ejs",{data })
        }
        else{
            console.log("error in fetching data");
        }
    } catch (error) {
        console.log("internal error - "+error);
        
    }
    console.log("hello");
}
async function getSingleProduct(req,res){
    try {
        const id=req.params.id

        let product=await Product.findById(id).populate('reviews');

        return res.render("products/singleProduct.ejs",{
            product ,user:res.locals.user
        })
    } catch (error) {
        return res.json({
            message:"internal server error",
            error:error.message
        })
    }
}
async function deleteProduct(req,res){
    try {
        console.log("entered");
        const id=req.params.id;
        const resp=await Product.findByIdAndDelete(id);
        console.log(id);
        if(resp){
            console.log("product deleted");
            res.redirect('/home')

        }
        else{
            console.log("product not deleted");
        }
    } catch (error) {
        console.log("error in deleting "+error);
    }
}
async function redirectToUpdate(req,res){
    try {
        const id=req.params.id;
        const prod=await Product.findById({_id:id})
        if(prod){
            res.render('products/editProduct.ejs',{prod})
        }
        else{
            console.log("internal error ");
        }
    } catch (error) {
        console.log(error);
    }
}
async function updateProduct(req,res){
    try {
        const id=req.params.id;
        const {productName,productPrice,productDescription,productImageUrl,productCategory}=req.body;
        const resp=await Product.findByIdAndUpdate({_id:id},{productName,productPrice,productDescription,productImageUrl,productCategory})
        if(resp){
            res.redirect('/home')
        }
        else{
            console.log("internal error ");
        }
    } catch (error) {
        console.log(error);
    }
}
////add to cart
async function addToCart(req,res){
    try {
        if(res.locals.user){
            const uid=res.locals.user.userId;
            console.log(uid);
            const user=await User.findById(uid)
            console.log(user);
            const {id}=req.params

            const existIndex = user.cart.findIndex(item => item.productid.equals(id));

            if(existIndex!== -1){
                console.log("exist");
                user.cart[existIndex].qty++;
            }
            else{
                user.cart.push({productid:id})
            }
            
            res.locals.user.cart=user.cart.length
            console.log(res.locals.user.cart);
            await user.save()
            
            return res.redirect(`/product/${id}`)
        }
        else{
            res.redirect('/signin')
        }
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
// **************** review controllers ****//
async function addReview(req,res){
    try {
        const id=req.params.id
        let product=await Product.findById(id)

        const {rating , comment}=req.body
        console.log(req.body);
        let rev=await Review.create({rating , comment})

        product.reviews.push(rev)

        await product.save()

        return res.redirect(`/product/${id}`);
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
async function deleteReview(req,res){
    try {
        const {id ,pid}=req.params;
        await Review.findByIdAndDelete(id);
        let product=await Product.findById(pid)

        product.reviews=product.reviews.filter((rid)=> {return rid!==id})
        await product.save()

        res.redirect(`/product/${pid}`)
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

// **************** review controllers end ****//

module.exports={createProduct,showProducts,deleteProduct,
    redirectToUpdate,updateProduct,getSingleProduct,addReview,deleteReview,addToCart}