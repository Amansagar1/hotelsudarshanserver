/* eslint-disable @typescript-eslint/no-require-imports */
const cron = require('node-cron');
const Room = require('../models/RoomDetails'); // Adjust the path based on your project structure

// Scheduled job to update room availability
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    await Room.updateMany(
      { checkOut: { $lt: now }, status: 'booked' },
      { $set: { status: 'available', checkOut: null } }
    );
    console.log(`[${new Date().toISOString()}] Room statuses updated based on checkout times`);
  } catch (error) {
    console.error('Error updating room statuses:', error);
  }
});
