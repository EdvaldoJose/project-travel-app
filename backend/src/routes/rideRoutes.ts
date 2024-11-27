import { Router } from 'express';
import { estimateRide, confirmRide, getRides } from '../controllers/rideController';

const router = Router();

router.post('/estimate', estimateRide);
router.patch('/confirm', confirmRide);
router.get('/:customer_id', getRides);

export default router;
