/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  pincode: String,
  phone: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
  checkInTime: String,
  checkOutTime: String,
  roomPreference: String,
  numberOfAdults: Number,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }, // Store room ID (ObjectId type)
  roomTitle: String, // Store room title
  roomPrice: String, // Store room price
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
