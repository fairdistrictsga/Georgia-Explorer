mapboxgl.accessToken = 'pk.eyJ1IjoiZmRnYW1hcHMiLCJhIjoiY2tsYTRnZWdiMGR5ZjJ2dHBpeDAzczkxNCJ9.uv8NswGoOuPCNdpPHXG5PQ';

// define mql to access screen width in js
var mql = window.parent.matchMedia("(max-width: 785px)");

// Set bounds for the map on desktop and mobile
// var bounds; 
// if (mql.matches) {
//     bounds = [[-90.158467, 30.039761], [-67.110834, 44.821295]];
// }
// else {
//     bounds = [[-75.240000, 40.491296], [-68.724290, 43.522921]];
// }


// Set zoom levels for mobile and desktop
// var zoomlevel;
// if (mql.matches) {
//     zoomlevel = 5.85;
// }
// else {
//     zoomlevel = 7.65;
// }

// define the center of the map for mobile and desktop
var center;
if (mql.matches) {
    center = [-83.208092, 32.482618]; 
}
else {
    center = [-83.208092, 32.482618];
}

var map = new mapboxgl.Map({
	container: 'map', // container id
	//style: 'mapbox://styles/skhaji/ckkecj0b70t4a17mx02nc94up', // style sara created 
    style: "mapbox://styles/mapbox/light-v10",
    // style: "mapbox://styles/skhaji/ckmp0h2wf3g5h18n1d9vkp2kf",
	center: center, // starting position [lng, lat]
	zoom: 6.5, 
	maxZoom: 13,
	minZoom: 5
    // maxBounds: bounds  // use this if you want to keep people from zooiming away from GA
});

// Add geocodeer to zoom to address
map.addControl(new MapboxGeocoder({ // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  bbox: [-86.548059, 30.183318, -80.840278, 35.451994], // define area that you can search for addresses
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: true // Do not use the default marker style
}));

addSources = function () {
    for (var key in sources) {
        if (!sources.hasOwnProperty(key)) continue;
        map.addSource(key, sources[key]);
    }
}

addLayers = function () {
    for (var i = layers.length - 1; i >= 0; i--) {
        map.addLayer(layers[i]);
    }
}

map.on('load', function () {
    addSources();
    addLayers();
    // To place other layers below the labels in the style layer, first get style layers
    // var layers = map.getStyle().layers;
    // // // Find the index of the first symbol layer in the map style
    // var firstSymbolId;
    // for (var i = 0; i < layers.length; i++) {
    //     if (layers[i].type === 'symbol') {
    //     firstSymbolId = layers[i].id;
    //     break;
    //     }
    // }

    
});

//// BEGIN MapBox example to toggle layers
//enumerate ids of the layers
// var toggleableLayerIds = ['house', 'senate'];
 
// // set up the corresponding toggle button for each layer
// for (var i = 0; i < toggleableLayerIds.length; i++) {
// var id = toggleableLayerIds[i];
 
// var link = document.createElement('a');
// link.href = '#';
// link.className = 'active';
// link.textContent = id;
 
// link.onclick = function (e) {
// var clickedLayer = this.textContent;
// e.preventDefault();
// e.stopPropagation();
 
// var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
 
// // toggle layer visibility by changing the layout object's visibility property
// if (visibility === 'visible') {
// map.setLayoutProperty(clickedLayer, 'visibility', 'none');
// this.className = '';
// } else {
// this.className = 'active';
// map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
// }
// };
 
// var layers = document.getElementById('menu');
// layers.appendChild(link);
// }

//// END MapBox example

// One way to toggle layers, not the best
// var toggleableLayerIds = [ 'most_isolated_districts', 'district', 'seglines' ];

// var link = document.createElement('a');
// link.href = '#';
// link.className = 'active';
// link.textContent = "Click to highlight the most isolated districts";
// link.onclick = function (e) {
//     for(var index in toggleableLayerIds) {
//       var clickedLayer = toggleableLayerIds[index];
//       e.preventDefault();
//       e.stopPropagation();
  
//       var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
  
//       if (visibility === 'visible') {
//           map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//           this.className = '';
//           legendcontainer.style.display = 'none';
//           legendcontainer_isolated.style.display = 'block';

//       } else {
//           this.className = 'active';
//           map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//           legendcontainer.style.display = 'block';
//           legendcontainer_isolated.style.display = 'none';

//       }
//     }
    
// };
// var layers = document.getElementById('menu');
// layers.appendChild(link);



// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// When the user moves their mouse over the district-fill layer, we'll update the filter in
// the district-fills-hover layer to only show the matching district, thus making a hover effect.
map.on("mousemove", "senate_popup", function(e) {
// create hover effect
	map.setFilter("senate_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
	map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["senate_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<strong>' + 'State Senate District ' + e.features[0].properties.district + '</strong>' +
        '</br>' + 'Population, 2020: ' + '<strong>' + e.features[0].properties.pop + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap + '</strong>' +
        '</br>' + 'Percent Black VAP, 2020: ' + '<strong>' + (e.features[0].properties.pct_bvap * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP, 2020: ' + '<strong>' + (e.features[0].properties.pct_avap * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP, 2020: ' + '<strong>' + (e.features[0].properties.pct_hvap * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP, 2020: ' + '<strong>' + (e.features[0].properties.pct_bipoc_vap * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl({
    // Hide rotation control.
    showCompass: false
}));

// populate popup
//     popup.setLngLat(e.lngLat)
//         .setHTML('<strong>' + e.features[0].properties.Name +'</strong>' +
//             '</br>' + 'Enrollment (2017): ' + e.features[0].properties.enroll_l + 
//             '</br>' + 'Est Student Poverty (2017): ' + e.features[0].properties.pov_l + 
//             '</br>' + 'Percent Nonwhite (2017): ' + e.features[0].properties.pctnw_l +
//             '</br>' + 'Segregating Borders (2017): ' + e.features[0].properties.count_seg)
//         .addTo(map);
// });

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "senate_popup", function() {
// remove hover color
    map.setFilter("senate_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
});

// adding legend
var standardLegend = [
      { title: '<a href="https://www.census.gov/programs-surveys/decennial-census/about/voting-rights/cvap.2018.html"target="_blank">Percent Black Voting Age Population (2015-19)</a>', id: 'bvapLegendTitle', class: 'bvapLegend dataTitle' },
      { title: '0% to 20%', class: 'bvapLegend bvap1' },
      { title: '20% to 40%', class: 'bvapLegend bvap2' },
      { title: '40% to 60%', class: 'bvapLegend bvap3' },
      { title: '60% to 80%', class: 'bvapLegend bvap4' },
      { title: '80% to 100%', class: 'bvapLegend bvap5' },
      // { title: '<a href="https://nces.ed.gov/ccd/elsi/"target="_blank">Percent Free/Reduced Lunch</a>', id: 'frlLegendTitle', class: 'frlLegend dataTitle' },
      // { title: '0% to 20%', class: 'frlLegend frl1' },
      // { title: '20% to 40%', class: 'frlLegend frl2' },
      // { title: '40% to 60%', class: 'frlLegend frl3' },
      // { title: '60% to 80%', class: 'frlLegend frl4' },
      // { title: '80% to 100%', class: 'frlLegend frl5' },
    ];

    var item = document.createElement('li');

    //items to add to legend
    var ui = document.getElementById('legend-ui');
    var legendContainer = document.createElement('ul');
    legendContainer.className = 'legend';
    for (i = 0; i < standardLegend.length; i++) {
      var legendItem = document.createElement('li');
      var legendColor = document.createElement('span');
      var legendTitle = document.createElement('span');
      legendTitle.innerHTML = standardLegend[i].title;
      legendColor.className = 'keycolor';
      legendItem.className = standardLegend[i].class;
      legendItem.appendChild(legendColor);
      legendItem.appendChild(legendTitle);
      legendContainer.appendChild(legendItem);

    }
    item.appendChild(legendContainer);
    ui.appendChild(item);


// If you want to have additional elements that you click to open a popup
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
// map.on('click', 'places', function (e) {
// var coordinates = e.features[0].geometry.coordinates.slice();
// var description = e.features[0].properties.description;
 
//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }
 
//     new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML(description)
//         .addTo(map);
// });
 
// Change the cursor to a pointer when the mouse is over the places layer.
// map.on('mouseenter', 'places', function () {
//     map.getCanvas().style.cursor = 'pointer';
// });
 
// // Change it back to a pointer when it leaves.
// map.on('mouseleave', 'places', function () {
//     map.getCanvas().style.cursor = '';
// });


// });

// Use this to start the add and remove layer
// map.setLayoutProperty('house', 'visibility', 'visible');
