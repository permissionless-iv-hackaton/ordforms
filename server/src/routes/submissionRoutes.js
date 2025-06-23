import express from 'express';
import { verifyVoucher, createSubmission } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/verify-voucher', verifyVoucher);
router.post('/create', createSubmission);

export default router;