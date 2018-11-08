require("dotenv").config();

let keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');


if (process.argv[2] === "concert-this") {
    let artist = process.argv.slice(3).join("+");
    let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            jsonData = JSON.parse(body)[0]
            let concertData = [
                "Venue Name: " + jsonData.venue.name, "Venue Location: " + jsonData.venue.city + jsonData.venue.region,
                "Date of Event " + jsonData.datetime].join("\n")
            console.log(concertData);
        }
    })

} else if (process.argv[2] === "spotify-this-song") {

 
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

spotify.search({ type: 'track', query: 'Intergalactic' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   reduceData = data.tracks.items[0].album.artists
  console.log(reduceData); 
  });

} else if (process.argv[2] === "movie-this") {
    if (process.argv[3]) {
    let movie = process.argv.slice(3).join("+");
    let URL = "http://www.omdbapi.com/?t=" + movie + "/&y=&plot=short&apikey=trilogy";
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            jsonData = JSON.parse(body)
            let movieData = [
               "Move Title: " + jsonData.Title, "Year Released: " + jsonData.Year,"IMBD Rating " + jsonData.Ratings[0].Value, "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value, "Country: " + jsonData.Country, "Language: " + jsonData.Language, "Plot: " + jsonData.Plot, "Actors: " + jsonData.Actors].join("\n")
            console.log(movieData);
        } 
    })
} else {
    let URL = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            jsonData = JSON.parse(body)
            let movieData = [
               "Move Title: " + jsonData.Title, "Year Released: " + jsonData.Year,"IMBD Rating " + jsonData.Ratings[0].Value, "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value, "Country: " + jsonData.Country, "Language: " + jsonData.Language, "Plot: " + jsonData.Plot, "Actors: " + jsonData.Actors].join("\n")
            console.log(movieData);
        } 
    })
}
} else if (process.argv[2] === "do-what-it-says") {

};