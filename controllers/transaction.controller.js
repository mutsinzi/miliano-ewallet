import mongoose from 'mongoose';
import Transaction from '../models/transaction.model.js';
import Wallet from '../models/wallet.model.js';
import redis from '../config/redis.js';

export const createTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { walletId, type, amount, description } = req.body;
    const opts = { session, new: true }; 

    const wallet = await Wallet.findById(walletId).session(session);
    if (!wallet) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Update wallet balance based on transaction type
    if (type === 'credit') {
      wallet.balance += amount;
    } else if (type === 'debit') {
      if (wallet.balance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Insufficient balance" });
      }
      wallet.balance -= amount;
    }

    await wallet.save(opts);

    // Create and save the transaction
    const transaction = new Transaction({ walletId, type, amount, description });
    await transaction.save(opts);

    await session.commitTransaction(); 
    session.endSession(); 

    // invalidate wallets cache if it's been created
    const cachedWallets = await redis.get('wallets');
    if(cachedWallets){
      await redis.del('wallets');
    }

    res.respond({ transactionId: transaction._id, currentBalance: wallet.balance }, 'Transaction created successfully', 201);
  } catch (error) {
    await session.abortTransaction(); 
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: 'wallets',
          localField: 'walletId',
          foreignField: '_id',
          as: 'walletDetails'
        }
      },
      {
        $unwind: '$walletDetails' 
      },
      {
        $project: {
          type: 1,
          amount: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          'currency': '$walletDetails.currency' 
        }
      }
    ]);
    res.respond(transactions, 'Fetched transactions successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
