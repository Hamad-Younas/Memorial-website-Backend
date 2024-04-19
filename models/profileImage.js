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

const ProfileImage = mongoose.model('profileImage', Schema);

module.exports = ProfileImage;
