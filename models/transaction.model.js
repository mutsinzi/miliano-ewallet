import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Wallet',
    index: true 
  },
  type: {
    type: String,
    required: true,
    enum: ['credit', 'debit'],
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
