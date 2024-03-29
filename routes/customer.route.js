import express from 'express';
import { registerCustomer, getCustomers } from '../controllers/customer.controller.js';

const router = express.Router();

router.route('/').post(registerCustomer).get(getCustomers);

export default router;
