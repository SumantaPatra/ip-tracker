const checkIpAddress =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
const checkDomain =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
const SECRET_KEY = "at_ftsugAt4Laue0tgOIpIh1VOj2FKeB";

const ipInput = document.getElementById("input-field");
const clickBtn = document.getElementById("btn");
const ipAdressText = document.getElementById("ip-val");
const regionText = document.getElementById("region-val");
const countryText = document.getElementById("country-val");
const ispText = document.getElementById("isp-val");
const resultSection = document.querySelector("#result");
let markerLatitude = 12.9719; // taking default location (we can take users location )
let markerLongitude = 77.5937;
// Create a map centered on the marker's position
const map = L.map("map");
// Add a marker to the map
const marker = L.marker([markerLatitude, markerLongitude]).addTo(map);

// Add a tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Automatically zoom into the marker when the map is loaded
map.setView([markerLatitude, markerLongitude], 15);
let ipAdress = "";
// showing loading
function displayLoading() {
  resultSection.classList.add("shimmer");
}

// hiding loading
function hideLoading() {
  resultSection.classList.remove("shimmer");
}
ipInput.addEventListener("change", function (event) {
  ipAdress = event.target.value;
});
clickBtn.addEventListener("click", function (e) {
  e.preventDefault();
  ipAdress = checkIpAddress.test(ipAdress)
    ? ipAdress
    : checkDomain.test(ipAdress)
    ? ipAdress
    : "";
  displayLoading();
  getAPi();
});
async function getAPi() {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${SECRET_KEY}&${ipAdress}`
    );
    const result = await response.json();
    markerLatitude = result?.location?.lat;
    markerLongitude = result?.location?.lng;
    ipAdressText.innerHTML = result?.ip;
    regionText.innerHTML = result?.location?.region;
    countryText.innerHTML = result?.location?.country;
    ispText.innerHTML = result?.isp;
    updateMap();
  } catch (error) {
    alert(error?.message);
  }
  hideLoading();
}
function mapInit() {
  map.setView([markerLatitude, markerLongitude], 13);
}
function updateMap() {
  map.setView([markerLatitude, markerLongitude], 13);
  L.marker([markerLatitude, markerLongitude]).addTo(map);
}

// // Create a map centered on the marker's position
// const map = L.map("map").setView([markerLatitude, markerLongitude], 13);
// // Add a marker to the map
// const marker = L.marker([markerLatitude, markerLongitude]).addTo(map);

// // Add a tile layer (OpenStreetMap)
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "© OpenStreetMap contributors",
// }).addTo(map);

// // Automatically zoom into the marker when the map is loaded
// map.setView([markerLatitude, markerLongitude], 15);
