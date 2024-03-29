import express from 'express';
import { authenticateCustomer } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/').post(authenticateCustomer);

export default router;
