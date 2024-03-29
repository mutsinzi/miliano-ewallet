import Customer from "../models/customer.model";
import { generateToken } from "../utils/token.util";

export const authenticateCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (customer && (await customer.matchPassword(password))) {
      res.respond({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token: generateToken(customer._id),
      }, 'Login successful');
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
