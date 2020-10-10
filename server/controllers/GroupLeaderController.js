const { GroupLeader } = require('../models');

module.exports = {
  createLeader: async (req, res) => {
    try {
      const leader = await GroupLeader.create(req.body);
      res.json(leader);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  updateLeader: async (req, res) => {
    try {
      const leader = await GroupLeader.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.json(leader);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  removeLeader: async (req, res) => {
    try {
      await GroupLeader.findOneAndRemove({ _id: req.params.id });
      res.status(200);
    } catch (err) {
      res.status(422).json(err);
    }
  },
};
