import express from 'express';
import { postImage } from '../controllers/asset.controller.js';

const router = express.Router();

router.post('/upload', postImage);

export default router;
