// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require(path.resolve(__dirname, 'Server/db.js'));

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/hardware', async (req, res) => {
  const { latitude, longitude, brand, hostname, lokasi, date } = req.body;

  try {
    const locationId = await db.insertLocation(latitude, longitude, lokasi);
    await db.insertHardware(locationId, brand, hostname, date);
    res.status(200).json({ message: 'Hardware data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding hardware data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
