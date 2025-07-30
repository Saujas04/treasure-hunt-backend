const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  teamId: String,
  qrId: String,
  clueNumber: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WrongAttempt', attemptSchema);
