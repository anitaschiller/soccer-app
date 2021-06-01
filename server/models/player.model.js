import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  free_transfer: Boolean,
  club: String,
  position: String,
  skills: Array,
  email: String,
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
