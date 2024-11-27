/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const mongoose = require('mongoose');
const RoomDetails = require('../models/RoomDetails');  // Ensure this model is imported correctly
const router = express.Router();

// This route will handle the PUT request for updating room status
router.put('/:roomId/status/update', async (req, res) => {
  try {
    const { roomId } = req.params;  // Extract roomId from the URL parameter
    const { available, bookingstatus } = req.body;  // Expecting these fields in the body

    // Validate the roomId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid roomId' });
    }

    // Attempt to update the room status
    const updatedRoom = await RoomDetails.findByIdAndUpdate(
      roomId,
      { available, bookingstatus, updatedAt: Date.now() },
      { new: true }
    );

    // If the room is not found
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Send success response
    res.json({ success: true, message: 'Room status updated successfully', data: updatedRoom });
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Corrected module.exports line (removed space)
module.exports = router;
