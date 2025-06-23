import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import bitcoinRoutes from './routes/bitcoinRoutes.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/bitcoin', bitcoinRoutes);
app.use('/api', uploadRoutes);

app.get('/', (_, res) => res.send('Permissionless Submission Backend Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;