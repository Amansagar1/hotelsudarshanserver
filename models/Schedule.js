const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [String],
  description: String,
  available: { type: Boolean, default: true },
  // Other fields...
});

module.exports = mongoose.model('Room', roomSchema);
