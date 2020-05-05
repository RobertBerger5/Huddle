//AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20

//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAGLxLbKVs8NxgJrPjt5j_p2cR2rlhy5l5mtEjWJdjP6-DaUQlFrsz-jYMqNlzQIlayW1M_2NirdDzo2xz5sat8BZxsANnSDtol5x5NmAAS_m0APBqvaA9pOx8m4FjjeAVEhB9Ia1pzGwhanAcYKjrew9WGhRZAfJ2ZmKEahawNKdFhmf_rAt3DQ&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20


/*https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=ChIJCa5i0E3V94cR9KFUEZUEsHg&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20
ChIJCa5i0E3V94cR9KFUEZUEsHg
*/

const fetch = require("node-fetch");

var apiKey = "AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20";
var lat = "44.4583";
var long = "-93.1616";
var radius = "5000";

var reqURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=" + radius + "&type=restaurant&key=" + apiKey;

/*const request = async () => {
  const response = await fetch(reqURL);
  const json = await response.json();
  return json;
}

console.log(request);*/

/*let url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=375&photoreference=CmRaAAAAJkCNcEmqvsx2_f_kEb1W27wXZO7bHWw4NAUeiiiuKaVcv-hd4kYe5RDHlNDvabAMZyhOkhOwF7ryk8PQhDjfGlaK4XxINeSsT4oHii-DGf-FMtPbevOOjYyI3nc6do0rEhCzCQ0VDhuufYEdtt0tUGbJGhQ0IrMIA2G5q7bCbUHbH8-SinZK1A&key=AIzaSyCM0VwSbkNqOW2rkIN7NLxUixhOfDQBP20";
fetch(url).then(res => {
  console.log(res.url);
});*/


fetch(reqURL)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      let i = 0;
      while(json.results[i]) {
        console.log(json.results[i].name);
        i++;
      }
    });
