import Club from '../models/club.model.js';

function getClubs(req, res) {
  Club.find().then((clubs) => res.json(clubs));
}

function sendClub(req, res) {
  const club = new Club({
    name: req.body.name,
    stadium: req.body.stadium,
    coach: req.body.coach,
    budget: req.body.budget,
  });

  club.save().then((club) => res.json(club));
}

function updateClub(req, res) {
  const { clubId } = req.params;

  Club.findOneAndUpdate({ _id: clubId }, req.body, (error, updatedClub) => {
    res.json(updatedClub);
  });
}

function deleteClub(req, res) {
  const { clubId } = req.params;
  Club.findByIdAndDelete({ _id: clubId }, (error, doc) =>
    res.json({
      success: true,
      message: `The club with the id ${doc.id} has been deleted`,
    })
  );
}

export { getClubs, sendClub, updateClub, deleteClub };
