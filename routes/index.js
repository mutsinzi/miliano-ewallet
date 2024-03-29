import express from 'express';
import authRoutes from './auth.route';
import customerRoutes from './customer.route';
import transactionRoutes from './transaction.route';
import walletRoutes from './wallet.route';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Welcome Route
router.get('/', (req, res) => {
  res.send('Welcome to Miliano eWallet Backend');
});

router.use('/customers', customerRoutes);
router.use('/auth', authRoutes);
router.use('/wallets', walletRoutes);
router.use('/transactions', transactionRoutes);

export default router;
