const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  uri: {
    type: String,
    require: true,
  },
  data: {
    type: Object,
    require: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  created: Date,
  updated: Date,
});

module.exports = mongoose.model('Recipe', recipeSchema);
