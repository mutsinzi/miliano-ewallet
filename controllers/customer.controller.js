import Customer from '../models/customer.model.js';

// Register a new customer
export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const customer = await Customer.create({ name, email, password });
    customer.password = undefined;
    customer.__v = undefined;
    res.respond(customer, 'Customer registered successfully', 201)
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
