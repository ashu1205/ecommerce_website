const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  },
  cart: [{
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    qty:{
      type:Number,
      default:1
    }
  }
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'userOrder'
    }
  ],
  products: [{
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }]


});

module.exports = mongoose.model("User", userSchema)