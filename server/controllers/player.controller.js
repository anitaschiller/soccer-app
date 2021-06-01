import Player from '../models/player.model.js';

function getPlayers(req, res) {
  Player.find().then((result) => res.json(result));
}

function sendPlayer(req, res) {
  const newPlayer = new Player({
    name: req.body.name,
    price: req.body.price,
    free_transfer: req.body.free_transfer,
    club: req.body.club,
    position: req.body.position,
    skills: req.body.skills,
    email: req.body.email,
  });

  newPlayer.save().then((result) => res.json(result));
}

function updatePlayer(req, res) {
  const { playerId } = req.params;
  const updatedPlayer = req.body;
  Player.findByIdAndUpdate({ _id: playerId }, req.body, (error, doc) => {
    res.json(doc);
  });
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
