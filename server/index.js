var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fetch = require("node-fetch");

//sessions expire after this amount of time (1 hour in milliseconds)
const MAX_TIME = 3600000;

//Google Places API key
const apiKey = 'AIzaSyDAuZt7d6V0zQn72hH7aSYT6HbhXwFyTSo';


//don't need this with React-Native, but it really helps with testing
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/test.html');
});

//TODO: don't let people join after the room has started

/*global hash map for rooms with the key being the room id and value as object:
	people = number of people
	type = type of room (restaurant, bar, etc.)
	status = (created, searching, found, resolved) (unused so far)
	results = return of the search API (initialized to null)
*/
var rooms = {};

io.on('connection', (socket) => {
	console.log('user connected');
	//start without a room by default. Also, users are only ever in one room at a time
	socket.mainRoom = null;

	//request to create a room
	socket.on('create', (type) => {
		if (socket.mainRoom != null) {
			socket.emit('error', 'Cannot join another room');
			console.log("(someone tried to create a room while already in one)");
			return;
		}

		//room id
		let id = null;
		do {
			//generate an id unique to the millisecond
			id = (Date.now() % MAX_TIME).toString(36);
		} while (id in rooms);//and keep trying if it already exists
		//(worst case: people wait while we create one new room per millisecond, which shouldn't be bad at all unless we get VERY popular)

		//assert: id is not already a key in rooms (and node.js is a single thread, so no one could've taken that id in the meantime)
		socket.join(id); //socket.io join room
		socket.mainRoom = id; //so we know which room they belong to
		//initialize the room
		rooms[id] = { people: 1, type: type, status: "created", results: null };
		socket.emit('message', type + " room created with id: " + id);
		console.log("room created with id: " + id);

		setTimeout(() => {
			console.log("TODO: kick em all out of " + id);
		}, MAX_TIME);

		//SEARCH for the API call
		getResults(id,socket); //emits 'results' with API results back to room creator
	});

	//request to join a room
	socket.on('join', (id) => {
		if (socket.mainRoom != null) {
			socket.emit('error', 'Cannot join another room');
			console.log("(someone tried to join a room while already in one)");
			return;
		}

		if (id in rooms) {
			socket.join(id);//subscribe to socket.io room
			socket.mainRoom = id;//so we know which room they belong to
			rooms[id].people++;//one more person in
			socket.to(id).emit('message', 'user joined. ' + (rooms[id].people) + ' users here.');//send to everyone but new user
			socket.emit('message', 'joined room: ' + id + '. There are ' + (rooms[id].people - 1) + ' others here.');//send only to new user
			console.log("user joined room " + id);

			//send them the results to load in
			socket.emit('results', rooms[id].results);
		} else {
			socket.emit('error', 'Room "' + id + '" not found');
			console.log("(someone tried to join a room that doesn't exist)");
		}
	});

	socket.on('start', () => {
		if(socket.mainRoom==null){
			socket.emit('error','Need to be in a room to start session');
			console.log("(someone tried to start while not in a session)");
			return;
		}
		//let everyone know that the session has started
		io.to(socket.mainRoom).emit('started');
	});

	socket.on('leave', () => {
		leaveRoom(socket);
	});

	socket.on('disconnect', () => {
		leaveRoom(socket);
		console.log('user left');
	});

	//API results returned to user, and they're making choices
	socket.on('swipe', (locI, swipe) => {
		//user swiped {swipe} on {results.candidates[locI]}
		//very minimal at the moment, doesn't even check if they're in a room and that the room has searched / has results
		let id = socket.mainRoom;
		console.log("user voted " + swipe + " for " + rooms[id].results.results[locI].name);
	});
});

//open port
http.listen(3000, () => {
	console.log('listening on *:3000');
});

//leaves socket.mainRoom, used both when a user clicks "leave" and when they disconnect
function leaveRoom(socket) {
	let id = socket.mainRoom;
	if (id == null) {
		socket.emit('error', 'No room to leave');
		console.log("(someone tried to leave without being in a room)");
		return;
	}
	socket.leave(id);
	socket.mainRoom = null;
	rooms[id].people--;
	if (rooms[id].people <= 0) { //("<" shouldn't be necessary, but just in case)
		//no one left, get rid of the empty room
		delete rooms[id];
		console.log("deleting room " + id);
	} else {
		//room not empty, notify people of person leaving
		socket.to(id).emit('message', 'user left, room down to ' + rooms[id].people + ' people');
		console.log("user left room " + id);
	}
	socket.emit('message', 'left room');
	//console.log(rooms);
}

//makes an api call, sends result (whenever it gets it) to room and keeps track of it
async function getResults(id,socket) {
	let ret = await getLocations('restaurant', '44.4583', '-93.1616', '5000');
	socket.emit('results', ret);//send creator the results
	rooms[id].results = ret;//remember it on the server
}

//use Google Maps API (or whatever cheaper option we go with) to get the things
async function getLocations(type, lat, long, radius) {
    var reqURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&type=restaurant&key=" + apiKey;
	let apiRet = await makeApiCall(reqURL);
	return clean(apiRet);
}

const sleep = (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

function clean(places) {
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

//performs a google places api call
function makeApiCall(reqURL) {
    fetch(reqURL)
    .then(res => res.json())
    .then(json => {
      return json;
      }
    });
}

//for now, just return this object from Myles' API call
function makeDummyCall() {
	console.log("dummyCall");
	let ret = {
		"html_attributions": [],
		"results": [
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8585416,
						"lng": 151.2100441
					},
					"viewport": {
						"northeast": {
							"lat": -33.85717357010728,
							"lng": 151.2112493798927
						},
						"southwest": {
							"lat": -33.85987322989273,
							"lng": 151.2085497201073
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
				"id": "8e980ad0c819c33cdb1cea31e72d654ca61a7065",
				"name": "Cruise Bar",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 2988,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/115126912503729443190\"\u003eEileen L\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAA8x7-Xnlx-5N1XTCofqaUfh7uaUjoyoG48Y5gl3MutsTTaCeZui356UtxnXJwhaH4s0-Xgc2Sj3f_Qggb3voYa10BJZbRi9PyMlaXFChD3aDtgQaBiBkmje_4KXA4GbO7EhBRKsO4cRPyFEmDLPbG-Pr7GhRt0et-QrSiCeio-6H7lf1EQhwUbw",
						"width": 5312
					}
				],
				"place_id": "ChIJi6C1MxquEmsR9-c-3O48ykI",
				"plus_code": {
					"compound_code": "46R6+H2 The Rocks, New South Wales",
					"global_code": "4RRH46R6+H2"
				},
				"price_level": 2,
				"rating": 4,
				"reference": "ChIJi6C1MxquEmsR9-c-3O48ykI",
				"scope": "GOOGLE",
				"types": ["bar", "restaurant", "food", "point_of_interest", "establishment"],
				"user_ratings_total": 1008,
				"vicinity": "Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8677371,
						"lng": 151.2016936
					},
					"viewport": {
						"northeast": {
							"lat": -33.86637842010727,
							"lng": 151.2031597798928
						},
						"southwest": {
							"lat": -33.86907807989272,
							"lng": 151.2004601201073
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
				"id": "f1e044040bd03ff06e19de4798b52dd926855281",
				"name": "Sydney Harbour Dinner Cruises",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 2459,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/109764923610545394994\"\u003eA Google User\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAcV3V1xtjxaSNHqLBKcsCdjzvxg2MFUpwGgdrwEFODvNEh_pBXZkEtmbx6yKSp5Z6GauLUSKVnhnO6N5Pjo-cqwy3JNmAxYOLw7vFAAcxMgLvAzUiKpXjNU86oTLO7VLuEhCQVrld0Df9Rq1btY9Q-7LTGhSQC0LXLF7Oc_ep2xon0gxaL_8KcQ",
						"width": 2500
					}
				],
				"place_id": "ChIJM1mOVTS6EmsRKaDzrTsgids",
				"plus_code": {
					"compound_code": "46J2+WM Sydney, New South Wales",
					"global_code": "4RRH46J2+WM"
				},
				"rating": 5,
				"reference": "ChIJM1mOVTS6EmsRKaDzrTsgids",
				"scope": "GOOGLE",
				"types": [
					"tourist_attraction",
					"travel_agency",
					"restaurant",
					"food",
					"point_of_interest",
					"establishment"
				],
				"user_ratings_total": 2,
				"vicinity": "32 The Promenade, Sydney"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8609391,
						"lng": 151.2098735
					},
					"viewport": {
						"northeast": {
							"lat": -33.85958927010727,
							"lng": 151.2112233298927
						},
						"southwest": {
							"lat": -33.86228892989272,
							"lng": 151.2085236701072
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
				"id": "9ea7c77cb181b1f33d19c9d76121fcc6d5246ad8",
				"name": "Australian Cruise Group",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 1536,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/113088009011192061895\"\u003eKeith Bauman\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAHtujPGyvs7GyrgQxwFFDuMgjYKrw96W2Mn3dmue0-xgcG6XBG8CsU41N5KoJtfXjTN_QBQpSE43ei-MtLAMyCeV66DbaKZ7wOokCLNh6AR4tJr9fyp9LePbRrqoxex7NEhDKpE2ugVXtnTC1mon64J9XGhQB9pIDKD5fMh9GB6RSPv-0bTiMEw",
						"width": 2048
					}
				],
				"place_id": "ChIJpU8KgUKuEmsRKErVGEaa11w",
				"plus_code": {
					"compound_code": "46Q5+JW Sydney, New South Wales",
					"global_code": "4RRH46Q5+JW"
				},
				"rating": 4.4,
				"reference": "ChIJpU8KgUKuEmsRKErVGEaa11w",
				"scope": "GOOGLE",
				"types": [
					"travel_agency",
					"restaurant",
					"food",
					"point_of_interest",
					"establishment"
				],
				"user_ratings_total": 5,
				"vicinity": "6 Cirular Quay, Sydney"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8686058,
						"lng": 151.2018206
					},
					"viewport": {
						"northeast": {
							"lat": -33.86732247010728,
							"lng": 151.2033693798927
						},
						"southwest": {
							"lat": -33.87002212989272,
							"lng": 151.2006697201072
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
				"id": "21a0b251c9b8392186142c798263e289fe45b4aa",
				"name": "Rhythmboat Cruises",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 2269,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/104066891898402903288\"\u003eRhythmboat Sydney Harbour Cruises\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAEeho_iNWeKrbCkLb1mOcSF32DwpL79EOJF8Qkf2T86lq3q36XyrQob2PjcpUZ2BznZIpC_Zvrjf2MK3ojpdBb3AzYRABYfXW_ew_X5ipy_FuGAkjLS4CJeM30-z14KPDEhC0ai2M66BL_HEou66LBoWkGhTUA7WE2mUCPpfGzod1dCrsJv3prQ",
						"width": 4032
					}
				],
				"place_id": "ChIJyWEHuEmuEmsRm9hTkapTCrk",
				"plus_code": {
					"compound_code": "46J2+HP Sydney, New South Wales",
					"global_code": "4RRH46J2+HP"
				},
				"rating": 4,
				"reference": "ChIJyWEHuEmuEmsRm9hTkapTCrk",
				"scope": "GOOGLE",
				"types": [
					"travel_agency",
					"restaurant",
					"food",
					"point_of_interest",
					"establishment"
				],
				"user_ratings_total": 27,
				"vicinity": "King Street Wharf, King St, Sydney"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.858502,
						"lng": 151.2099044
					},
					"viewport": {
						"northeast": {
							"lat": -33.85714302010729,
							"lng": 151.2111814798927
						},
						"southwest": {
							"lat": -33.85984267989273,
							"lng": 151.2084818201073
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				"id": "6facf611e56f3d6f232a24e60d9392759bbd43fa",
				"name": "Junk Lounge",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 608,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/104473997089847488714\"\u003eA Google User\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAm2biJi_vn8BCrtN5x3bYWe95qwOD2Bwy8axQyTaMibtw7q-hnxdofdp3gWhaMyShw26mMzr-Y6K5TfwOnD717cTeUS6qJRKZ3x4Sytk8Ph6Zbaq0XbcrI4SZWFToMfh4EhCgoK-xMDYKTxiDvUv2ppeeGhRLq-E80J-wrQ8MfNoqnH-NfJOyfQ",
						"width": 1080
					}
				],
				"place_id": "ChIJq9W3HZOvEmsRYtKNTRmq34M",
				"plus_code": {
					"compound_code": "46R5+HX The Rocks, New South Wales",
					"global_code": "4RRH46R5+HX"
				},
				"price_level": 2,
				"rating": 4.1,
				"reference": "ChIJq9W3HZOvEmsRYtKNTRmq34M",
				"scope": "GOOGLE",
				"types": ["restaurant", "food", "point_of_interest", "establishment"],
				"user_ratings_total": 36,
				"vicinity": "Level 2, Overseas Passenger Terminal, Circular Quay W, The Rocks"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8675885,
						"lng": 151.2015896
					},
					"viewport": {
						"northeast": {
							"lat": -33.86618797010728,
							"lng": 151.2029996798927
						},
						"southwest": {
							"lat": -33.86888762989273,
							"lng": 151.2003000201072
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
				"id": "dec25eec746943ffbc96e3719623dbbb12d4d2a2",
				"name": "Magistic Cruises",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 3456,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/111624752247196095718\"\u003eNieves Casais\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAHuztyBnc-lORyE7PLj10VuzjD2HMEVPwTaqHfty1MfvPSXFRUtGX-8ep3xE5oeQbG6MBodx1nKu2OW0CYO-8kpIrOjzLg5ylfaeH9XhSp7xOrfuY6hFvX5505vM6wp7JEhBbntW3Ys26s_s-t3qjjBsvGhREFzX7pFibIB_EBm3577aTRmeh6A",
						"width": 4608
					}
				],
				"place_id": "ChIJxRjqYTiuEmsRGebAA_chDLE",
				"plus_code": {
					"compound_code": "46J2+XJ Sydney, New South Wales",
					"global_code": "4RRH46J2+XJ"
				},
				"rating": 4,
				"reference": "ChIJxRjqYTiuEmsRGebAA_chDLE",
				"scope": "GOOGLE",
				"types": [
					"tourist_attraction",
					"travel_agency",
					"restaurant",
					"food",
					"point_of_interest",
					"establishment"
				],
				"user_ratings_total": 81,
				"vicinity": "King Street Wharf, 32 The Promenade, Sydney"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8694519,
						"lng": 151.2026054
					},
					"viewport": {
						"northeast": {
							"lat": -33.86810207010728,
							"lng": 151.2039552298927
						},
						"southwest": {
							"lat": -33.87080172989273,
							"lng": 151.2012555701073
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				"id": "a6e1f64a92b2529d751449641d8fb2c8b9d7e056",
				"name": "Cockle Bay Wharf",
				"opening_hours": {
					"open_now": true
				},
				"photos": [
					{
						"height": 3024,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/114506261366431391535\"\u003eJohn Chan\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAA4t5tJbi96_37pEN9ItNUH8Kae-47NeQisiNjM_8Lmcb70-lHm7NPd2W-xTpoMj1S3yXBercMnAFdKnAV1n7nLGjriI-eEEwLfRNx_5cCnAp0DC4nCeoh-0tE-i4SjoqmEhDWBHO3_WIGfIji2-BtSelCGhTIuWznMRH2wC7dS2qLssbByNq7GA",
						"width": 4032
					}
				],
				"place_id": "ChIJvwSIiTiuEmsRhszQoBc2SY8",
				"plus_code": {
					"compound_code": "46J3+62 Sydney, New South Wales",
					"global_code": "4RRH46J3+62"
				},
				"rating": 4.4,
				"reference": "ChIJvwSIiTiuEmsRhszQoBc2SY8",
				"scope": "GOOGLE",
				"types": ["restaurant", "food", "point_of_interest", "establishment"],
				"user_ratings_total": 1065,
				"vicinity": "201 Sussex St, Sydney"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8582724,
						"lng": 151.2100117
					},
					"viewport": {
						"northeast": {
							"lat": -33.85690727010728,
							"lng": 151.2112615298927
						},
						"southwest": {
							"lat": -33.85960692989272,
							"lng": 151.2085618701073
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				"id": "968577d1adec336585598220ccaba8e05f3b9b54",
				"name": "Yuki's at the Quay",
				"opening_hours": {
					"open_now": false
				},
				"photos": [
					{
						"height": 3464,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/106981743284611658289\"\u003eMarc MERLIN\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAf-uhZs0cSYNHJXGg8Am_MfF3_RP4a_68x8tjM32EOyKHE1ea56z1qPseKjRFLF1Uo5dilvtqHoD4bNbmuBdLWgWb-UJ97MJjGsmIbZQbLLUG1P4w6mkC3Ph_vFZe943fEhDnwTUjyLUVgjPodZVhU3slGhT3sn_FJ7xBZfffl7qWslu8sU20WQ",
						"width": 4618
					}
				],
				"place_id": "ChIJkUcHV12uEmsRdEyuYJC4zDk",
				"plus_code": {
					"compound_code": "46R6+M2 The Rocks, New South Wales",
					"global_code": "4RRH46R6+M2"
				},
				"price_level": 2,
				"rating": 4,
				"reference": "ChIJkUcHV12uEmsRdEyuYJC4zDk",
				"scope": "GOOGLE",
				"types": ["restaurant", "food", "point_of_interest", "establishment"],
				"user_ratings_total": 109,
				"vicinity": "Level 4 Overseas Passenger Terminal, The Rocks"
			},
			{
				"business_status": "OPERATIONAL",
				"geometry": {
					"location": {
						"lat": -33.8622576,
						"lng": 151.2128469
					},
					"viewport": {
						"northeast": {
							"lat": -33.86091222010727,
							"lng": 151.2142697798927
						},
						"southwest": {
							"lat": -33.86361187989272,
							"lng": 151.2115701201072
						}
					}
				},
				"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
				"id": "5f0778e471ae3ade36ec86977ae7ab8e63357a14",
				"name": "Sir Stamford at Circular Quay",
				"photos": [
					{
						"height": 1748,
						"html_attributions": [
							"\u003ca href=\"https://maps.google.com/maps/contrib/101513927641784981366\"\u003eA Google User\u003c/a\u003e"
						],
						"photo_reference": "CmRaAAAAZndHWWann1eGTqjGlalaisMXHgI67aje5VVfJHFBvrclmOxf8S12tIO0eenAiunUwmwyp4Afhs5OpMzAETxgWE5H80tOc8fNt_WDsiPiAX6FFkHjvpe7PZdahW9-M488EhCx4FG_wJCCfozi5Z7AnrgfGhQFpPhhdu7czkuUW6vzk10Z7xXVpQ",
						"width": 1748
					}
				],
				"place_id": "ChIJ2X1PrGmuEmsRrgRKqd4bb9I",
				"plus_code": {
					"compound_code": "46Q7+34 Sydney, New South Wales",
					"global_code": "4RRH46Q7+34"
				},
				"rating": 4.4,
				"reference": "ChIJ2X1PrGmuEmsRrgRKqd4bb9I",
				"scope": "GOOGLE",
				"types": [
					"lodging",
					"bar",
					"restaurant",
					"food",
					"point_of_interest",
					"establishment"
				],
				"user_ratings_total": 843,
				"vicinity": "93 Macquarie St, Sydney"
			}
		],
		"status": "OK"
	};
	return ret;
}
