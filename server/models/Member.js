const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
  attributes: {
    birthYear: Number,
    role: String
  }
});

module.exports = mongoose.model('Member', MemberSchema);