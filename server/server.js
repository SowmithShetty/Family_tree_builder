const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Member = require('./models/Member');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/familyTree');

app.get('/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.post('/members', async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.json(newMember);
});

app.listen(5000, () => console.log('Server running on port 5000'));