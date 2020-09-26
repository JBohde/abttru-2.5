const { User, Recipe } = require('../models');

module.exports = {
  register: async (req, res) => {
    const { email } = req.body;
    try {
      const dbUser = await User.findOne({ email });
      if (dbUser) {
        return res.json({ error: `Sorry, already a user with the email ${email}` });
      }
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (err) {
      return res.status(422).json(err);
    }
  },

  login: async (req, res) => {
    const {
      body: { email, password },
    } = req;
    try {
      const user = await User.findOne({ email });
      const isMatch = user.comparePassword(password);
      return isMatch ? res.json(user) : res.status(403);
    } catch (err) {
      return res.status(422).json(err);
    }
  },

  logout: (req, res) => {
    if (req.user) return res.json({ msg: 'logging you out' });
    return res.json({ msg: 'no user to log out!' });
  },

  update: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  delete: async (req, res) => {
    try {
      const note = await User.findOneAndRemove({ _id: req.params.id });
      await Recipe.findByIdAndUpdate(
        { _id: note.recipeId },
        { $pull: { notes: note._id } },
        { new: true },
      );
    } catch (err) {
      res.json(err);
    }
  },

  authenticate: (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = { ...user };
    if (cleanUser) {
      delete cleanUser.password;
    }
    res.json({ user: cleanUser });
  },
};
