const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: {
      type: [String],
    },
    imgs: {
      type: [String],
    },
  },
  { timestamps: true }
);

const MemoryWall = mongoose.model('MemoryWall', Schema);

module.exports = MemoryWall;
