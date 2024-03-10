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

var mountainIcon = L.icon({
	iconUrl: 'images/marker/mountains-64.png',
	iconSize:     [25, 25], // size of the icon
});

var coastIcon = L.icon({
	iconUrl: 'images/marker/sea.png',
	iconSize:     [25, 25], // size of the icon
});

var attractionIcon = L.icon({
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

var sbIcon = L.icon({
	iconUrl: 'images/marker/snowboarder.png',
	iconSize:     [30, 30], // size of the icon
});

var mapOptions = {
    center: [35, 1],
    zoom: 3.2
  }
var mymap = L.map('mapid', mapOptions);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v12',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiNWNoaWVoIiwiYSI6ImNsZDV6aW83YTA0Z2gzb2pvN2NlaGgwa2UifQ.1K0nOtmpdfmdNHEO2QVtGQ'
}).addTo(mymap);

L.control
	.fullscreen({
		position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
		title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
		titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
		content: null, // change the content of the button, can be HTML, default null
		forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
		fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
	})
	.addTo(mymap);

function showMarker(items) {
  //Data is usable here
  console.log(items);
  var Icon;
  items.forEach((item) => {
    const popupContent = document.createElement("div")
    if (item.been === "y"){

      popupContent.innerHTML = "<h2>" + item.placename  + "</h2>" + "<h3>"+ item.flag + " " + item.country +"</h3>"
                                +"<img src='" + "images/"+item.category+"/"+ item.filename + ".jpg "+ "'>"
      
      Icon = window[item.category+'Icon'];
      
      window['marker'+ item.filename] = L.marker([item.lat, item.lng],{icon: Icon}).bindPopup(popupContent,
                                { maxWidth: "auto" }).addTo(mymap);
              
          }
    else {
          console.log("======== test =======")
    }
    
  })
}

function parseData(url, callBack) {
  var csvData;
    $.get(url, function(data) {
        csvData = $.csv.toObjects(data);
        callBack(csvData);
    });
}

parseData("data/default.csv", showMarker);
// Add search bar
var searchBar = L.control({position: 'topleft'});
searchBar.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'searchbar');
  div.innerHTML += '<input id="searchbar" onkeyup="search_item()" type="text" name="search" placeholder="Search City ex: Amsterdam ">'
  return div;
};
searchBar.addTo(mymap)

function search_item() {
  let input = document.getElementById('searchbar').value
  console.log(input);
  $.get("data/default.csv", function(data) {
  var itemdata = $.csv.toObjects(data);
  itemdata.forEach((item) => {
      if(item.placename === input){
        window['marker' + item.filename].openPopup();
      }
    })
  });
}

// Add legends
var legend = L.control({position: 'topleft'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=  "<p>"+' '+"</p>"
    div.innerHTML +=  '<img src="images/marker/solid-blue.png">' + "<h4>"+'City'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/orange-pin.png">'  + "<h4>"+'Town'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/mountains-64.png">'  + "<h4>"+'Mountain'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/sea.png">'  + "<h4>"+'Coast'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/heartin.png">'  + "<h4>"+'Attraction'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/ski-pin-blue.png">'  + "<h4>"+'Ski'+"</h4>"
    div.innerHTML +=  '<img src="images/marker/snowboarder.png">'  + "<h4>"+'Snowboard'+"</h4>"
    

    return div;
};
legend.addTo(mymap);

