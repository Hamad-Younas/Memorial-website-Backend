const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullname: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', Schema);

module.exports = Profile;
