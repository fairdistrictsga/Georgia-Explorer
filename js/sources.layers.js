
  	/**
  	 * Mapbox GL `Map` sources
  	 * @type {Object}
  	 */
  	sources = {
  		'src_states': {
  			type: 'geojson',
        data: 'data/states.json'
  		},
      'src_house': {
        type:'geojson',
        data:'data/house15_census20.geojson'
      },
      'src_senate': {
        type:'geojson',
        data:'data/senate14_census20.geojson'
      },
      'src_congress': {
        type:'geojson',
        data:'data/congress12_census20.geojson'
      },
      'src_cities': {
        type:'geojson',
        data:'data/places_2020data.geojson'
      },
      'src_tract': {
        type: 'vector',
        url: 'mapbox://fdgamaps.3huau41d'
      },
      'src_block': {
        type: 'vector',
        url: 'mapbox://fdgamaps.6z57ygze'
      },
      'src_precinct': {
        type: 'vector',
        url: 'mapbox://fdgamaps.97e7r27u'
      }
    };


    /**
  	 * Mapbox GL `Map` layers
  	 * @type {Array}
  	 */
  	layers = [
      // state borders
      {
        'id': 'state_borders',
        'type': 'line',
        'source': 'src_states',
        'layout': {},
        'paint': {
          'line-color': '#000000',
          'line-width': 1.5
        }
      },
      // state borders
      {
        'id': 'cities',
        'type': 'line',
        'source': 'src_cities',
        'layout': {},
        'paint': {
          'line-color': '#705f1f',
          'line-width': 2
        }
      },
      ////////////////////////////////
      // HOUSE DISTRICS, 2015 //
      ////////////////////////////////
      {
        'id': 'house',
        'source': 'src_house',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#444444",
          'line-width': 2
        }
      },
      {
        'id': 'house_fill',
        'source': 'src_house',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      {
        'id': 'house_hover',
        'source': 'src_house',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_popup',
        'source': 'src_house',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // SENATE DISTRICS, 2014 //
      ////////////////////////////////
      {
        'id': 'senate',
        'source': 'src_senate',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#444444",
          'line-width': 2
        }
      },
      {
        'id': 'senate_fill',
        'source': 'src_senate',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      {
        'id': 'senate_hover',
        'source': 'src_senate',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'senate_popup',
        'source': 'src_senate',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // CONGRESS DISTRICS, 2010 //
      ////////////////////////////////
      {
        'id': 'congress',
        'source': 'src_congress',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#444444",
          'line-width': 2
        }
      },
      {
        'id': 'congress_fill',
        'source': 'src_congress',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      {
        'id': 'congress_hover',
        'source': 'src_congress',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_popup',
        'source': 'src_congress',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////////////
      /// PRECINCTS - 2021 partisan lean /////
      ////////////////////////////////////////
      {
        'id': 'precinct_plean',
        'type': 'fill',
        'source': 'src_precinct',
        'source-layer': 'precinct_2020-cw9lzx',
        'maxzoom': 11,
        "layout": {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'partisan',
                    type: 'interval',
                    stops: [
                        [0, '#bc131e'],
                        [0.4, '#eb4956'],
                        [0.465, '#c36e9e'],
                        [0.5, '#7279db'],
                        [0.535, '#3c6ebf'],
                        [0.6, '#1f4bae'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': {
                    property: 'partisan',
                    type: 'interval',
                    stops: [
                        [0, '#c23a43'],
                        [0.4, '#ed6d78'],
                        [0.465, '#c991b1'],
                        [0.5, '#979cde'],
                        [0.535, '#5a83c4'],
                        [0.6, '#3b61b8'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                }
            }
      },
      ////////////////////////////////
      ////////// BVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_bvap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-ce0711',
        'maxzoom': 11,
        "layout": {
              'visibility': "visible"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#f2f0f7'],
                        [0.195, '#cbc9e2'],
                        [0.395, '#9c7dc4'],
                        [0.595, '#7d52b7'],
                        [0.795, '#54278f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#f2f0f7'],
                        [0.195, '#cbc9e2'],
                        [0.395, '#9c7dc4'],
                        [0.595, '#7d52b7'],
                        [0.795, '#54278f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                }
            }
      },
      {
        'id': 'block_bvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020-d6ktwd',
        'minzoom': 11,
        'layout': {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#f2f0f7'],
                        [0.195, '#cbc9e2'],
                        [0.395, '#9c7dc4'],
                        [0.595, '#7d52b7'],
                        [0.795, '#54278f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#f2f0f7'],
                        [0.195, '#cbc9e2'],
                        [0.395, '#bba5d6'],
                        [0.595, '#a48cc2'],
                        [0.795, '#744ca8'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                }
            }
      },
      ////////////////////////////////
      ////////// BIPOCVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_bipocvap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-ce0711',
        'maxzoom': 11,
        "layout": {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_bp_',
                    type: 'interval',
                    stops: [
                        [0, '#feebe2'],
                        [0.195, '#fbb4b9'],
                        [0.395, '#f768a1'],
                        [0.595, '#c51b8a'],
                        [0.795, '#7a0177'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': {
                    property: 'pct_bp_',
                    type: 'interval',
                    stops: [
                        [0, '#feebe2'],
                        [0.195, '#fcc0c4'],
                        [0.395, '#fc88b7'],
                        [0.595, '#d64ba5'],
                        [0.795, '#91318f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                }
            }
      },
      {
        'id': 'block_bipocvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020-d6ktwd',
        'minzoom': 11,
        'layout': {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#feebe2'],
                        [0.195, '#fbb4b9'],
                        [0.395, '#f768a1'],
                        [0.595, '#c51b8a'],
                        [0.795, '#7a0177'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': {
                    property: 'pct_bvp',
                    type: 'interval',
                    stops: [
                        [0, '#feebe2'],
                        [0.195, '#fcc0c4'],
                        [0.395, '#fc88b7'],
                        [0.595, '#d64ba5'],
                        [0.795, '#91318f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                }
            }
      },
      ////////////////////////////////
      ////////// AVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_avap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-ce0711',
        'maxzoom': 11,
        "layout": {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_avp',
                    type: 'interval',
                    stops: [
                        [0, '#edf8e9'],
                        [0.195, '#bae4b3'],
                        [0.395, '#74c476'],
                        [0.595, '#31a354'],
                        [0.795, '#006d2c'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': '#F0F8EC'
            }
      },
      {
        'id': 'block_avap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020-d6ktwd',
        'minzoom': 11,
        'layout': {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_avp',
                    type: 'interval',
                    stops: [
                        [0, '#edf8e9'],
                        [0.195, '#bae4b3'],
                        [0.395, '#74c476'],
                        [0.595, '#31a354'],
                        [0.795, '#006d2c'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': '#F0F8EC'
            }
      },
      ////////////////////////////////
      ////////// HVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_hvap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-ce0711',
        'maxzoom': 11,
        "layout": {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_hvp',
                    type: 'interval',
                    stops: [
                        [0, '#feedde'],
                        [0.195, '#fdbe85'],
                        [0.395, '#fd8d3c'],
                        [0.595, '#e6550d'],
                        [0.795, '#a63603'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': '#feedde'
            }
      },
      {
        'id': 'block_hvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020-d6ktwd',
        'minzoom': 11,
        'layout': {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_hvp',
                    type: 'interval',
                    stops: [
                        [0, '#feedde'],
                        [0.195, '#fdbe85'],
                        [0.395, '#fd8d3c'],
                        [0.595, '#e6550d'],
                        [0.795, '#a63603'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75,
                'fill-outline-color': '#feedde'
            }
      }
  	];