import Player from '../models/player.model.js';
import ShoppingCart from '../models/shoppingCart.model.js';

async function getShoppingCart(req, res) {
  const { clubId } = req.params;
  const shoppingCart = await ShoppingCart.findOne({ club: clubId }).populate(
    'players.player'
  );

  res.json(shoppingCart);
}

async function postShoppingCart(req, res) {
  const { clubId } = req.params;
  const clubCart = await ShoppingCart.findOne({ club: clubId });
  const player = await Player.findOne({ _id: req.body.player });

  if (!clubCart) {
    const newShoppingCart = new ShoppingCart({
      club: clubId,
      players: [{ _id: player._id, player: player }],
      transferSum: player.price,
    });

    const savedShoppingCart = await newShoppingCart.save();
    const shoppingCartDetails = await savedShoppingCart
      .populate('players.player')
      .execPopulate();
    res.json(shoppingCartDetails);
  } else {
    clubCart.players.push({ _id: player._id, player: player });
    clubCart.transferSum += player.price;
    const updatedCart = await ShoppingCart.findByIdAndUpdate(
      clubCart._id,
      clubCart
    ).populate('players.player');
    res.json(updatedCart);
  }
}

async function updateShoppingCart(req, res) {
  const { clubId } = req.params;
  const players = req.body.players;
  const actualPlayers = await Player.find({
    _id: { $in: players.map((player) => player.player._id) },
  });
  const transferSum = actualPlayers
    .map((player) => player.price)
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const shoppingCartToUpdate = await ShoppingCart.findOne({ club: clubId });
  console.log(shoppingCartToUpdate);
  shoppingCartToUpdate.players = actualPlayers.map((player) => ({
    _id: player._id,
    player: player,
  }));
  shoppingCartToUpdate.transferSum = transferSum;

  const finallyUpdatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
    shoppingCartToUpdate._id,
    shoppingCartToUpdate
  ).populate('players.player');

  res.json(finallyUpdatedShoppingCart);
}

export { getShoppingCart, postShoppingCart, updateShoppingCart };
