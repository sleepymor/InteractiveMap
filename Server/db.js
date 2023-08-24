const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'hardware_tracking'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

function insertLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO location (latitude, longitude) VALUES (?, ?)';
    db.query(query, [latitude, longitude], (err, result) => {
      if (err) reject(err);
      resolve(result.insertId);
    });
  });
}

function insertHardware(locationId, brand, hostname, date) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO hardware (location_id, brand, hostname, date) VALUES (?, ?, ?, ?)';
    db.query(query, [locationId, brand, hostname, date], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = {
  insertLocation,
  insertHardware
};