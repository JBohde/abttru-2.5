const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupLeaderSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  facility: {
    type: String,
    require: true,
  },
  specialty: {
    type: String,
    require: true,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  created: Date,
  updated: Date,
});

module.exports = mongoose.model('GroupLeader', groupLeaderSchema);
