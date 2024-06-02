import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
  Player: { type: String, required: true },
  Team: { type: String, required: true },
  Role: { type: String, required: true },
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
