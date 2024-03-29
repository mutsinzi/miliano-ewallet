import Customer from '../models/customer.model.js';
import { generateToken } from '../utils/token.util.js';

// Register a new customer
export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customer = await Customer.create({ name, email, password });

    res.respond({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
    }, 'Customer registered successfully', 201)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select('-password -__v');
    res.respond(customers, 'Customers fetched successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
