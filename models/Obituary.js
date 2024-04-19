const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Obituary = mongoose.model('Obituary', Schema);

module.exports = Obituary;
