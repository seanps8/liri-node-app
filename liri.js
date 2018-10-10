require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var value = process.argv.splice(3).join(" ");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function myTweets() {
    var params = {count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(i+1 + ". " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n");
            fs.appendFile("log.txt", i+1 + ". " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n----------", function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                
              
              });
        }
        console.log("Content Added to log.txt!");
        
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
        var trackInfo = "Artist: " + firstTrack.album.artists[0].name + "\nSong: " + firstTrack.name + "\nPreview: " + firstTrack.preview_url + "\nAlbum: " + firstTrack.album.name + "\n---------------";
        console.log(trackInfo);

        fs.appendFile("log.txt", trackInfo, function(err) {

            // If an error was experienced we will log it.
            if (err) {
              console.log(err);
            } else {
                console.log("Track info has been added to log.txt!")
            }
          });
       
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
                            + "\nPlot: " + movieInfo.Plot + "\nActors/Actresses: " + movieInfo.Actors + "\n-----------";
            console.log(movieData);

            fs.appendFile("log.txt", movieData, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                } else {
                    console.log("Movie info has been added to log.txt!")
                }
              });
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }else {      
            var dataArr = data.split(",");
            var randomAction = dataArr[0];
            var randomValue = dataArr[1];
            switch (randomAction) {
                case "my-tweets":
                    myTweets();
                    break;
                case "spotify-this-song":
                    spotifyThisSong(randomValue);
                    break;
                case "movie-this":
                    movieThis(randomValue);
                    break;
            }
        }
      
      });
}






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
    case "do-what-it-says":
        doWhatItSays();
        break;
    default: 
        console.log("You must type an action [my-tweets, spotify-this-song, movie-this, do-what-it-says] and a value")
        console.log("Example --> node liri.js spotify-this-song three-little-birds");
        break;
};