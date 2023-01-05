// var map = L.map('mapid').setView([51.505, -0.09], 13);

var markerIcon = L.icon({
	iconUrl: 'images/marker-icon-2x.png',
	shadowUrl: 'leaf-shadow.png',

	iconSize:     [15, 24], // size of the icon
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
    {name: "Paris", lat: 48.8566, lng: 2.3522},
    // {name: "New York", lat: 40.7128, lng: -74.0060},
    {name: "London", lat: 51.5074, lng: -0.1278},
    // {name: "Tokyo", lat: 35.6895, lng: 139.6917},
    // Add more cities here...
  ];

  cities.forEach((city) => {
    const popupContent = document.createElement("div")
    popupContent.innerHTML = "<img src='" + "images/"+ city.name + ".jpg "+ "'>"
    const marker = L.marker([city.lat, city.lng],{icon: markerIcon}).bindPopup(popupContent,
        { maxWidth: "auto" }).addTo(mymap);
  });



