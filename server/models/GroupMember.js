const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = Schema({
  groupId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  statistics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Statistics',
    }
  ],
  created: Date,
  updated: Date,
});

module.exports = mongoose.model('GroupMember', groupSchema);
