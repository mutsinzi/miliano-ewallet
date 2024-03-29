import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';

const router = express.Router();

router.route('/').post(createTransaction).get(getTransactions);

export default router;
