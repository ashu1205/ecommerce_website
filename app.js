const express=require('express')
const dbConnection=require('./db/database');
const app=express();
const path=require('path')
const methodOverride=require('method-override')
const PORT=8080
//
app.set('view engine','ejs') //without this , everytime on rendering we have to give extension
app.set('views','views')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(methodOverride("_method"));
app.use(require("cookie-parser")())

//routes
const productRoutes=require('./routes/productRoutes.js')
const userRoutes=require('./routes/userRoutes.js')
app.use(productRoutes)
app.use(userRoutes)
//
app.use('/',(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log("server started at port no 8080 ");
})

// database connection 
dbConnection();