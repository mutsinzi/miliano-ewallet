import redis from '../config/redis.js';
import Wallet from '../models/wallet.model.js';

export const createWallet = async (req, res) => {
  const { customerId, balance, currency } = req.body;
  try {
    const wallet = new Wallet({ customerId, balance, currency });
    await wallet.save();

    // Invalidate redis cache
    await redis.del('wallets');

    res.respond(wallet, 'Wallet created successfully', 201)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getWallets = async (req, res) => {
  try {
    const cachedWallets = await redis.get('wallets');
    if (cachedWallets) {
      return res.respond(JSON.parse(cachedWallets), 'Wallets fetched successfully from cache');
    }

    const wallets = await Wallet.find().select('-password -__v');

    // Store the wallets list in Redis
    await redis.set('wallets', JSON.stringify(wallets), 'EX', 3600);

    res.respond(wallets, 'Wallets fetched successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
