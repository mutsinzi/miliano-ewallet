import mongoose from 'mongoose';

const walletSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
    index: true 
  },
  currency: {
    type: String,
    required: true,
    uppercase: true,
    match: [/^[A-Z]{3}$/, 'Please provide a valid ISO 4217 currency code'],
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
