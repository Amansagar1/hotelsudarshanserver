// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  bookingStatus: { type: String, default: 'available' }, // 'available', 'booked'
});

module.exports = mongoose.model('Room', roomSchema);
