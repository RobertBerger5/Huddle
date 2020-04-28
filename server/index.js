var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//sessions expire after this amount of time (1 hour in milliseconds)
const MAX_TIME = 3600000;

//don't need this with React-Native, 
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/test.html');
});

/*global hash map for rooms with the key being the room id and value as object:
	people = number of people
	type = type of room (restaurant, bar, etc.)
	status = (created, searching, found, resolved) (unused so far)
	results = return of the search API (initialized to null)
*/
var rooms = {};https://brentmarquez.com/uncategorized/how-to-get-socket-io-to-work-with-react-native/

io.on('connection', (socket) => {
	console.log('user connected');
	//start without a room by default. Also, users are only ever in one room at a time
	socket.mainRoom = null;

	//request to create a room
	socket.on('create', (type) => {
		if (socket.mainRoom != null) {
			socket.emit('message', 'ERROR: cannot join another room');
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
		setTimeout(() => {
			console.log("TODO: kick em all out of " + id);
		}, MAX_TIME);

		console.log("room created with id: " + id);
	});

	//request to join a room
	socket.on('join', (id) => {//TODO: if room not in "created" st8 anymore, return
		if (socket.mainRoom != null) {
			socket.emit('message', 'ERROR: cannot join another room');
			console.log("(someone tried to join a room while already in one)");
			return;
		}

		if (id in rooms) {
			socket.join(id);//subscribe to socket.io room
			socket.mainRoom = id;//so we know which room they belong to
			rooms[id].people++;//one more person in
			socket.to(id).emit('message', 'user joined. ' + (rooms[id].people) + ' users here.');//send to everyone but new user
			socket.emit('message', 'joined room: ' + id + '. There are ' + (rooms[id].people - 1) + ' others here.');//send only to new user
			console.log("user joined room "+id);
		} else {
			socket.emit('message', 'room "' + id + '" not found');
			console.log("(someone tried to join a room that doesn't exist)");
		}
	});

	socket.on('leave', () => {
		leaveRoom(socket);
	});

	socket.on('disconnect', () => {
		leaveRoom(socket);
		console.log('user left');
	});

	//request to make an API call for locations and return the results
	//as of now, anyone in the room can start the session
	socket.on('search', (lat, lng) => {
		let id = socket.mainRoom;
		if (id == null) {
			socket.emit('message', 'ERROR: you need to be in a room');
			console.log("(someone tried to search while not in a room)");
			return;
		} else if (rooms[id].results != null) {
			socket.emit('message', 'ERROR: your room has already searched');
			console.log("(someone tried to search again)");
			return;
		}
		//console.log("searching for "+lat+", "+lng);
		//call this asynchronous function, which makes the API call and sends the results where they need to go
		getAndSendResults(id, lat, lng);
	});

	//API results returned to user, and they're making choices
	socket.on('swipe', (locI, swipe) => {
		//user swiped {swipe} on {results.candidates[locI]}
		//very minimal at the moment, doesn't even check if they're in a room and that the room has searched / has results
		let id = socket.mainRoom;
		console.log("user voted " + swipe + " for " + rooms[id].results.candidates[locI].name);
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
		socket.emit('message', 'ERROR: no room to leave');
		console.log("(someone tried to leave without )");
		return;
	}
	socket.leave(id);
	socket.mainRoom = null;
	rooms[id].people--;
	if (rooms[id].people <= 0) { //("<" shouldn't be necessary, but just in case)
		//no one left, get rid of the empty room
		delete rooms[id];
		console.log("deleting room "+id);
	} else {
		//room not empty, notify people of person leaving
		socket.to(id).emit('message', 'user left, room down to ' + rooms[id].people + ' people');
		console.log("user left room "+id);
	}
	socket.emit('message', 'left room');
	//console.log(rooms);
}

//makes an api call, sends result (whenever it gets it) to room and keeps track of it
async function getAndSendResults(id, lat, lng) {
	let ret = await getLocations(rooms[id].type, lat, lng);
	io.to(id).emit('results', ret);//send to all
	rooms[id].results = ret;//remember it on the server
}

//use Google Maps API (or whatever cheaper option we go with) to get the things
async function getLocations(type, lat, lng) {
	await sleep(1); //simulate network lag from asking google to send us things
	return dummyApiCall(lat, lng);
}
const sleep = (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

//for now, just return this object, TODO: make it more like what the API will actually return
function dummyApiCall(lat, lng) {
	console.log("dummyCall");
	let ret = {
		candidates: [
			{
				name: "Marine Life Institute",
				address: "P Sherman 42 Wallaby Way, Sydney, Australia",
				location: {
					lat: -30,
					lng: 140
				},
				rating: 2,
				photos: [/*gotta pay up for these apparently*/]
			},
			{	//this one was actually on google maps by bikini atoll
				name: "Krusty Krab",
				address: "Bikini Atoll Marshall Under da sea, 96960, Marshall Islands",
				location: {
					lat: 11.6,
					lng: 165.4
				},
				rating: 4.6,
				photos: [/*gotta pay up for these apparently*/]
			},
			{
				name: "Bob's Burgers",
				address: "Somewhere Northeast, United States",
				location: {
					lat: 40,
					lng: -74
				},
				rating: 4,
				photos: [/*gotta pay up for these apparently*/]
			},
			{
				name: "your own house",
				address: "dont move",
				location: {
					lat: lat,
					lng: lng
				},
				rating: 3,
				photos: [/*gotta pay up for these apparently*/]
			}
		]
	};
	return ret;
}

/*what the client should listen for:
			connect / disconnect
			room created
			user join / leave
			api results
			final results
			error
		*/