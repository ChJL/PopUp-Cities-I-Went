// var map = L.map('mapid').setView([51.505, -0.09], 13);

var cityIcon = L.icon({
	iconUrl: 'images/marker/solid-blue.png',
	shadowUrl: 'leaf-shadow.png',

	iconSize:     [17, 17], // size of the icon
});

var townIcon = L.icon({
	iconUrl: 'images/marker/location-pin.png',
	iconSize:     [17, 17], // size of the icon
});

var mapOptions = {
    center: [54.54, 2],
    zoom: 3.50
  }
var mymap = L.map('mapid', mapOptions);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v12',
    maxZoom: 8,
    minZoom:3,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGFuZmVyd2FuZyIsImEiOiJja2xpN2NndWgyYTI1MndzNDV1bjBrY2d2In0.WdslBmCdgObpqBD0e60C3g'
}).addTo(mymap);



const cities = [
    {name: "Amsterdam", lat: 52.370216, lng: 4.895168},
    {name: "Utrecht", lat: 52.090736, lng: 5.121420},
    {name: "Rotterdam", lat: 51.924419, lng: 4.477733},

    {name: "Frankfurt", lat: 50.110924, lng: 8.682127},
    {name: "Cologne", lat: 50.937531, lng: 6.960279},
    {name: "London", lat: 51.5074, lng: -0.1278},
    // {name: "Tokyo", lat: 35.6895, lng: 139.6917},
    // {name: "Paris", lat: 48.8566, lng: 2.3522},
    // {name: "New York", lat: 40.7128, lng: -74.0060},
    // Add more cities here...
  ];
  const towns = [
    {name: "Giethoorn", lat: 52.739700, lng: 6.077420}
  ];

  cities.forEach((city) => {
    const popupContent = document.createElement("div")
    popupContent.innerHTML = "<h3>" + city.name +"</h3>" + "<img src='" + "images/cities/"+ city.name + ".jpg "+ "'>"
    const marker = L.marker([city.lat, city.lng],{icon: cityIcon}).bindPopup(popupContent,
        { maxWidth: "auto" }).addTo(mymap);
  });

towns.forEach((town) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + town.name +"</h3>" + "<img src='" + "images/towns/"+ town.name + ".jpg "+ "'>"
  const marker = L.marker([town.lat, town.lng],{icon: townIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
});

