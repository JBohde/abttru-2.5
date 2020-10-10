const { Group, GroupMember, User } = require('../models');

module.exports = {
  findMemberById: async (req, res) => {
    try {
      const member = await GroupMember.findById(req.params.id).populate('statistics');
      await User.findOne({ _id: member.userId }).then(user => user);
      res.json(member);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  createMember: async (req, res) => {
    try {
      const member = await GroupMember.create(req.body);
      await Group.findOneAndUpdate(
        { _id: member.groupId },
        { $push: { members: member._id } },
        { upsert: true, new: true },
      );
      res.json(member);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  updateMember: async (req, res) => {
    try {
      const member = await GroupMember.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json(member);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  removeMember: async (req, res) => {
    try {
      const member = await GroupMember.findOneAndRemove({ _id: req.params.id });
      await Group.findByIdAndUpdate(
        { _id: member.groupId },
        { $pull: { members: member._id } },
        { new: true },
      );
    } catch (err) {
      res.json(err);
    }
  },
};
