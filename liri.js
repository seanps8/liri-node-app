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






switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong(value);
        break;
    // case "movie-this":
    //     movieThis();
    //     break;
    // case "do-what-it-says":
    //     doWhatItSays();
    //     break;
}