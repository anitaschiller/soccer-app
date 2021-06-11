import Player from '../models/player.model.js';

function getPlayers(req, res) {
  Player.find()
    .populate('image')
    .exec((error, result) => {
      if (error) {
        res.json(error.message);
      } else {
        res.json(result);
      }
    });
}

async function sendPlayer(req, res) {
  const newPlayer = new Player({
    ...req.body,
  });

  try {
    const savedPlayer = await newPlayer.save();
    const savedPlayerWithImage = await savedPlayer
      .populate('image')
      .execPopulate();
    res.json(savedPlayerWithImage);
  } catch {
    res.json({ success: false, message: error.message });
  }
}

async function updatePlayer(req, res) {
  const { playerId } = req.params;
  const playerToUpdate = {
    ...req.body,
  };

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      { _id: playerId },
      playerToUpdate
    ).populate('image');
    res.json(updatedPlayer);
  } catch {
    res.json({ success: false, message: error.message });
  }
}

function deletePlayer(req, res) {
  const { playerId } = req.params;
  Player.findByIdAndDelete({ _id: playerId }, (error, doc) => {
    res.json({
      success: true,
      message: `The player with the id ${playerId} has been deleted`,
      data: doc,
    });
  });
}

export { getPlayers, sendPlayer, updatePlayer, deletePlayer };
