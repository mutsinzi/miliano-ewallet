import express from 'express';
import { createWallet, getWallets } from '../controllers/wallet.controller.js';

const router = express.Router();

router.route('/').post(createWallet).get(getWallets);

export default router;
