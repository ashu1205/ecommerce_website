async function isSeller(req,res,next){
    try {
        console.log(res.locals.user);
        if(res.locals.user.isSeller){
            next()
        }
        else{
            return res.status(401).json({
                message:"this is a protected route for sellers"
            })
        }
        
    } catch (error) {
        res.json({
            message:"error in seller auth",
            error:error.message
        })
    }
}

module.exports=isSeller