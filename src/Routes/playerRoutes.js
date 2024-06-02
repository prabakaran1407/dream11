import express from 'express';
const router = express.Router();
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from '../Controllers/playerController.js';

router.post('/players', createPlayer);
router.get('/players', getPlayers);
router.get('/players/:id', getPlayerById);
router.patch('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);

export default router;
