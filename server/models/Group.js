const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema({
  leaderId: {
    type: String,
    require: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GroupMember',
    },
  ],
  created: Date,
  updated: Date,
});

module.exports = mongoose.model('Group', groupSchema);
