const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306, 
  user: 'root',
  database: 'hardware_tracking'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

function insertLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO locations (latitude, longitude) VALUES (?, ?)';
    db.query(query, [latitude, longitude], (err, result) => {
      if (err) reject(err);
      resolve(result.insertId);
    });
  });
}

function insertHardware(locationId, brand, hostname, date) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO hardware (location_id, brand, hostname, date) VALUES (?, ?, ?, ?)';
    db.query(query, [locationId, brand, hostname, date], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  insertLocation,
  insertHardware
};
