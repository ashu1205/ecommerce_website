const Product=require('../models/productModel')

async function createProduct(req,res){
    try {
        
        // const {productName,productPrice,productDescription,productImageUrl,productCategory}=req.body;

        let data=await Product.create(req.body)

        if(data){
            // res.render("showProduct.ejs")
            console.log(data);
            res.redirect('/home')
        }
    } catch (error) {
        console.log("error "+error);
    }
}
async function showProducts(req,res){
    try {
        const data = await Product.find({});
        if(data){
            res.render("showProducts.ejs",{data ,user:res.locals.user})
        }
        else{
            console.log("error in fetching data");
        }
    } catch (error) {
        console.log("internal error - "+error);
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
            res.render('editProduct.ejs',{prod})
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

module.exports={createProduct,showProducts,deleteProduct,redirectToUpdate,updateProduct}