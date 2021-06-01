import express from 'express';
import {
  getPlayers,
  sendPlayer,
  updatePlayer,
  deletePlayer,
} from '../controllers/player.controller.js';

const router = express.Router();

router.get('/players', getPlayers);
router.post('/players', sendPlayer);
router.put('/players/:playerId', updatePlayer);
router.delete('/players/:playerId', deletePlayer);

export default router;
