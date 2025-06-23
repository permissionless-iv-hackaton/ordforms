import express from 'express';
import {
  linkWallet,
  storeOrdinalsAddress,
  initiateZapritePayment,
  initiatePaypalPayment,
  getInscriptionCost,
  inscribeSubmission,
  pushOpReturnHash,
} from '../controllers/bitcoinController';

const router = express.Router();

router.post('/wallet/link', linkWallet);
router.post('/ordinals/store', storeOrdinalsAddress);
router.post('/zaprite/pay', initiateZapritePayment);
router.post('/paypal/pay', initiatePaypalPayment);
router.post('/ordinals/cost', getInscriptionCost);
router.post('/ordinals/inscribe', inscribeSubmission);
router.post('/opreturn/push', pushOpReturnHash);

export default router;

