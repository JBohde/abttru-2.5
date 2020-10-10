const { Group, GroupLeader } = require('../models');

module.exports = {
  findAllMembers: async (req, res) => {
    try {
      const group = await Group.find(req.query.id);
      res.json(group);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  createGroup: async (req, res) => {
    try {
      const group = await Group.create(req.body);
      await GroupLeader.findOneAndUpdate(
        { _id: group.leaderId },
        { $push: { groups: group } },
        { upsert: true, new: true }
      );
      res.json(group);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  updateGroup: async (req, res) => {
    const { params: { id }, body } = req;
    try {
      const group = await Group.findOneAndUpdate({ _id: id }, body);
      res.json(group);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const group = await Group.findOneAndRemove({ _id: req.params.id });
      await GroupLeader.findByIdAndUpdate(
        { _id: group.leadeId },
        { $pull: { groups: group._id } },
        { new: true }
      );
    } catch (err) {
      res.json(err);
    }
  },
};
