//AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20

//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAGLxLbKVs8NxgJrPjt5j_p2cR2rlhy5l5mtEjWJdjP6-DaUQlFrsz-jYMqNlzQIlayW1M_2NirdDzo2xz5sat8BZxsANnSDtol5x5NmAAS_m0APBqvaA9pOx8m4FjjeAVEhB9Ia1pzGwhanAcYKjrew9WGhRZAfJ2ZmKEahawNKdFhmf_rAt3DQ&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20

const fetch = require("node-fetch");

var apiKey = "AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20";
var lat = "44.953705";
var long = "-93.089958";
var radius = "1500";

var request = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&type=restaurant&key=" + apiKey;

fetch(request)
    .then(res => res.json())
    .then(json => console.log(json));
