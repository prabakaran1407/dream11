import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
});
const resultSchema = mongoose.Schema(
  {
    teamName: { type: String, required: true },
    players: [playerSchema],
    captain: {
      name: { type: String, required: true },
      points: { type: Number, required: true },
    },
    viceCaptain: {
      name: { type: String, required: true },
      points: { type: Number, required: true },
    },
    totalPoints: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const Result = mongoose.model('ProcessResult', resultSchema);
export default Result;
