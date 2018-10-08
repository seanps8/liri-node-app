require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var action = process.argv[2];
var value = process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function myTweets() {
    var params = {count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(i+1 + ". " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n");
        }
    } else {
        console.log(error);
    }
    });
};

function spotifyThisSong(value) {
    let song = "The Sign Ace of Base";
    if (value != undefined) {
        song = value;
    }
    
    spotify.search({ type: 'track', query: song, limit: 10 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
    
        var firstTrack = data.tracks.items[0];
        var trackInfo = "Artist: " + firstTrack.album.artists[0].name + "\nSong: " + firstTrack.name + "\nPreview: " + firstTrack.preview_url + "\nAlbum: " + firstTrack.album.name;
        console.log(trackInfo);
       
      });
};

function movieThis(value) {
    var movieName = "Mr. Nobody";
    if (value != undefined) {
        movieName = value;
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function(error, response, body) {

  
        if (!error && response.statusCode === 200) {

            var movieInfo = JSON.parse(body);
            // console.log(movieInfo);
            var movieData = "Title: " + movieInfo.Title + "\nYear Released: " + movieInfo.Year + 
                            "\nIMDB Rating: " + movieInfo.Ratings[0].Value + "\nRotten Tomatoes: " + movieInfo.Ratings[1].Value
                            + "\nCountry: " + movieInfo.Country + "\nLanguage: " + movieInfo.Language
                            + "\nPlot: " + movieInfo.Plot + "\nActors/Actresses: " + movieInfo.Actors;
            console.log(movieData);
        }
    });
};






switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    // case "do-what-it-says":
    //     doWhatItSays();
    //     break;
}