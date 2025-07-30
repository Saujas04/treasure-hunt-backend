const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Team = require('./models/Team');
require('dotenv').config();

const teams = [
  { teamId: 'team1', password: 'pass1' },
  { teamId: 'team2', password: 'pass2' },
  { teamId: 'team3', password: 'pass3' },
  { teamId: 'team4', password: 'pass4' },
  { teamId: 'team5', password: 'pass5' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Team.deleteMany();

  for (let team of teams) {
    const hash = await bcrypt.hash(team.password, 10);
    await Team.create({ teamId: team.teamId, password: hash });
  }

  console.log("✅ Teams seeded.");
  process.exit();
};

seed();
