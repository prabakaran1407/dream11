import express from 'express';
const router = express.Router();

import { createMatch } from '../Controllers/matchController.js';

router.post('/createMatch', createMatch);

export default router;
