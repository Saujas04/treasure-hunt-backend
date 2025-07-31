// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Team = require('./models/Team');
// require('dotenv').config();

// const teams = [
//   { teamId: 'team1', password: 'neelgayi777' },
//   { teamId: 'team2', password: 'sabarmati1234' },
//   { teamId: 'team3', password: 'gandhinagar251' },
//   { teamId: 'team4', password: 'wildpig420' },
//   { teamId: 'team5', password: 'saiyaara3000' },
// ];

// const seed = async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   await Team.deleteMany();

//   for (let team of teams) {
//     const hash = await bcrypt.hash(team.password, 10);
//     await Team.create({ teamId: team.teamId, password: hash });
//   }

//   console.log("✅ Teams seeded.");
//   process.exit();
// };

// seed();
// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Team = require('./models/Team');
require('dotenv').config();

const teams = [
  { teamId: 'team1', password: 'neelgayi777' },
  { teamId: 'team2', password: 'sabarmati1234' },
  { teamId: 'team3', password: 'gandhinagar251' },
  { teamId: 'team4', password: 'wildpig420' },
  { teamId: 'team5', password: 'saiyaara3000' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Connected to MongoDB");

    await Team.deleteMany();
    console.log("🧹 Old teams cleared");

    for (let team of teams) {
      const hash = await bcrypt.hash(team.password, 10);
      await Team.create({ teamId: team.teamId, password: hash });
    }

    console.log("✅ Teams seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding teams:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seed();

