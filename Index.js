var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var imageUrl = 'Denah.png';
var imageBounds = [[0, 0], [1600,1280]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

var marker = L.marker([500, 500]).addTo(map);
marker.bindPopup("Marker on the floor plan");