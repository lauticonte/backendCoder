const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productos'
    }
  ],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const CartModel = mongoose.model('Carritos', cartSchema);

module.exports = CartModel;