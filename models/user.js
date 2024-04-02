const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      cart: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
        }],
     

});

module.exports=mongoose.model("User",userSchema)