import express from 'express';
import multer from 'multer';
import { verifyVoucher, createSubmission, parseResume, getSubmission } from '../controllers/submissionController';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/verify-voucher', verifyVoucher);
router.post('/create', upload.single('document'), createSubmission);
router.post('/parse', upload.single('document'), parseResume);
router.get('/:id', getSubmission);
export default router;


