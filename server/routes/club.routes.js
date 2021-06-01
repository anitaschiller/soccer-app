import express from 'express';
import {
  getClubs,
  sendClub,
  updateClub,
  deleteClub,
} from '../controllers/club.controller.js';

const router = express.Router();

router.get('/clubs', getClubs);
router.post('/clubs', sendClub);
router.put('/clubs/:clubId', updateClub);
router.delete('/clubs/:clubId', deleteClub);

export default router;
