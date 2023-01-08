// var map = L.map('mapid').setView([51.505, -0.09], 13);
var cityIcon = L.icon({

	iconUrl: 'images/marker/solid-blue.png',
	shadowUrl: 'leaf-shadow.png',
	iconSize:     [35, 35], // size of the icon
});

var townIcon = L.icon({
	iconUrl: 'images/marker/orange-pin.png',
	iconSize:     [35, 35], // size of the icon
});

var mountIcon = L.icon({
	iconUrl: 'images/marker/mountains-64.png',
	iconSize:     [25, 25], // size of the icon
});

var coastIcon = L.icon({
	iconUrl: 'images/marker/sea.png',
	iconSize:     [25, 25], // size of the icon
});

var attractIcon = L.icon({
	iconUrl: 'images/marker/heartin.png',
	iconSize:     [30, 30], // size of the icon
});

var otherIcon = L.icon({
	iconUrl: 'images/marker/purple-pin.png',
	iconSize:     [30, 30], // size of the icon
});

var skiIcon = L.icon({
	iconUrl: 'images/marker/ski-pin-blue.png',
	iconSize:     [35, 35], // size of the icon
});

var snowboardIcon = L.icon({
	iconUrl: 'images/marker/snowboarder.png',
	iconSize:     [30, 30], // size of the icon
});

var mapOptions = {
    center: [52, 5],
    zoom: 5
  }
var mymap = L.map('mapid', mapOptions);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v12',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGFuZmVyd2FuZyIsImEiOiJja2xpN2NndWgyYTI1MndzNDV1bjBrY2d2In0.WdslBmCdgObpqBD0e60C3g'
}).addTo(mymap);



const cities = [
    // Netherlands
    {filename: "Amsterdam", placename: "Amsterdam", lat: 52.370216, lng: 4.895168},
    {filename: "Utrecht", placename: "Utrecht", lat: 52.090736, lng: 5.121420},
    {filename: "Rotterdam", placename: "Rotterdam", lat: 51.924419, lng: 4.477733},
    // Germany
    {filename: "Frankfurt", placename: "Frankfurt", lat: 50.110924, lng: 8.682127},
    {filename: "Cologne", placename: "Cologne", lat: 50.937531, lng: 6.960279},
    {filename: "Darmstadt", placename:"Darmstadt", lat: 49.8851869, lng: 8.6736295},
    {filename: "Dusseldorf", placename:"Dusseldorf", lat: 51.221700, lng: 6.776160},
    {filename: "Hamburg", placename:"Hamburg", lat: 53.550000, lng: 9.993610},
    {filename: "Heidelberg", placename:"Heidelberg", lat: 49.407679, lng: 8.690788},
    {filename: "Nuremberg", placename:"Nuremberg", lat: 49.452030, lng: 11.076750},
    {filename: "Hannover", placename:"Hannover", lat: 52.375892, lng: 9.732010},
    // UK
    {filename: "London", placename: "London", lat: 51.5074, lng: -0.1278},
    {filename: "York", placename:"York", lat: 53.958332, lng: -1.080278},
    {filename: "Bath", placename:"Bath", lat: 51.380001, lng: -2.350000},
    {filename: "Brighton", placename:"Brighton", lat: 50.828800, lng: -0.139150},

    // Switzerland
    {filename: "Zurich", placename:"Zurich", lat: 47.376888 , lng: 8.541694},
    {filename: "Luzern", placename:"Luzern", lat: 47.045540, lng: 8.308010},
    {filename: "Bern", placename:"Bern", lat: 46.9482713, lng: 7.4514512},
    {filename: "Basel", placename:"Basel", lat: 47.5581077, lng: 7.5878261},
    {filename: "Tallinn", placename:"Tallinn", lat: 59.436755, lng: 24.74522},
    {filename: "Geneva", placename:"Geneva", lat:46.204391, lng: 6.143158},
    // Slovakia 
    {filename: "Bratislava", placename:"Bratislava", lat: 48.148598, lng: 17.107748},
    // Belgium
    {filename: "Brugge", placename:"Brugge", lat: 51.20892, lng:3.22424 },
    {filename: "Brussel", placename:"Brussel", lat: 50.850346, lng: 4.351721},
    {filename: "Gent", placename:"Gent", lat: 51.0543422 , lng: 3.7174243},
    // Hungary
    {filename: "Budapest", placename:"Budapest", lat:47.497913, lng: 19.040236},
    // Italy
    {filename: "Milan", placename:"Milan", lat: 45.464664,lng: 9.188540},
    {filename: "Rome", placename:"Rome", lat: 41.902782, lng: 12.496366},
    {filename: "Vatican", placename:"Vatican", lat: 41.904755, lng: 12.454628},
    {filename: "Venice", placename:"Venice", lat: 45.438759, lng: 12.327145},
    // Czech
    {filename: "Prague", placename:"Prague", lat: 50.073658, lng: 14.418540},
    // Autria
    {filename: "Vienna", placename:"Vienna", lat: 48.210033, lng: 16.363449},
    {filename: "Innsbruck", placename:"Innsbruck", lat: 47.268150, lng: 11.394590},
    // Denmark
    {filename: "Copenhagen", placename:"Copenhagen", lat: 55.675500, lng: 12.570000},
    // Finland
    {filename: "Helsinki", placename:"Helsinki", lat: 60.169520, lng: 24.935450},
    // Sweden
    {filename: "Stockholm", placename:"Stockholm", lat: 59.329323, lng: 18.068581},
    // Poland
    {filename: "Krakow", placename:"Krakow", lat: 50.061940, lng: 19.938400},
    {filename: "Warsaw", placename:"Warsaw", lat: 52.229690, lng: 21.012230},
    // Spain
    {filename: "Seville", placename:"Seville", lat: 37.389092, lng: -5.984459},
    {filename: "Cordoba", placename:"Cordoba", lat: 37.884991, lng: -4.779383},
    {filename: "Granada", placename:"Granada", lat: 37.177336, lng: -3.598557},
    {filename: "Malaga", placename:"Malaga", lat: 36.721261, lng: -4.421266},
    // Japan
    {filename: "Tokyo", placename:"Tokyo", lat: 35.6895, lng: 139.6917},
    // {name: "Paris", lat: 48.8566, lng: 2.3522},
    // {name: "New York", lat: 40.7128, lng: -74.0060},
    // {filename: "", placename:"", lat: , lng: },
    // Add more cities here...
  ];
const towns = [
    // Netherlands
    {filename: "Giethoorn", placename:"Giethoorn", lat: 52.739700, lng: 6.077420},
    {filename: "AmsterdamBos", placename:"Het Amsterdam Bos", lat: 52.315428, lng:  4.831741},
    // Germany
    //UK
    {filename: "Saltburn", placename:"Saltburn", lat: 54.581539, lng: -0.978370},
    {filename: "Whitby", placename:"Whitby", lat: 54.4877, lng: -0.6150},
    {filename: "Windsor", placename:"Windsor", lat: 51.484250, lng: -0.604440},
    // Switzerland
    {filename: "Grindelwald", placename:"Grindelwald", lat: 46.624329, lng: 8.034030},
    {filename: "Interlaken", placename:"Interlaken", lat: 46.686348, lng: 7.863205},
    {filename: "Lauterbrunnen", placename:"Lauterbrunnen", lat: 46.593421, lng: 7.909125},
    // Denmark
    {filename: "KastrupSobad", placename:"Kastrup Søbad", lat: 55.645410, lng:  12.649408},
    // Spain
    {filename: "Frigiliana", placename:"Frigiliana", lat: 36.78747, lng:-3.89441},
    {filename: "Nerja", placename:"Nerja", lat: 36.750637, lng: -3.876716},
    {filename: "Ronda", placename:"Ronda", lat: 36.746178, lng: -5.167944},
    // Poland
    {filename: "Zakopane", placename:"Zakopane", lat: 49.299180, lng: 19.946150},
    // {filename: "", placename:"", lat: , lng: },
  ];

const mountains = [
    {filename: "MtFuju", placename:"Mt. Fuji", lat: 35.363075, lng: 138.73033},
    {filename: "SevenSistersCliff", placename:"Seven Sisters Cliff", lat: 50.747954, lng: 0.190148},
    {filename: "KasprowyWierch", placename:"Kasprowy Wierch", lat: 49.239450, lng: 19.988780}
  ];

const coasts = [
  {filename: "DurdleDoor", placename:"Durdle Door", lat: 50.621103, lng: -2.276568},
  {filename: "JurassicCoast", placename:"Jurassic Coast", lat: 50.622026, lng: -2.274362},
  {filename: "Bluecave", placename:"Blue Cave", lat: 26.485870, lng: 127.848250},
  ];

const attractions = [
  {filename: "Stonehenge", placename:"Stonehenge", lat: 51.178884, lng: -1.826214},
  {filename: "KsIto", placename:"Ito Onsen", lat: 34.971847,lng: 139.097305},
  ];

const others = [
  {filename: "Auschwitz-Birkenau", placename:"Auschwitz-Birkenau", lat: 50.033530, lng: 19.209361},
    ];

const skis = [
  {filename: "BT", placename:"Białka Tatrzańska", lat: 49.368400, lng: 20.061050},
  {filename: "Patscherkofel", placename:"Patscherkofel", lat: 47.188760, lng: 11.446790},
  {filename: "AxamerLizum", placename:"Axamer Lizum", lat: 47.203640, lng: 11.488040},
  {filename: "Nordkette", placename:"Nordkette", lat: 47.286640, lng: 11.404910},
];

const snowboards = [
  {filename: "GrandeRochette", placename:"Grande Rochette", lat: 45.569939, lng: 6.731433},
  {filename: "LaPlagne1800", placename:"La Plagne 1800", lat: 45.569450, lng: 6.736930},
    ];

cities.forEach((city) => {
    const popupContent = document.createElement("div")
    popupContent.innerHTML = "<h3>" + city.placename +"</h3>" + "<img src='" + "images/cities/"+ city.filename + ".jpg "+ "'>"
    const marker = L.marker([city.lat, city.lng],{icon: cityIcon}).bindPopup(popupContent,
        { maxWidth: "auto" }).addTo(mymap);
  });

towns.forEach((town) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + town.placename +"</h3>" + "<img src='" + "images/towns/"+ town.filename + ".jpg "+ "'>"
  const marker = L.marker([town.lat, town.lng],{icon: townIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
});

mountains.forEach((mountain) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + mountain.placename +"</h3>" + "<img src='" + "images/mountains/"+ mountain.filename + ".jpg "+ "'>"
  const marker = L.marker([mountain.lat, mountain.lng],{icon: mountIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})

coasts.forEach((coast) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + coast.placename +"</h3>" + "<img src='" + "images/coasts/"+ coast.filename + ".jpg "+ "'>"
  const marker = L.marker([coast.lat, coast.lng],{icon: coastIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})

attractions.forEach((attract) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + attract.placename +"</h3>" + "<img src='" + "images/attractions/"+ attract.filename + ".jpg "+ "'>"
  const marker = L.marker([attract.lat, attract.lng],{icon: attractIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})

others.forEach((other) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + other.placename +"</h3>" + "<img src='" + "images/others/"+ other.filename + ".jpg "+ "'>"
  const marker = L.marker([other.lat, other.lng],{icon: otherIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})

skis.forEach((ski) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + ski.placename +"</h3>" + "<img src='" + "images/skis/"+ ski.filename + ".jpg "+ "'>"
  const marker = L.marker([ski.lat, ski.lng],{icon: skiIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})

snowboards.forEach((snowboard) => {
  const popupContent = document.createElement("div")
  popupContent.innerHTML = "<h3>" + snowboard.placename +"</h3>" + "<img src='" + "images/snowboards/"+ snowboard.filename + ".jpg "+ "'>"
  const marker = L.marker([snowboard.lat, snowboard.lng],{icon: snowboardIcon}).bindPopup(popupContent,
      { maxWidth: "auto" }).addTo(mymap);
})