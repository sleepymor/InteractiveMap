const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import database connection

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/hardware', async (req, res) => {
  const { latitude, longitude, brand, hostname, date } = req.body;

  try {
    const locationId = await db.insertLocation(latitude, longitude);
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