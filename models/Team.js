const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
});

module.exports = mongoose.model('Team', teamSchema);
