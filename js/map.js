// 1. 建立一個 Icon 對照表 (Dictionary)，比較安全且易於管理
const iconMap = {
    'city': cityIcon,
    'town': townIcon,
    'mountain': mountainIcon,
    'coast': coastIcon,
    'attraction': attractionIcon,
    'ski': skiIcon,
    'snowboard': sbIcon,
    // 如果找不到對應的，可以用這個 default
    'default': otherIcon 
};
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
    accessToken: 'pk.eyJ1IjoiNWNoaWVoIiwiYSI6ImNtaXhsZ2hxcDA1OTEzanNra3VhNDk5d2QifQ.nRpXLaHmqK5Rdsmvygqhew'
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

  // 用一個全域變數存資料，避免搜尋時重複讀取 CSV
var allMarkersData = [];

function showMarker(items) {
  //Data is usable here
  console.log("CSV Data loaded:", items); // Debug 用
  allMarkersData = items; // 將資料存入全域變數供搜尋使用  var Icon;
  
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
  // var div = L.DomUtil.create('div', 'searchbar');
  // div.innerHTML += '<input id="searchbar" onkeyup="search_item()" type="text" name="search" placeholder="Search City ex: Amsterdam ">'
  // 建立外層 div
    var div = L.DomUtil.create('div', 'search-container');
    
    // 加入 input，這裡我加了 class="custom-input" 方便 CSS 控制
    div.innerHTML += '<input id="searchbar" class="custom-input" onkeyup="search_item()" type="text" name="search" placeholder="Search City...">';
    
    // 防止點擊輸入框時觸發地圖拖曳 (這很重要，不然打字時地圖會亂動)
    L.DomEvent.disableClickPropagation(div);
  return div;
};
searchBar.addTo(mymap)

function search_item() {
    let input = document.getElementById('searchbar').value;
    console.log("Searching for:", input);
    
    // 5. 改用記憶體中的資料搜尋，不要重新下載 CSV
    if (allMarkersData.length > 0) {
        allMarkersData.forEach((item) => {
            // 建議加上轉小寫比較 (Case insensitive search)
            if (item.placename.toLowerCase() === input.toLowerCase()) {
                let markerVar = window['marker' + item.filename];
                if (markerVar) {
                    markerVar.openPopup();
                    // 選擇性功能：搜尋到時地圖自動飛過去
                    mymap.setView(markerVar.getLatLng(), 6); 
                }
            }
        });
    }
}

var legend = L.control({position: 'topright'}); 
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    
    var grades = [
        { name: 'City', icon: 'solid-blue.png' },
        { name: 'Town', icon: 'orange-pin.png' },
        { name: 'Mountain', icon: 'mountains-64.png' },
        { name: 'Coast', icon: 'sea.png' },
        { name: 'Attraction', icon: 'heartin.png' },
        { name: 'Ski', icon: 'ski-pin-blue.png' },
        { name: 'Snowboard', icon: 'snowboarder.png' }
    ];

    grades.forEach(function(item){
        div.innerHTML += `
            <div class="legend-item">
                <img src="images/marker/${item.icon}">
                <span>${item.name}</span>
            </div>
        `;
    });

    return div;
};
legend.addTo(mymap);