
  	/**
  	 * Mapbox GL `Map` sources
  	 * @type {Object}
  	 */
  	sources = {
  	 //  'src_states': {
  		// type: 'geojson',
    //     data: 'data/states.json'
  	 //  },
      'src_house': {
        type:'geojson',
        data:'data/house15_census20.geojson'
      },
      'src_house_p1': {
        type:'geojson',
        data:'data/house_prop1_dem.geojson'
      },
      'src_house_p2r': {
        type:'geojson',
        data:'data/house_prop2_rep.geojson'
      },
      'src_house_p3': {
        type:'geojson',
        data:'data/enacted_house22_2024update.geojson'
      },
      'src_house_r1': {
        type:'geojson',
        data:'data/house_remedy_1_2024update.geojson'
      },
      'src_house_r2': {
        type:'geojson',
        data:'data/house_remedy_2.geojson'
      },
      'src_senate': {
        type:'geojson',
        data:'data/senate14_census20.geojson'
      },
      'src_senate_p1': {
        type:'geojson',
        data:'data/senate_prop1_dem.geojson'
      },
      'src_senate_p2': {
        type:'geojson',
        data:'data/senate_prop2_rep.geojson'
      },
      'src_senate_p3': {
        type:'geojson',
        data:'data/enacted_senate22_2024update.geojson'
      },
      'src_senate_r1': {
        type:'geojson',
        data:'data/senate_remedy_40pct_2024update.geojson'
      },
      'src_senate_r2': {
        type:'geojson',
        data:'data/senate_remedy_2.geojson'
      },
      'src_congress': {
        type:'geojson',
        data:'data/congress12_census20.geojson'
      },
      'src_congress_proposed': {
        type:'geojson',
        data:'data/congress21_census20.geojson'
      },
      'src_congress_proposed_2': {
        type:'geojson',
        data:'data/congress21_p2.geojson'
      },
      'src_congress_proposed_3': {
        type:'geojson',
        data:'data/enacted_congress22_2024update.geojson'
      },
      'src_congress_r1': {
        type:'geojson',
        data:'data/congress_remedy_1_2024update.geojson'
      },
      'src_congress_r2': {
        type:'geojson',
        data:'data/congress_remedy_2.geojson'
      },
      'src_cities': {
        type:'geojson',
        data:'data/places_2020data.geojson'
      },
      'src_counties': {
        type:'geojson',
        data:'data/county.geojson'
      },
      'src_tract': {
        type: 'vector',
        url: 'mapbox://fdgamaps.0rih3puc'
      },
      'src_block': {
        type: 'vector',
        url: 'mapbox://fdgamaps.3hcg2lso'
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
      //county borders
      {
        'id': 'county_borders',
        'type': 'line',
        'source': 'src_counties',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': '#969696',
          'line-width': 1
        }
      },
      //city boundaries
      {
        'id': 'city_borders',
        'type': 'line',
        'source': 'src_cities',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': '#0AB2BB',
          'line-width': 1.5
        }
      },
      {
        'id': 'city_borders_fill',
        'type': 'fill',
        'source': 'src_cities',
        'minzoom': 11,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'fill-outline-color': '#0AB2BB',
          'fill-color': '#0AB2BB',
          'fill-opacity' : 0.1
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
            "fill-opacity": 1
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
      // HOUSE DISTRICS - Proposed DEM //
      ////////////////////////////////
      {
        'id': 'house_p1',
        'source': 'src_house_p1',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'house_p1_fill',
        'source': 'src_house_p1',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'house_p1_hover',
        'source': 'src_house_p1',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_p1_popup',
        'source': 'src_house_p1',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // HOUSE DISTRICS - Proposed REP //
      ////////////////////////////////
      {
        'id': 'house_p2',
        'source': 'src_house_p2r',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'house_p2_fill',
        'source': 'src_house_p2r',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'house_p2_hover',
        'source': 'src_house_p2r',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_p2_popup',
        'source': 'src_house_p2r',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // HOUSE DISTRICS - Proposed REP //
      ////////////////////////////////
      {
        'id': 'house_p3',
        'source': 'src_house_p3',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'house_p3_fill',
        'source': 'src_house_p3',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'house_p3_hover',
        'source': 'src_house_p3',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_p3_popup',
        'source': 'src_house_p3',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // HOUSE DISTRICS - REMEDY //
      ////////////////////////////////
      {
        'id': 'house_r1',
        'source': 'src_house_r1',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'house_r1_fill',
        'source': 'src_house_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'house_r1_hover',
        'source': 'src_house_r1',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_r1_popup',
        'source': 'src_house_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      ////////////////////////////////
      // HOUSE DISTRICS - REMEDY //
      ////////////////////////////////
      {
        'id': 'house_r2',
        'source': 'src_house_r2',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'house_r2_fill',
        'source': 'src_house_r2',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'house_r2_hover',
        'source': 'src_house_r2',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'house_r2_popup',
        'source': 'src_house_r2',
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
            "fill-opacity": 1
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
      /////////////////////////////////////////
      // SENATE DISTRICS - PROPOSED 1, DEMS//
      /////////////////////////////////////////
      {
        'id': 'senate_p1',
        'source': 'src_senate_p1',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'senate_p1_fill',
        'source': 'src_senate_p1',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'senate_p1_hover',
        'source': 'src_senate_p1',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'senate_p1_popup',
        'source': 'src_senate_p1',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },

      /////////////////////////////////////////
      // SENATE DISTRICS - PROPOSED 2, REPS//
      /////////////////////////////////////////
      {
        'id': 'senate_p2',
        'source': 'src_senate_p2',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'senate_p2_fill',
        'source': 'src_senate_p2',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'senate_p2_hover',
        'source': 'src_senate_p2',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'senate_p2_popup',
        'source': 'src_senate_p2',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      /////////////////////////////////////////
      // SENATE DISTRICS - PROPOSED 3, REPS//
      /////////////////////////////////////////
      {
        'id': 'senate_p3',
        'source': 'src_senate_p3',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'senate_p3_fill',
        'source': 'src_senate_p3',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'senate_p3_hover',
        'source': 'src_senate_p3',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'senate_p3_popup',
        'source': 'src_senate_p3',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      /////////////////////////////////////////
      // SENATE DISTRICS - REMEDY 1//
      /////////////////////////////////////////
      {
        'id': 'senate_r1',
        'source': 'src_senate_r1',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'senate_r1_fill',
        'source': 'src_senate_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'senate_r1_hover',
        'source': 'src_senate_r1',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },

      {
        'id': 'senate_r1_popup',
        'source': 'src_senate_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      /////////////////////////////////////////
      // SENATE DISTRICS - REMEDY 2//
      /////////////////////////////////////////
      {
        'id': 'senate_r2',
        'source': 'src_senate_r2',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'senate_r2_fill',
        'source': 'src_senate_r2',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'senate_r2_hover',
        'source': 'src_senate_r2',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      
      {
        'id': 'senate_r2_popup',
        'source': 'src_senate_r2',
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
            "fill-opacity": 1
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
      //////////////////////////////////////
      // CONGRESS PROPOSED DISTRICS P1, 2020 //
      /////////////////////////////////////
      {
        'id': 'congress_proposed',
        'source': 'src_congress_proposed',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'congress_proposed_fill',
        'source': 'src_congress_proposed',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'congress_proposed_hover',
        'source': 'src_congress_proposed',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_proposed_popup',
        'source': 'src_congress_proposed',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      //////////////////////////////////////
      // CONGRESS PROPOSED DISTRICS P2, 2020 //
      /////////////////////////////////////
      {
        'id': 'congress_proposed_2',
        'source': 'src_congress_proposed_2',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'congress_proposed_2_fill',
        'source': 'src_congress_proposed_2',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'congress_proposed_2_hover',
        'source': 'src_congress_proposed_2',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_proposed_2_popup',
        'source': 'src_congress_proposed_2',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      //////////////////////////////////////
      // CONGRESS PROPOSED DISTRICS P3, 2020 //
      /////////////////////////////////////
      {
        'id': 'congress_proposed_3',
        'source': 'src_congress_proposed_3',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'congress_proposed_3_fill',
        'source': 'src_congress_proposed_3',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'congress_proposed_3_hover',
        'source': 'src_congress_proposed_3',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_proposed_3_popup',
        'source': 'src_congress_proposed_3',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      //////////////////////////////////////
      // CONGRESS REMEDY MAP 12/1/2023 //
      /////////////////////////////////////
      {
        'id': 'congress_r1',
        'source': 'src_congress_r1',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'congress_r1_fill',
        'source': 'src_congress_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'congress_r1_hover',
        'source': 'src_congress_r1',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_r1_popup',
        'source': 'src_congress_r1',
        'type': 'fill',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            "fill-opacity": 0
            }
      },
      //////////////////////////////////////
      // CONGRESS GHDC REMEDY MAP 12/4/2023 //
      /////////////////////////////////////
      {
        'id': 'congress_r2',
        'source': 'src_congress_r2',
        'type': 'line',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
          'line-color': "#750505",
          'line-width': 2
        }
      },
      {
        'id': 'congress_r2_fill',
        'source': 'src_congress_r2',
        'type': 'fill',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
            "fill-opacity": 1
            }
      },
      {
        'id': 'congress_r2_hover',
        'source': 'src_congress_r2',
        'type': 'line',
        'layout': {},
        'paint': {
          'line-color': "#c90000",
          'line-width': 4
        },
        'filter': ["==", "DISTRICT", ""]
      },
      {
        'id': 'congress_r2_popup',
        'source': 'src_congress_r2',
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
        // 'maxzoom': 11,
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
        'source-layer': 'tract_census_2020-cmzo8u',
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
                        [0.249, '#aba8d0'],
                        [0.499, '#865ebc'],
                        [0.749, '#664296'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': {
                //     property: 'pct_bvp',
                //     type: 'interval',
                //     stops: [
                //         [0, '#f2f0f7'],
                //         [0.195, '#cbc9e2'],
                //         [0.395, '#9c7dc4'],
                //         [0.595, '#7d52b7'],
                //         [0.795, '#54278f'],
                //         [1.1, '#d4d5d5']
                //     ],
                //     default: 'rgba(0, 0, 0, 0)'
                // }
            }
      },
      {
        'id': 'block_bvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020_small-ai13v3',
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
                        [0.249, '#aba8d0'],
                        [0.499, '#865ebc'],
                        [0.749, '#664296'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': {
                //     property: 'pct_bvp',
                //     type: 'interval',
                //     stops: [
                //         [0, '#f2f0f7'],
                //         [0.195, '#cbc9e2'],
                //         [0.395, '#bba5d6'],
                //         [0.595, '#a48cc2'],
                //         [0.795, '#744ca8'],
                //         [1.1, '#d4d5d5']
                //     ],
                //     default: 'rgba(0, 0, 0, 0)'
                // }
            }
      },
      ////////////////////////////////
      ////////// BIPOCVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_bipocvap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-cmzo8u',
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
                        [0.249, '#fcc0c4'],
                        [0.499, '#d64ba5'],
                        [0.749, '#91318f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': {
                //     property: 'pct_bp_',
                //     type: 'interval',
                //     stops: [
                //         [0, '#feebe2'],
                //         [0.195, '#fcc0c4'],
                //         [0.395, '#fc88b7'],
                //         [0.595, '#d64ba5'],
                //         [0.795, '#91318f'],
                //         [1.1, '#d4d5d5']
                //     ],
                //     default: 'rgba(0, 0, 0, 0)'
                // }
            }
      },
      {
        'id': 'block_bipocvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020_small-ai13v3',
        'minzoom': 11,
        'layout': {
              'visibility': "none"
            },
            'paint': {
                'fill-color': {
                    property: 'pct_bp_',
                    type: 'interval',
                    stops: [
                        [0, '#feebe2'],
                        [0.249, '#fcc0c4'],
                        [0.499, '#d64ba5'],
                        [0.749, '#91318f'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': {
                //     property: 'pct_bp_',
                //     type: 'interval',
                //     stops: [
                //         [0, '#feebe2'],
                //         [0.249, '#fcc0c4'],
                //         [0.499, '#d64ba5'],
                //         [0.749, '#91318f'],
                //         [1.1, '#d4d5d5']
                //     ],
                //     default: 'rgba(0, 0, 0, 0)'
                // }
            }
      },
      ////////////////////////////////
      ////////// AVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_avap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-cmzo8u',
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
                      [0.249, '#bae4b3'],
                      [0.499, '#31a354'],
                      [0.749, '#006d2c'],
                      [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': '#F0F8EC'
            }
      },
      {
        'id': 'block_avap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020_small-ai13v3',
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
                        [0.249, '#bae4b3'],
                        [0.499, '#31a354'],
                        [0.749, '#006d2c'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': '#F0F8EC'
            }
      },
      ////////////////////////////////
      ////////// HVAP - 2020 /////////
      ////////////////////////////////
      {
        'id': 'tract_hvap',
        'type': 'fill',
        'source': 'src_tract',
        'source-layer': 'tract_census_2020-cmzo8u',
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
                        [0.249, '#fdbe85'],
                        [0.499, '#e6550d'],
                        [0.749, '#a63603'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': '#feedde'
            }
      },
      {
        'id': 'block_hvap',
        'type': 'fill',
        'source': 'src_block',
        'source-layer': 'block_census_2020_small-ai13v3',
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
                        [0.249, '#fdbe85'],
                        [0.499, '#e6550d'],
                        [0.749, '#a63603'],
                        [1.1, '#d4d5d5']
                    ],
                    default: 'rgba(0, 0, 0, 0)'
                },
                'fill-opacity': .75
                // 'fill-outline-color': '#feedde'
            }
      }
  	];