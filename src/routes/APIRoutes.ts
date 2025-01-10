import { Router } from 'express';
import { getCoinData, getDeviation } from '../controllers/CryptoDataController';

const router = Router();

router.get('/stats', getCoinData);
router.get('/deviation', getDeviation);

export default router;
