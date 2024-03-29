import jwt from 'jsonwebtoken';

export const generateToken = (customerId) => {
  return jwt.sign({ id: customerId }, process.env.JWT_SECRET || 'O90bbrU7LUnr3', {
    expiresIn: '1d', 
  });
};