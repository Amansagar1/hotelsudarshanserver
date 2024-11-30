const schedule = require('node-schedule');
const Room = require('../models/RoomDetails');
const Booking = require('../models/Booking');

// Schedule to run every minute
schedule.scheduleJob('* * * * *', async () => {
  try {
    const currentDate = new Date();
    const expiredBookings = await Booking.find({ checkoutDate: { $lte: currentDate } });

    for (const booking of expiredBookings) {
      await Room.findByIdAndUpdate(booking.roomId, { available: true });

      // Optionally, mark the booking as complete
      await Booking.findByIdAndUpdate(booking._id, { status: 'completed' });
    }

    console.log('Updated room availability based on checkout times.');
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});
