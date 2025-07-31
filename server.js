// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/qr', require('./routes/qrRoutes'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // code change trigger

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Team = require('./models/Team');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/qr', require('./routes/qrRoutes'));

// 👇 Seeding route
app.get('/seed', async (req, res) => {
  try {
    const teams = [
      { teamId: 'team1', password: 'neelgayi777' },
      { teamId: 'team2', password: 'sabarmati1234' },
      { teamId: 'team3', password: 'gandhinagar251' },
      { teamId: 'team4', password: 'wildpig420' },
      { teamId: 'team5', password: 'saiyaara3000' },
    ];

    await Team.deleteMany();

    for (let team of teams) {
      const hash = await bcrypt.hash(team.password, 10);
      await Team.create({ teamId: team.teamId, password: hash });
    }

    console.log("✅ Teams seeded via /seed");
    res.status(200).json({ message: "Teams seeded successfully" });
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    res.status(500).json({ error: "Seeding failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
