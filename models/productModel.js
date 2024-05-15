const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true,
        trim:true
    },
    productImageUrl:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ]
    ,
    createdAt:{
        type:String,
        required:true,
        default:new Date(),
    }
    

})

module.exports=mongoose.model('Product',productSchema);