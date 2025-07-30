const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Team = require('../models/Team');

// Login with teamId and password
router.post('/login', async (req, res) => {
  const { teamId, password } = req.body;

  const team = await Team.findOne({ teamId });
  if (!team) {
    return res.status(400).json({ message: 'Invalid team ID or password' });
  }

  const isMatch = await bcrypt.compare(password, team.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid team ID or password' });
  }

  return res.json({ success: true, teamId: team.teamId });
});

module.exports = router;
