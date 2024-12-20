
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const bookingRoutes = require('./routes/bookingRoutes');
const roomDetailsRoutes = require('./routes/roomdetails');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());

app.options("*", cors());
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MongoDB URI is missing.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/book', bookingRoutes);
app.use('/api/roomdetails', roomDetailsRoutes);

// Start the server

app.get('/', (req, res) => {
  res.send('Hello backend');

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//------------//


































// const RoomDetails = require('./models/RoomDetails'); 
// Load the JSON data (rooms data)
// const roomdetails = [
//   {
//     title: "Deluxe Family Room",
//     price: "₹3,422/night",
//     rating: 5,
//     description: "Spacious and luxurious family room with modern amenities.",
//     features: ["Free Wi-Fi", "Breakfast included", "City view"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Spa and Wellness Center"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Conference Room", "Free Parking"]
//   },
//   {
//     title: "Super Deluxe Room",
//     price: "₹4,484/night",
//     rating: 4,
//     description: "A spacious room with amenities for maximum comfort.",
//     features: ["Free Wi-Fi", "Breakfast for one", "Lake view"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Fitness Center"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Free Parking"]
//   },
//   {
//     title: "Executive Suite",
//     price: "₹5,499/night",
//     rating: 5,
//     description: "Executive suite with exclusive amenities and great city views.",
//     features: ["Free Wi-Fi", "Free parking", "Breakfast included"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Swimming Pool", "Fitness Center"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Conference Room", "Free Parking"]
//   },
//   {
//     title: "Single Room",
//     price: "₹2,299/night",
//     rating: 3,
//     description: "Cozy single room ideal for solo travelers.",
//     features: ["Free Wi-Fi", "No breakfast", "Street view"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Restaurant"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Free Parking"]
//   },
//   {
//     title: "Double Room",
//     price: "₹3,199/night",
//     rating: 4,
//     description: "Comfortable room with double bed and complimentary amenities.",
//     features: ["Free Wi-Fi", "Breakfast included", "Garden view"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Swimming Pool"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Free Parking"]
//   },
//   {
//     title: "Suite Room",
//     price: "₹6,000/night",
//     rating: 5,
//     description: "Spacious suite with luxury amenities and an exceptional view.",
//     features: ["Free Wi-Fi", "Breakfast included", "Pool view"],
//     amenities: ["Air Conditioning", "24/7 Room Service", "Laundry Service", "Spa and Wellness Center", "Fitness Center", "Swimming Pool"],
//     facilities: ["Spa & Wellness Center", "Fitness Center", "Swimming Pool", "Restaurant & Bar", "Conference Room", "Free Parking"]
//   }
// ];

// // Insert room details into the database if not already present
// const insertRoomDetails = async () => {
//   try {
//     // Check if room details are already in the database
//     const existingRoomDetails = await RoomDetails.countDocuments();
//     if (existingRoomDetails === 0) {
//       await RoomDetails.insertMany(roomdetails);  // Insert room details into MongoDB
//       console.log('RoomDetails inserted into the database');
//     } else {
//       console.log('RoomDetails already exist in the database');
//     }
//   } catch (error) {
//     console.error('Error inserting roomdetails:', error);
//   }
// };

// // Call the insert function when the app starts
// insertRoomDetails();
// Routes for handling room details API requests
// const roomDetailsRoutes = require('./routes/roomdetails');
// app.use('/api/roomdetails', roomDetailsRoutes);