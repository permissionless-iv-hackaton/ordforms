import express from 'express';
const router = express.Router();

router.get('/linkedin', (_, res) => res.send('LinkedIn OAuth Placeholder'));
router.get('/github', (_, res) => res.send('GitHub OAuth Placeholder'));

export default router;