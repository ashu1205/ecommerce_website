const express=require('express')
const dbConnection=require('./db/database.js');
const app=express();
const path=require('path')
const methodOverride=require('method-override')
const PORT=8080
const ejsmate=require('ejs-mate')
const flash=require('connect-flash')
const session=require('express-session')
//routes
const productRoutes=require('./routes/productRoutes.js')
const userRoutes=require('./routes/userRoutes.js')

// database connection 
dbConnection();

//middlewares
// app.set('view engine','ejs') //without this , everytime on rendering we have to give extension
// app.set('views','views')
// app.engine('ejs',ejsmate)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000 * 1
    }
}))

app.use(flash())

app.engine('ejs', ejsmate)
app.set("view engine", "ejs");
app.set("views", "views")

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(require("cookie-parser")())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.warning = req.flash("warning");
    next()
})

app.use(productRoutes)
app.use(userRoutes)
//
app.listen(PORT,()=>{
    console.log(`server started at ${"http://localhost:8080/home"}`);
})

