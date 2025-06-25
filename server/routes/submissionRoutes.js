const express = require('express');
const multer = require('multer');
const {
  verifyVoucher,
  createSubmission,
  parseResume,
  getSubmission
} = require('../controllers/submissionController');

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads/' });

router.post('/verify-voucher', verifyVoucher);
router.post('/create', upload.single('document'), createSubmission);
router.post('/parse', upload.single('document'), parseResume);
router.get('/:id', getSubmission);

module.exports = router;
