var map = L.map('map', {
  minZoom: 2,
  maxZoom: 5,
  maxBoundsViscosity: 2.0,
  worldCopyJump: false,
}).setView([0, 0], 50);

var maxBounds = L.latLngBounds(
  L.latLng(-90, -380),
  L.latLng(90, 380)
);

map.setMaxBounds(maxBounds);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 5
}).addTo(map);

var imageUrl = 'denah-real.png';
var imageBounds = [[-90, -380], [90, 380]];

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.on("click", function(e) {
  var popupContent = `
    <form id="markerForm">
      <label for="pcMerek">Merek PC:</label>
      <input type="text" id="pcMerek" name="pcMerek"><br><br>
      <label for="lokasi">Lokasi:</label>
      <input type="text" id="lokasi" name="Lokasi"><br><br>
      <label for="pcHostname">Hostname:</label>
      <input type="text" id="pcHostname" name="pcHostname"><br><br>
      <label for="pcTanggal">Tanggal:</label>
      <input type="date" id="pcTanggal" name="pcTanggal"><br><br>
      <input type="submit" value="Add Marker">
    </form>
  `;

  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(popupContent)
    .openOn(map);

  document.getElementById('markerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    var form = event.target;
    var pcMerek = form.pcMerek.value;
    var pcHostname = form.pcHostname.value;
    var pcTanggal = form.pcTanggal.value;

    // Send data to the server to add to the database
    const response = await fetch('/api/hardware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        brand: pcMerek,
        hostname: pcHostname,
        date: pcTanggal,
        lokasi: form.lokasi.value
      })
    });

    if (response.ok) {
      console.log('Hardware data added successfully');

      var markerIcon = L.icon({
        iconUrl: 'monitor.png', // URL to your hardware marker icon
        iconSize: [32, 32]
      });

      var marker = new L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
          <strong>Merek PC:</strong> ${pcMerek}<br>
          <strong>Lokasi:</strong> ${form.lokasi.value}<br>
          <strong>Hostname:</strong> ${pcHostname}<br>
          <strong>Tanggal:</strong> ${pcTanggal}
          <br><button id="removeMarkerButton">Remove Marker</button>
        `);

      popup.remove();

      // Clear the form
      form.reset();

      // Add a click event listener to the remove marker button
      document.getElementById('removeMarkerButton').addEventListener('click', function() {
        map.removeLayer(marker);
      });
    } else {
      console.error('Failed to add hardware data');
    }
  });
});