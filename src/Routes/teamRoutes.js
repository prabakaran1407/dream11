import express from 'express';
const router = express.Router();

import { createTeam } from '../Controllers/teamContoller.js';

router.post('/add-team', createTeam);

export default router;
