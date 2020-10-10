const { Note, Recipe } = require('../models');

module.exports = {
  createNote: async (req, res) => {
    try {
      const note = await Note.create(req.body);
      await Recipe.findOneAndUpdate(
        { _id: note.recipeId },
        { $push: { notes: note } },
        { upsert: true, new: true },
      );
      res.json(note);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  updateNote: async (req, res) => {
    try {
      const notes = await Note.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.json(notes);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  deleteNote: async (req, res) => {
    try {
      const notes = await Note.findOneAndRemove({ _id: req.params.id });
      await Recipe.findByIdAndUpdate(
        { _id: notes.recipeId },
        { $pull: { notes: notes._id } },
        { new: true },
      );
      res.json(notes);
    } catch (err) {
      res.json(err);
    }
  },
};
