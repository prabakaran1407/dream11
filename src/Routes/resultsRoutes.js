import express from 'express';
const router = express.Router();

import { processResult, teamResults } from '../Controllers/results.js';

router.get('/process-result', processResult);
router.get('/team-result', teamResults);

export default router;
