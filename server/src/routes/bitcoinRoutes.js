import express from 'express';
import {
  linkWallet,
  storeOrdinalsAddress,
  initiateZapritePayment,
} from '../controllers/bitcoinController';

const router = express.Router();

router.post('/wallet/link', linkWallet);
router.post('/ordinals/store', storeOrdinalsAddress);
router.post('/zaprite/pay', initiateZapritePayment);

export default router;