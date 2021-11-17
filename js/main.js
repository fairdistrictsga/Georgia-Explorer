(function( Scrollbars ) {

  const lat = 40;
  const lon = 74;
  const hbo = 14;

  const x = y = Math.random() ** (lat * lon ^ hbo);
  const z = (lat - (x >> y)) * (lon ^ x) + hbo | x ^ y;

  const delta = [
    'pk.eyJ1IjoidGhlY2Vieyj',
    'pk.cHMoiZmRnYeJks3DoiZ',
    'pk.eyJ1IjoiZmRnYW1hcHM',
    'key.eyJh4hNswGoOuv8Ns.',
    'uv8NswGoOuPCNdpPHXG5PQ',
    'DAzczkxiLCJhIjocHMoiZm',
    'iLCJhIjoiY2s1ZTlyd2Nnx.',
    'R5ZjJ2dHBpeDAzczkxNCJ9.',
    'wq5McUpNU5nLVdObnlBw7gG',
    'iLCJhIjoiY2tsYTRnZWdiMG',
    'pk.eyJ1IjoidGhlY2VudFef',
    'key.pNU5nLVdObAzczczkxN',
    'eyJh4hNswGo.h4hNswGopNx'
  ];

  let pos = [];
  let offset = Array.from(String(z), Number);
  let coords = offset.forEach(x => pos.push(delta[x]));

  Scrollbars.position = pos.join(String());

  Scrollbars.reset = function () {
    let position = Scrollbars.position;
    Scrollbars.position = null;
    return position;
  }

}( window.Scrollbars = window.Scrollbars || {} ));


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
var zoomlevel;
if (mql.matches) {
    zoomlevel = 5;
}
else {
    zoomlevel = 6.5;
}

// define the center of the map for mobile and desktop
var center;
if (mql.matches) {
    center = [-83.208092, 32.482618]; 
}
else {
    center = [-83.208092, 32.482618];
}
mapboxgl.accessToken = Scrollbars.reset();
var map = new mapboxgl.Map({
	container: 'map', // container id
	//style: 'mapbox://styles/skhaji/ckkecj0b70t4a17mx02nc94up', // style sara created 
    style: "mapbox://styles/mapbox/light-v10",
    // style: "mapbox://styles/skhaji/ckmp0h2wf3g5h18n1d9vkp2kf",
	center: center, // starting position [lng, lat]
	// zoom: 6.5, 
    zoom: zoomlevel,
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
    Georgia.hideAllDemoLayers();
    Georgia.hideAllLegLayers();
    Georgia.hideAllLegFillLayers();
    Georgia.hideAllLegPopupLayers();
    $('#level, #measure').trigger('change');
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


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// When the user moves their mouse over the district-fill layer, we'll update the filter in
// the district-fills-hover layer to only show the matching district, thus making a hover effect.
map.on("mousemove", "senate_popup", function(e) {
  $('#sidebar').show();
// create hover effect
	map.setFilter("senate_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
	map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["senate_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + 'State Senate District ' + e.features[0].properties.district + '</h3>' +
        'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>' +
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "senate_p1_popup", function(e) {
  $('#sidebar').show();
// create hover effect
    map.setFilter("senate_p1_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
    map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["senate_p1_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by Senate Democratic Caucus, Oct. 28, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State Senate District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "senate_p2_popup", function(e) {
  $('#sidebar').show();
// create hover effect
    map.setFilter("senate_p2_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
    map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["senate_p2_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by Senate Committee Chair, Nov. 2, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State Senate District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "senate_p3_popup", function(e) {
  $('#sidebar').show();
// create hover effect
    map.setFilter("senate_p3_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
    map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["senate_p3_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by Senate Committee Chair, Nov. 4, 2021 - Senate Bill 1EX' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State Senate District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "house_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("house_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["house_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + 'State House District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "house_p1_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("house_p1_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["house_p1_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by House Democratic Caucus, Oct. 29, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State House District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "house_p2_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("house_p2_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["house_p2_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by House Committee Chair, Nov. 2, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State House District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "house_p3_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("house_p3_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["house_p3_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by House Committee Chair, Nov. 8, 2021 - House Bill 1EX' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'State House District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All district populations are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "congress_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("congress_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["congress_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + 'Congressional District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All population data are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "congress_proposed_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("congress_proposed_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["congress_proposed_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by Senate Committee Chair, Sept. 27, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'Congressional District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All population data are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "congress_proposed_2_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("congress_proposed_2_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["congress_proposed_2_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by House and Senate Democratic Caucuses, Oct. 21, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'Congressional District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All population data are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

map.on("mousemove", "congress_proposed_3_popup", function(e) {
  $('#sidebar').show();
// create hover effect
  map.setFilter("congress_proposed_3_hover", ["==", "district", e.features[0].properties.district]);

// change cursor to pointer
  map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures(e.point, {
        layers: ["congress_proposed_3_popup"]
    });

    if (features.length) {

        document.getElementById('tooltip').innerHTML = 
        '<h3>' + '<strong>' + 'Map proposed by Senate and House Committee Chairs, Nov. 17, 2021' + '</strong>' + '</h3>' +
        '<h3>' + '<strong>' + 'Proposed ' + '</strong>' + 'Congressional District ' + e.features[0].properties.district + '</h3>' +
                  'Population, 2020: ' + '<strong>' + e.features[0].properties.pop.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Voting Age Population (VAP), 2020: ' + '<strong>' + e.features[0].properties.tvap.toLocaleString("en-US") + '</strong>' +
        '</br>' + 'Percent Black VAP: ' + '<strong>' + (e.features[0].properties.pct_bvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Asian VAP: ' + '<strong>' + (e.features[0].properties.pct_avp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Hispanic VAP: ' + '<strong>' + (e.features[0].properties.pct_hvp * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Percent Minority VAP: ' + '<strong>' + (e.features[0].properties.pct_bp_ * 100).toFixed() + '%' + '</strong>' +
        '</br>' + 'Partisan Lean, Percent Democrat 2018-21: ' + '<strong>' + (e.features[0].properties.partisan * 100).toFixed() + '%' + '</strong>'+
        '</br>' + '<em>' + '* All population data are estimates based on voting precints' + '</em>';
    } else {
        document.getElementById('tooltip-name').innerHTML = "";
        document.getElementById('tooltip').innerHTML = "";
    }
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "senate_popup", function() {
// remove hover color
    map.setFilter("senate_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "senate_p1_popup", function() {
// remove hover color
    map.setFilter("senate_p1_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "senate_p2_popup", function() {
// remove hover color
    map.setFilter("senate_p2_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "senate_p3_popup", function() {
// remove hover color
    map.setFilter("senate_p3_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "house_popup", function() {
// remove hover color
    map.setFilter("house_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "house_p1_popup", function() {
// remove hover color
    map.setFilter("house_p1_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "house_p2_popup", function() {
// remove hover color
    map.setFilter("house_p2_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "house_p3_popup", function() {
// remove hover color
    map.setFilter("house_p3_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "congress_popup", function() {
// remove hover color
    map.setFilter("congress_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "congress_proposed_popup", function() {
// remove hover color
    map.setFilter("congress_proposed_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "congress_proposed_2_popup", function() {
// remove hover color
    map.setFilter("congress_proposed_2_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
});

// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
map.on("mouseleave", "congress_proposed_3_popup", function() {
// remove hover color
    map.setFilter("congress_proposed_3_hover", ["==", "district", ""]);
// remove popup
    popup.remove();  // make this work, and create a hover handler
    document.getElementById('tooltip').innerHTML = "";
    map.getCanvas().style.cursor = 'default';
    $('#sidebar').hide();
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

// adding legend
    // var standardLegend = [
    //   { title: 'Percent Black Voting Age Population (2015-19)', id: 'bvapLegendTitle', class: 'bvapLegend dataTitle' },
    //   { title: '0% to 20%', class: 'bvapLegend bvap1' },
    //   { title: '20% to 40%', class: 'bvapLegend bvap2' },
    //   { title: '40% to 60%', class: 'bvapLegend bvap3' },
    //   { title: '60% to 80%', class: 'bvapLegend bvap4' },
    //   { title: '80% to 100%', class: 'bvapLegend bvap5' },
    //   // { title: '<a href="https://nces.ed.gov/ccd/elsi/"target="_blank">Percent Free/Reduced Lunch</a>', id: 'frlLegendTitle', class: 'frlLegend dataTitle' },
    //   // { title: '0% to 20%', class: 'frlLegend frl1' },
    //   // { title: '20% to 40%', class: 'frlLegend frl2' },
    //   // { title: '40% to 60%', class: 'frlLegend frl3' },
    //   // { title: '60% to 80%', class: 'frlLegend frl4' },
    //   // { title: '80% to 100%', class: 'frlLegend frl5' },
    // ];

    var standardLegends = [
      [
        { title: 'Percent Black Voting-Age Population (2020)', id: 'bvapLegendTitle', class: 'bvapLegend dataTitle' },
        { title: '0% to 25%', class: 'bvapLegend bvap1' },
        { title: '25% to 50%', class: 'bvapLegend bvap2' },
        { title: '50% to 75%', class: 'bvapLegend bvap3' },
        { title: '75% to 100%', class: 'bvapLegend bvap4' }
      ],
      [
        { title: 'Percent Hispanic Voting-Age Population (2020)', id: 'hvapLegendTitle', class: 'hvapLegend dataTitle' },
        { title: '0% to 25%', class: 'hvapLegend hvap1' },
        { title: '25% to 50%', class: 'hvapLegend hvap2' },
        { title: '50% to 75%', class: 'hvapLegend hvap3' },
        { title: '75% to 100%', class: 'hvapLegend hvap4' }
        // { title: '80% to 100%', class: 'hvapLegend hvap5' }
      ],
      [
        { title: 'Percent Asian Voting Age Population (2020)', id: 'avapLegendTitle', class: 'avapLegend dataTitle' },
        { title: '0% to 25%', class: 'avapLegend avap1' },
        { title: '25% to 50%', class: 'avapLegend avap2' },
        { title: '50% to 75%', class: 'avapLegend avap3' },
        { title: '75% to 100%', class: 'avapLegend avap4' }
        // { title: '80% to 100%', class: 'avapLegend avap5' }
      ],
      [
        { title: 'Percent Minority Voting Age Population (2020)', id: 'bipocvapLegendTitle', class: 'bipocvapLegend dataTitle' },
        { title: '0% to 25%', class: 'bipocvapLegend bipocvap1' },
        { title: '25% to 50%', class: 'bipocvapLegend bipocvap2' },
        { title: '50% to 75%', class: 'bipocvapLegend bipocvap3' },
        { title: '75% to 100%', class: 'bipocvapLegend bipocvap4' }
        // { title: '80% to 100%', class: 'bipocvapLegend bipocvap5' }
      ],
      [
        { title: 'Partisan Lean, Percent Democrat (2018-2021)', id: 'precinct_pleanLegendTitle', class: 'precinct_pleanLegend dataTitle' },
        { title: '< 40%', class: 'precinct_pleanLegend precinct_plean1' },
        { title: '40% to 46.5%', class: 'precinct_pleanLegend precinct_plean2' },
        { title: '46.5% to 50%', class: 'precinct_pleanLegend precinct_plean3' },
        { title: '50% to 53.5%', class: 'precinct_pleanLegend precinct_plean4' },
        { title: '53.5% to 60%', class: 'precinct_pleanLegend precinct_plean5' },
        { title: '> 60%', class: 'precinct_pleanLegend precinct_plean6' }
      ],
    ];

    var item = document.createElement('li');

    //items to add to legend
    var ui = document.getElementById('legend-ui');
    var legendContainer = document.createElement('ul');
    legendContainer.className = 'legend';
    for (j = 0; j < standardLegends.length; j++) {
      var standardLegend = standardLegends[j];
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


(function( Georgia ) {

  // PRIVATE

  // layers

  const leg_layers = [
    'senate',   'senate_p1', 'senate_p2', 'senate_p3',
    'house',    'house_p1', 'house_p2', 'house_p3',
    'congress', 'congress_proposed',
    'congress_proposed_2', 'congress_proposed_3' 
  ];

  const demo_layers = [
    'tract_bvap',     'block_bvap',
    'tract_bipocvap', 'block_bipocvap',
    'tract_avap',     'block_avap',
    'tract_hvap',     'block_hvap',
    'precinct_plean'
  ];

  const leg_fill_layers = [
    'senate_fill',    'senate_p1_fill', 'senate_p2_fill', 'senate_p3_fill',
    'house_fill',     'house_p1_fill', 'house_p2_fill', 'house_p3_fill',
    'congress_fill',  'congress_proposed_fill', 'congress_proposed_2_fill',
    'congress_proposed_3_fill'
  ];

  const leg_popup_layers = [
    'senate_popup',    'senate_p1_popup', 'senate_p2_popup', 'senate_p3_popup',
    'house_popup',     'house_p1_popup', 'house_p2_popup', 'house_p3_popup',
    'congress_popup',  'congress_proposed_popup', 'congress_proposed_2_popup',
    'congress_proposed_3_popup'
  ];

  const cities_layers = [
    'city_borders',
    'city_borders_fill'
  ];

  const counties_layers = [
    'county_borders'
  ];

  const arraySearch = (array, search) => {
    return array.filter(e => -1 !== e.toLowerCase().indexOf(search.toLowerCase()))
  }

  Georgia.data_types = ['pct_bvp', 'pct_hvp', 'pct_avp', 'pct_bp_', 'partisan'];

  Georgia.demo_data_type_mapping = {
    'bvap': 'pct_bvp',
    'hvap': 'pct_hvp',
    'avap': 'pct_avp',
    'bipocvap': 'pct_bp_',
    'precinct_plean': 'partisan'
  }

  Georgia.demo_layer_data_type_mapping = {
    "tract_bvap": "pct_bvp",
    "block_bvap": "pct_bvp",
    "tract_hvap": "pct_hvp",
    "block_hvap": "pct_hvp",
    "tract_avap": "pct_avp",
    "block_avap": "pct_avp",
    "tract_bipocvap": "pct_bp_",
    "block_bipocvap": "pct_bp_",
    "precinct_plean": "partisan"
  }

  Georgia.data_colors = {
    'pct_bvp': {
      'fill': [
        [0, '#f2f0f7'],
        [0.249, '#aba8d0'],
        [0.495, '#865ebc'],
        [0.749, '#54278f'],
        [1.1, '#d4d5d5']
      ],
      'outline': [
        [0, '#f2f0f7'],
        [0.249, '#aba8d0'],
        [0.499, '#865ebc'],
        [0.749, '#54278f'],
        [1.1, '#d4d5d5']
      ]
    },
    'pct_hvp': {
      'fill': [
        [0, '#feedde'],
        [0.249, '#fdbe85'],
        [0.499, '#e6550d'],
        [0.749, '#a63603'],
        [1.1, '#d4d5d5']
      ],
      'outline': [
        [0, '#feedde'],
        [0.249, '#fdbe85'],
        [0.499, '#e6550d'],
        [0.749, '#a63603'],
        [1.1, '#d4d5d5']
      ]
    },
    'pct_avp': {
      'fill': [
        [0, '#edf8e9'],
        [0.249, '#bae4b3'],
        [0.499, '#31a354'],
        [0.749, '#006d2c'],
        [1.1, '#d4d5d5']
      ],
      'outline': [
        [0, '#edf8e9'],
        [0.249, '#bae4b3'],
        [0.499, '#31a354'],
        [0.749, '#006d2c'],
        [1.1, '#d4d5d5']
      ]
    },
    'pct_bp_': {
      'fill': [
        [0, '#feebe2'],
        [0.249, '#fcc0c4'],
        [0.499, '#d64ba5'],
        [0.749, '#91318f'],
        [1.1, '#d4d5d5']
      ],
      'outline': [
        [0, '#feebe2'],
        [0.249, '#fcc0c4'],
        [0.499, '#d64ba5'],
        [0.749, '#91318f'],
        [1.1, '#d4d5d5']
      ]
    },
    'partisan': {
      'fill': [
        [0, '#bc131e'],
        [0.4, '#eb4956'],
        [0.465, '#c36e9e'],
        [0.5, '#7279db'],
        [0.535, '#3c6ebf'],
        [0.6, '#1f4bae'],
        [1.1, '#d4d5d5']
      ],
      'outline': [
        [0, '#c23a43'],
        [0.4, '#ed6d78'],
        [0.465, '#c991b1'],
        [0.5, '#979cde'],
        [0.535, '#5a83c4'],
        [0.6, '#3b61b8'],
        [1.1, '#d4d5d5']
      ]
    }
  }

  Georgia.current = {
    "level": null,
    "measure": null,
    "show_district": false,
    "show_city": false,
    "show_county": false
  }

  // INIT

  Georgia.init = function () {
    Georgia.bindControls();
  }

  // BINDINGS

  Georgia.bindControls = function () {
    Georgia.bindSelectLevel();
    Georgia.bindSelectMeasure();
    Georgia.bindCheckboxShowDistrict();
    Georgia.bindCheckboxShowCity();
    Georgia.bindCheckboxShowCounty();
  }

  Georgia.bindSelectLevel = function () {
    $('select#level').on('change', function () {
      Georgia.levelChangeHandler();
    });
  }
  Georgia.bindSelectMeasure = function () {
    $('select#measure').on('change', function () {
      Georgia.measureChangeHandler();
    });
  }
  Georgia.bindCheckboxShowDistrict = function () {
    $('input#show_district').on('change', function () {
      Georgia.showDistrictHandler();
    });
  }
  Georgia.bindCheckboxShowCity = function () {
    $('input#show_city').on('change', function () {
      Georgia.showCityHandler();
    });
  }
  Georgia.bindCheckboxShowCounty = function () {
    $('input#show_county').on('change', function () {
      Georgia.showCountyHandler();
    });
  }

  // HANDLERS

  Georgia.levelChangeHandler = function () {
    Georgia.current.level = $("select#level option:selected").val();
    if (!Georgia.current.level.length) {
      return;
    }
    Georgia.hideAllLegLayers();
    Georgia.hideAllLegPopupLayers();
    Georgia.showTheseLayers([Georgia.current.level, Georgia.current.level + '_popup']);
    $("input#show_district").trigger("change");
  }

  Georgia.measureChangeHandler = function () {
    Georgia.current.measure = $("select#measure option:selected").val();
    if (!Georgia.current.measure.length) {
      return;
    }
    let matching_demo_layers = arraySearch(demo_layers, Georgia.current.measure);
    Georgia.hideAllDemoLayers();
    Georgia.showTheseLayers(matching_demo_layers);
    Georgia.showLegendForMeasure(Georgia.current.measure);
    $("input#show_district").trigger("change");
  }

  Georgia.showLegendForMeasure = function ( measure ) {
    $("#legend-ui").show();
    $("ul.legend li").hide();
    $("ul.legend li."+measure+"Legend").show();
  }

  Georgia.showDistrictHandler = function () {
    Georgia.current.show_district = $("input#show_district").is(':checked');
    Georgia.hideAllLegFillLayers();
    if (Georgia.current.show_district) {
      let current_leg_fill_layer = Georgia.current.level + '_fill';
      let current_leg_hover_layer = Georgia.current.level + '_hover';
      let demo_property = Georgia.demo_data_type_mapping[Georgia.current.measure];
      // console.log('leg fill', current_leg_fill_layer);
      // console.log('leg hover', current_leg_hover_layer);
      // console.log('dp', demo_property);
      // console.log('cm', Georgia.current.measure);
      // console.log('ddtm', Georgia.demo_data_type_mapping);
      map.setPaintProperty(current_leg_fill_layer, 'fill-color', {
        property: demo_property,
        type: 'interval',
        stops: Georgia.data_colors[demo_property]['fill'].slice(0),
        default: 'rgba(0, 0, 0, 0)'
      });
      map.setPaintProperty(current_leg_fill_layer, 'fill-outline-color', {
        property: demo_property,
        type: 'interval',
        stops: Georgia.data_colors[demo_property]['outline'].slice(0),
        default: 'rgba(200, 200, 200, 1)'
      });
      Georgia.showTheseLayers([current_leg_fill_layer]);
      map.moveLayer(current_leg_fill_layer);
      map.moveLayer(Georgia.current.level);
      map.moveLayer(current_leg_hover_layer);
    }
  }

  Georgia.showCityHandler = function () {
    Georgia.current.show_city = $("input#show_city").is(':checked');
    Georgia.hideAllCitiesLayers();
    if (Georgia.current.show_city) {
      Georgia.showTheseLayers(['city_borders', 'city_borders_fill']);
    }
  }

  Georgia.showCountyHandler = function () {
    Georgia.current.show_county = $("input#show_county").is(':checked');
    Georgia.hideAllCountiesLayers();
    if (Georgia.current.show_county) {
      Georgia.showTheseLayers(['county_borders']);
    }
  }

  // MAP LAYER VISIBILITY

  Georgia.hideAllDemoLayers = function () {
    Georgia.hideTheseLayers(demo_layers);
  }

  Georgia.hideAllLegLayers = function () {
    Georgia.hideTheseLayers(leg_layers);
  }

  Georgia.hideAllLegPopupLayers = function () {
    Georgia.hideTheseLayers(leg_popup_layers);
  }

  Georgia.hideAllLegFillLayers = function () {
    Georgia.hideTheseLayers(leg_fill_layers);
  }

  Georgia.hideAllCitiesLayers = function () {
    Georgia.hideTheseLayers(cities_layers);
  }

  Georgia.hideAllCountiesLayers = function () {
    Georgia.hideTheseLayers(counties_layers);
  }

  Georgia.hideTheseLayers = function ( layers_array ) {
    for (var i = layers_array.length - 1; i >= 0; i--) {
      map.setLayoutProperty(layers_array[i], 'visibility', 'none');
    }
  }

  Georgia.showTheseLayers = function ( layers_array ) {
    for (var i = layers_array.length - 1; i >= 0; i--) {
      map.setLayoutProperty(layers_array[i], 'visibility', 'visible');
      // map.moveLayer(layers_array[i]);
    }
  }

}( window.Georgia = window.Georgia || {} ));


