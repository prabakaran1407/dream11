import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
  ID: { type: Number, required: true },
  innings: { type: Number, required: true },
  overs: { type: Number, required: true },
  ballnumber: { type: Number, required: true },
  batter: { type: String, required: true },
  bowler: { type: String, required: true },
  nonStriker: { type: String, required: true },
  extraType: { type: String, required: true },
  batsmanRun: { type: Number, required: true },
  extrasRun: { type: Number, required: true },
  totalRun: { type: Number, required: true },
  nonBoundary: { type: Number, required: true },
  isWicketDelivery: { type: Boolean, required: true },
  playerOut: { type: String, required: true },
  kind: { type: String, required: true },
  fieldersInvolved: { type: String, required: true },
  battingTeam: { type: String, required: true },
});

const Match = mongoose.model('Match', matchSchema);
export default Match;
