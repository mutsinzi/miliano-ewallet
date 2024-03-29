import express from 'express';
import customerRoutes from './customer.route'
import walletRoutes from './wallet.route'
import transactionRoutes from './transaction.route'

const router = express.Router();

// Welcome Route
router.get('/', (req, res) => {
  res.send('Welcome to Miliano eWallet Backend');
});

router.use('/customers', customerRoutes);
router.use('/wallets', walletRoutes);
router.use('/transactions', transactionRoutes);

export default router;
