/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const RoomsDetails = require('../models/RoomDetails');
const router = express.Router();

// CREATE a new room
router.post('/', async (req, res) => {
  try {
    const newRoom = new RoomsDetails(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: 'Error creating room' });
  }
});

// READ all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await RoomsDetails.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

// READ a single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await RoomsDetails.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: 'Error fetching room' });
  }
});

// UPDATE a room by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await RoomsDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: 'Error updating room' });
  }
});

// DELETE a room by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await RoomsDetails.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: 'Error deleting room' });
  }
});

module.exports = router;
