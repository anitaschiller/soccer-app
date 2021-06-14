import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  price: Number,
  free_transfer: Boolean,
  club: String,
  position: String,
  skills: Array,
  email: String,
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
