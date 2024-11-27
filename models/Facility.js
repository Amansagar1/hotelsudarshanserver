// models/Facility.js
/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Facility = mongoose.model('Facility', facilitySchema);
module.exports = Facility;
