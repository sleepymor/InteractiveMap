const express = require('express');
const router = express.Router();
const db = require('db.js'); 

router.post('/api/hardware', async (req, res) => {
  const { latitude, longitude, brand, hostname, lokasi, date } = req.body;

  try {
    const locationId = await db.insertLocation(latitude, longitude, lokasi); // Pass lokasi to the function
    await db.insertHardware(locationId, brand, hostname, date);
    res.status(200).json({ message: 'Hardware data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding hardware data' });
  }
});

module.exports = router;
