import Wallet from '../models/wallet.model.js';

export const createWallet = async (req, res) => {
  const { customerId, balance, currency } = req.body;
  try {
    const wallet = new Wallet({ customerId, balance, currency });
    await wallet.save();
    res.respond(wallet, 'Wallet created successfully', 201)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.respond(wallets, 'Wallets fetched successfully')
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
