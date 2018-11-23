require("dotenv").config();

let keys = require("./keys.js");
let fs = require("fs");
var request = require("request");
let moment = require('moment');
var Spotify = require("node-spotify-api");
let second = process.argv[2].toLowerCase();
let third = process.argv.slice(3);

function concertThis(artist) {
  let URL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  request(URL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      jsonData = JSON.parse(body)[0];
      let concertData = [
        "Venue Name: " + jsonData.venue.name,
        "Venue Location: " + jsonData.venue.city + jsonData.venue.region,
        "Date of Event " + moment(jsonData.datetime).format("MM/D/YYYY, h:mm:ss A")
      ].join("\n");
      console.log(concertData);
      fs.appendFile("log.txt", concertData, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

function spotifyThis(song) {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  spotify.search({ type: "track", query: song }, function(err, data) {
    let songData = [
      "Artist(s): " + data.tracks.items[0].album.artists[0].name,
      "Song Name: " + data.tracks.items[0].name,
      "Link to Song " + data.tracks.items[0].external_urls.spotify,
      "Album: " + data.tracks.items[0].album.name
    ].join("\n");
    console.log(songData);
    fs.appendFile("log.txt", songData, function(err) {
        if (err) {
          console.log(err);
        }
      });
    if (err) {
      return console.log("Error occurred: " + err);
    }
  });
}

function movieThis(movie) {
  let URL =
    "http://www.omdbapi.com/?t=" + movie + "/&y=&plot=short&apikey=trilogy";
  request(URL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      jsonData = JSON.parse(body);
      let movieData = [
        "Move Title: " + jsonData.Title,
        "Year Released: " + jsonData.Year,
        "IMBD Rating " + jsonData.Ratings[0].Value,
        "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors
      ].join("\n");
      console.log(movieData);
      fs.appendFile("log.txt", movieData, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

if (second === "concert-this") {
  concertThis(third.join("+"));
}

if (second === "spotify-this-song") {
  if (process.argv[3]) {
    spotifyThis(third.join(" "));
  } else {
    spotifyThis("Ace of Base");
  }
}

if (second === "movie-this") {
  if (process.argv[3]) {
    movieThis(third.join("+"));
  } else {
    movieThis("Mr+Nobody");
  }
}

if (second === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    let dataArr = data.toLowerCase().split(",");
    if (dataArr[0] === "spotify-this-song") {
      spotifyThis(dataArr[1]);
    } else if (dataArr[0] === "movie-this") {
      movieThis(dataArr[1]);
    } else if (dataArr[0] === "concert-this") {
      concertThis(dataArr[1]);
    }
  });
}
