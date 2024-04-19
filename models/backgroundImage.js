const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const bgImage = mongoose.model('bgImage', Schema);

module.exports = bgImage;
