import mongoose from 'mongoose';

const shoppingCartSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    },
  ],
  transferSum: { type: Number },
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
