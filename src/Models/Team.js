import mongoose from 'mongoose';
import { type } from 'os';

const teamSchema = mongoose.Schema({
  teamName: { type: String, required: true },
  players: { type: JSON, required: true },
  captain: { type: String, required: true },
  viceCaptain: { type: String, required: true },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
