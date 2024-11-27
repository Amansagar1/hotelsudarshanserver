
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// POST request to save the booking
router.post('/book', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      pincode,
      phone,
      email,
      checkIn,
      checkOut,
      checkInTime,
      checkOutTime,
      roomPreference,
      numberOfAdults,
      roomId, // Include roomId from the client
      roomTitle, // Include roomTitle from the client
      roomPrice, // Include roomPrice from the client
    } = req.body;

    // Create new booking
    const newBooking = new Booking({
      firstName,
      lastName,
      address,
      city,
      pincode,
      phone,
      email,
      checkIn,
      checkOut,
      checkInTime,
      checkOutTime,
      roomPreference,
      numberOfAdults,
      roomId, // Store room ID
      roomTitle, // Store room title
      roomPrice, // Store room price
    });

    // Save the booking
    await newBooking.save();

    res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while booking', error });
  }
});

module.exports = router;












// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const mongoose = require('mongoose');
// const Booking = require('../models/Booking');

// const router = express.Router();

// router.post(
//   '/book',
//   [
//     body('firstName').notEmpty().withMessage('First name is required'),
//     body('lastName').notEmpty().withMessage('Last name is required'),
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('phone').isMobilePhone().withMessage('Invalid phone number'),
//     body('checkIn').notEmpty().withMessage('Check-in date is required'),
//     body('checkOut').notEmpty().withMessage('Check-out date is required'),
//     // Add other validations here
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ status: 'error', errors: errors.array() });
//     }

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

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       // Check room availability
//       const isRoomAvailable = await Room.findOne({ _id: roomId, isAvailable: true }).session(session);
//       if (!isRoomAvailable) {
//         throw new Error('Room is not available');
//       }

//       // Create a new booking
//       const newBooking = new Booking({
//         firstName,
//         lastName,
//         address,
//         city,
//         pincode,
//         phone,
//         email,
//         checkIn,
//         checkOut,
//         checkInTime,
//         checkOutTime,
//         roomPreference,
//         numberOfAdults,
//         roomId,
//         roomTitle,
//         roomPrice,
//       });

//       // Save booking
//       await newBooking.save({ session });

//       // Mark room as booked
//       await Room.updateOne({ _id: roomId }, { $set: { isAvailable: false } }, { session });

//       await session.commitTransaction();
//       session.endSession();

//       res.status(201).json({ status: 'success', message: 'Booking confirmed!', booking: newBooking });
//     } catch (error) {
//       await session.abortTransaction();
//       session.endSession();
//       console.error(error);
//       res.status(500).json({ status: 'error', message: error.message });
//     }
//   }
// );

// module.exports = router;
