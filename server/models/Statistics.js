const mongoose = require('mongoose');

const { Schema } = mongoose;

const statsSchema = new Schema({
  dob: {
    type: Date,
    require: true,
  },
  sex: {
    type: String,
    require: true,
  },
  heightFoot: {
    type: Number,
    require: true,
  },
  heightInch: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  waist: {
    type: Number,
    require: true,
  },
  bpSystolic: {
    type: Number,
    require: true,
  },
  bpDiastolic: {
    type: Number,
    require: true,
  },
  riskFactor: {
    type: String,
    require: true,
  },
  dietRecommendation: {
    type: String,
    require: true,
  },
  dietRestriction: {
    type: String,
    require: true,
  },
  created: Date,
  updated: Date,
});

const Statistics = mongoose.model('Statistics', statsSchema);

module.exports = Statistics;
