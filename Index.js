var map = L.map('map', {
  minZoom: 2, // Adjust this value as needed
  maxZoom: 5,  // Adjust this value as needed
  maxBoundsViscosity: 1.0,
  worldCopyJump: false, // Disable world wrapping
}).setView([0, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);