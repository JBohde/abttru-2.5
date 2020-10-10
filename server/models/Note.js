const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  recipeId: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  created: Date,
  updated: Date,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
