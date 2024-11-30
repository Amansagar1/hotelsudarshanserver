
// const express = require('express');
// const Booking = require('../models/Booking');
// const RoomsDetails = require('../models/RoomDetails');  // Assuming RoomDetails is the model for room
// const router = express.Router();

// // POST request to save the booking
// router.post('/book', async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       address,
//       city,
//       pincode,
//       phone,
//       email,
//       checkIn,
//       checkOut,
//       checkInTime,
//       checkOutTime,
//       roomPreference,
//       numberOfAdults,
//       roomId, 
//       roomTitle, 
//       roomPrice, 
//     } = req.body;

//     // Check if the room exists and is available
//     const room = await RoomsDetails.findById(roomId);
//     if (!room) {
//       return res.status(404).json({ message: 'Room not found' });
//     }
//     if (!room.available) {
//       return res.status(400).json({ message: 'Room is not available for booking' });
//     }

//     // Create new booking
//     const newBooking = new Booking({
//       firstName,
//       lastName,
//       address,
//       city,
//       pincode,
//       phone,
//       email,
//       checkIn,
//       checkOut,
//       checkInTime,
//       checkOutTime,
//       roomPreference,
//       numberOfAdults,
//       roomId, 
//       roomTitle, 
//       roomPrice, 
//     });

//     // Save the booking
//     const savedBooking = await newBooking.save();

//     // Mark the room as unavailable after booking
//     room.available = false;
//     await room.save();

//     res.status(201).json({
//       success: true,
//       message: 'Booking confirmed!',
//       booking: savedBooking,
//     });
//   } catch (error) {
//     console.error('Error booking room:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// });

// module.exports = router;
const express = require('express');
const Booking = require('../models/Booking');
const RoomDetails = require('../models/RoomDetails');
const router = express.Router();

// Book a room
router.post('/', async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, ...rest } = req.body;

    // Validate room availability
    const room = await RoomDetails.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.available) return res.status(400).json({ message: 'Room is not available for booking' });

    // Create new booking
    const booking = new Booking({ ...rest, roomId, checkIn, checkOut, roomTitle: room.title, roomPrice: room.price });
    const savedBooking = await booking.save();

    // Update room availability
    room.available = false;
    await room.save();

    res.status(201).json({ success: true, message: 'Booking confirmed!', booking: savedBooking });
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
