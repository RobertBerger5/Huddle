
const fetch = require("node-fetch");

var apiKey = "";
var lat = "44.953705";
var long = "-93.089958";
var radius = "1500";

var request = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&type=restaurant&key=" + apiKey;

fetch(request)
    .then(res => res.json())
    .then(json => console.log(json));
