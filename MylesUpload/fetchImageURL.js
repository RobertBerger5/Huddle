//api call:
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20
/*var request = require('request');
function testt() {
  var getUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20';
  var r = request.get(getUrl, function (err, res, body) {
    return r.uri.href;
    //console.log(res.request.uri.href);
    //console.log(this.uri.href);
  });
}

var test = testt();;
console.log(test);
*/
var request = require('request');
const apiKey = 'AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20';

function getPhoto(reference, photoNum) {
  let getUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + reference + '&key=' + apiKey;
  let r = request.get(getUrl, function (err, res, body) {places.results[i] r.uri.href;});
}

var x = getPhoto('CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU');
console.log(x);

/*function clean(places) {
  //create our return
  var ret = {results : []};

  //begin parsing our results
  let i = 0;
  while(places.results[i]) {
    //get our current result values
    let cur = places.results[i];
    //Our temp to push to our ret array
    let temp = {
      lat: cur.geometry.location.lat, //latitude
      lng: cur.geometry.location.lng, //longitude
      name: cur.name, //place name
      photoRaw: cur.photos[0].photo_reference, //the raw photo reference for the api call
      price_level: cur.price_level, //price Level
      rating: cur.rating, //User ratings
      user_ratings_total: cur.user_ratings_total //how many ratings
    };

    //Push cleaned values to returned array
    ret.results.push(temp);
    i++; //inrement to the next value
  }

  //return our cleaned array
  return ret;
}

//var json = require('./test.json'); //(with path)'
//console.log(clean(json));

var json = {
   "html_attributions" : [],
   "results" : [
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8585416,
               "lng" : 151.2100441
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.85717357010728,
                  "lng" : 151.2112493798927
               },
               "southwest" : {
                  "lat" : -33.85987322989273,
                  "lng" : 151.2085497201073
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
         "id" : "8e980ad0c819c33cdb1cea31e72d654ca61a7065",
         "name" : "Cruise Bar",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 2988,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/115126912503729443190\"\u003eEileen L\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAXHM81u4iSVNnlxHBOEVV5fZq-sp_24qVEdy4LwoKZ9UuNtSTuTf-8ji1VAiXo0DDOxaUACkN-odu2l7ovuwK8GJQ0DUdcUaZEnlHdTwPE9kaG1yjlsr1exEF2nu45GCOEhBxjlRdSj4X2jnqgUMMHB43GhStpUrw7K6aAoLj5qvVe-oCB3gDnw",
               "width" : 5312
            }
         ],
         "place_id" : "ChIJi6C1MxquEmsR9-c-3O48ykI",
         "plus_code" : {
            "compound_code" : "46R6+H2 The Rocks, New South Wales",
            "global_code" : "4RRH46R6+H2"
         },
         "price_level" : 2,
         "rating" : 4,
         "reference" : "ChIJi6C1MxquEmsR9-c-3O48ykI",
         "scope" : "GOOGLE",
         "types" : [ "bar", "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1008,
         "vicinity" : "Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8677371,
               "lng" : 151.2016936
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86637842010727,
                  "lng" : 151.2031597798928
               },
               "southwest" : {
                  "lat" : -33.86907807989272,
                  "lng" : 151.2004601201073
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
         "id" : "f1e044040bd03ff06e19de4798b52dd926855281",
         "name" : "Sydney Harbour Dinner Cruises",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 2459,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/109764923610545394994\"\u003eA Google User\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAcBtLBTcsFRSc_j9ajlKEODyfitHp0NtMjcGhPysLXQCSpEgQ2pQqRcxYtjoOFYF1Vh2tW-l2YGrGGWin5lPVu0y3z83PDhtZgwlUz4CevxW8sPN-aoWp5MUGgLtjNPtoEhDqRobWEiXNborDlBRJtJ9yGhTpw3qzSjKYr2PNnd5-dbXLd5ZvXA",
               "width" : 2500
            }
         ],
         "place_id" : "ChIJM1mOVTS6EmsRKaDzrTsgids",
         "plus_code" : {
            "compound_code" : "46J2+WM Sydney, New South Wales",
            "global_code" : "4RRH46J2+WM"
         },
         "rating" : 5,
         "reference" : "ChIJM1mOVTS6EmsRKaDzrTsgids",
         "scope" : "GOOGLE",
         "types" : [
            "tourist_attraction",
            "travel_agency",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 2,
         "vicinity" : "32 The Promenade, Sydney"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8609391,
               "lng" : 151.2098735
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.85958927010727,
                  "lng" : 151.2112233298927
               },
               "southwest" : {
                  "lat" : -33.86228892989272,
                  "lng" : 151.2085236701072
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
         "id" : "9ea7c77cb181b1f33d19c9d76121fcc6d5246ad8",
         "name" : "Australian Cruise Group",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 1536,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/113088009011192061895\"\u003eKeith Bauman\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAvme7fwYydMGdYZoDiV2rLwSsmzBwFjV2XHRCFoVmK6XuUpPHN7Y8TuNJpf13w2JPerDMdmfTLpjUHYe9y8Gqu43zv6iBB_mxdwgEp9QQqu0WkfibL3mksXIrpr29lnFJEhBdIc9P05otVpmauor9gFG7GhRtEtW50Yn8VEeiYi7FnwQ6QkSqMA",
               "width" : 2048
            }
         ],
         "place_id" : "ChIJpU8KgUKuEmsRKErVGEaa11w",
         "plus_code" : {
            "compound_code" : "46Q5+JW Sydney, New South Wales",
            "global_code" : "4RRH46Q5+JW"
         },
         "rating" : 4.4,
         "reference" : "ChIJpU8KgUKuEmsRKErVGEaa11w",
         "scope" : "GOOGLE",
         "types" : [
            "travel_agency",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 5,
         "vicinity" : "6 Cirular Quay, Sydney"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8686058,
               "lng" : 151.2018206
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86732247010728,
                  "lng" : 151.2033693798927
               },
               "southwest" : {
                  "lat" : -33.87002212989272,
                  "lng" : 151.2006697201072
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
         "id" : "21a0b251c9b8392186142c798263e289fe45b4aa",
         "name" : "Rhythmboat Cruises",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 2269,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/104066891898402903288\"\u003eRhythmboat Sydney Harbour Cruises\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAArQMUt2RMppjg1r8dQlhw8BzWLf1afPVKjxemt-afg3Uzi5RHp1SqO2KeUq_hK9Z2u8MYbBjvQHYGGXJY_CYV1qGZSjxglsswZEBnCVvdfZJ2c0xWy7b_DSBMx-l_joJOEhCNmfdocikjyRZAdbadpP4PGhT5b-mDd2t839k5Q70bcoIfmQo0uw",
               "width" : 4032
            }
         ],
         "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         "plus_code" : {
            "compound_code" : "46J2+HP Sydney, New South Wales",
            "global_code" : "4RRH46J2+HP"
         },
         "rating" : 4,
         "reference" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
         "scope" : "GOOGLE",
         "types" : [
            "travel_agency",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 27,
         "vicinity" : "King Street Wharf, King St, Sydney"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.858502,
               "lng" : 151.2099044
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.85714302010729,
                  "lng" : 151.2111814798927
               },
               "southwest" : {
                  "lat" : -33.85984267989273,
                  "lng" : 151.2084818201073
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "6facf611e56f3d6f232a24e60d9392759bbd43fa",
         "name" : "Junk Lounge",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 608,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/104473997089847488714\"\u003eA Google User\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAOFLcdiSsmDji1CNTGK8yCmh6ugmlKMQWzhV-pGhxivf-pT-C6yYoR2FjXPfatECLf-4VLI5SSNsH2sRiHZtxWL8LcGKRX6z-FjslxXsuNJu-_2Iai4mY_WqdejtBASkEEhA64uMfsP0sJTFKA4as1nNJGhTq1g91FD75ccuMQ2fYx7uHscjLyA",
               "width" : 1080
            }
         ],
         "place_id" : "ChIJq9W3HZOvEmsRYtKNTRmq34M",
         "plus_code" : {
            "compound_code" : "46R5+HX The Rocks, New South Wales",
            "global_code" : "4RRH46R5+HX"
         },
         "price_level" : 2,
         "rating" : 4.1,
         "reference" : "ChIJq9W3HZOvEmsRYtKNTRmq34M",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 36,
         "vicinity" : "Level 2, Overseas Passenger Terminal, Circular Quay W, The Rocks"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8675885,
               "lng" : 151.2015896
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86618797010728,
                  "lng" : 151.2029996798927
               },
               "southwest" : {
                  "lat" : -33.86888762989273,
                  "lng" : 151.2003000201072
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
         "id" : "dec25eec746943ffbc96e3719623dbbb12d4d2a2",
         "name" : "Magistic Cruises",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 3456,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/111624752247196095718\"\u003eNieves Casais\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAA6aQVN003t-sZy9P5IF4FB1G9uDTDXy_Xpo9AGo2ip7plrSWQYqlp7tF9vRssXSREqu-3MjWsFpz49fQCSVQdNvoGNXhoLqepxlPAnCPJXXmAHY1FO-bdxgMBIy3EaM2iEhDJOpV5ah25FA0kOJneL6r-GhTMZZBglTkKMA50z88vtHw--42a0Q",
               "width" : 4608
            }
         ],
         "place_id" : "ChIJxRjqYTiuEmsRGebAA_chDLE",
         "plus_code" : {
            "compound_code" : "46J2+XJ Sydney, New South Wales",
            "global_code" : "4RRH46J2+XJ"
         },
         "rating" : 4,
         "reference" : "ChIJxRjqYTiuEmsRGebAA_chDLE",
         "scope" : "GOOGLE",
         "types" : [
            "tourist_attraction",
            "travel_agency",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 81,
         "vicinity" : "King Street Wharf, 32 The Promenade, Sydney"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8694519,
               "lng" : 151.2026054
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86810207010728,
                  "lng" : 151.2039552298927
               },
               "southwest" : {
                  "lat" : -33.87080172989273,
                  "lng" : 151.2012555701073
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "a6e1f64a92b2529d751449641d8fb2c8b9d7e056",
         "name" : "Cockle Bay Wharf",
         "opening_hours" : {
            "open_now" : true
         },
         "photos" : [
            {
               "height" : 3024,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/114506261366431391535\"\u003eJohn Chan\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAALJB8rkObBje7FCWjldLu6SURVCsMvPcRHdSy7y61hpez70YDJ_AizEBAQD8gP2esrQlBOelUxHJ5lTodwuXIi5Voe4hFyCiBXjdGmPRC5eWqLE243zqjzQykdy_g2oFbEhC4ZGgyDgzs_LfsB-iZx_XMGhTFn6LE-JQgrLvKuJJxQ0YDV99NtA",
               "width" : 4032
            }
         ],
         "place_id" : "ChIJvwSIiTiuEmsRhszQoBc2SY8",
         "plus_code" : {
            "compound_code" : "46J3+62 Sydney, New South Wales",
            "global_code" : "4RRH46J3+62"
         },
         "rating" : 4.4,
         "reference" : "ChIJvwSIiTiuEmsRhszQoBc2SY8",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 1065,
         "vicinity" : "201 Sussex St, Sydney"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8582724,
               "lng" : 151.2100117
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.85690727010728,
                  "lng" : 151.2112615298927
               },
               "southwest" : {
                  "lat" : -33.85960692989272,
                  "lng" : 151.2085618701073
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "968577d1adec336585598220ccaba8e05f3b9b54",
         "name" : "Yuki's at the Quay",
         "opening_hours" : {
            "open_now" : false
         },
         "photos" : [
            {
               "height" : 3464,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/106981743284611658289\"\u003eMarc MERLIN\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAFeExXM6bTWl5TErEAqmj_QZ1fnQL9oFKtEnAZxghBb2VROOQbudw1DTrW3AfE70k_ZL-A0BI-NQhOw2SCvwE3iMefkGchn-7xE6qSYiKBYubrWCkz9TkHHHa4SmVI-PqEhDVw3svmyo17tnw5HarKZukGhTGuN-fDJqzNxeB1OTCGM7jfxHUbw",
               "width" : 4618
            }
         ],
         "place_id" : "ChIJkUcHV12uEmsRdEyuYJC4zDk",
         "plus_code" : {
            "compound_code" : "46R6+M2 The Rocks, New South Wales",
            "global_code" : "4RRH46R6+M2"
         },
         "price_level" : 2,
         "rating" : 4,
         "reference" : "ChIJkUcHV12uEmsRdEyuYJC4zDk",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
         "user_ratings_total" : 109,
         "vicinity" : "Level 4 Overseas Passenger Terminal, The Rocks"
      },
      {
         "business_status" : "OPERATIONAL",
         "geometry" : {
            "location" : {
               "lat" : -33.8622576,
               "lng" : 151.2128469
            },
            "viewport" : {
               "northeast" : {
                  "lat" : -33.86091222010727,
                  "lng" : 151.2142697798927
               },
               "southwest" : {
                  "lat" : -33.86361187989272,
                  "lng" : 151.2115701201072
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
         "id" : "5f0778e471ae3ade36ec86977ae7ab8e63357a14",
         "name" : "Sir Stamford at Circular Quay",
         "photos" : [
            {
               "height" : 1748,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/101513927641784981366\"\u003eA Google User\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAdynBBu1NWAONuBLvULvqaM-UeMOdA9zo8xSVJCqlGxuq3kTeXBBfzP_m8sl5sOMUO_9aWdwfeWPZv0ypEQ6xruVuu3KXvm7O7SZodOTqj7TCTUCnbBhzOS1evZ1uMHO7EhAZSJphiOUDj8lMi8P2zpiDGhQc63VrzIsrQHyqhPioIwAX37tavA",
               "width" : 1748
            }
         ],
         "place_id" : "ChIJ2X1PrGmuEmsRrgRKqd4bb9I",
         "plus_code" : {
            "compound_code" : "46Q7+34 Sydney, New South Wales",
            "global_code" : "4RRH46Q7+34"
         },
         "rating" : 4.4,
         "reference" : "ChIJ2X1PrGmuEmsRrgRKqd4bb9I",
         "scope" : "GOOGLE",
         "types" : [
            "lodging",
            "bar",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
         ],
         "user_ratings_total" : 843,
         "vicinity" : "93 Macquarie St, Sydney"
      }
   ],
   "status" : "OK"
};

console.log(clean(json));


*/
