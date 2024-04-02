const mongoose=require('mongoose');

const URL="mongodb://127.0.0.1:27017/ecommerce"

async function dbConnection(){
    try {
        let connect=await mongoose.connect(URL)
        console.log("db connected successfully");
    } catch (error) {
        console.log("db connection failed with error ->"+error);
    }
}

module.exports=dbConnection;