require("dotenv").config();

const keys = require("./keys");
const fs = require("fs");
const request = require("request");
const inquirer = require("inquirer");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);


function liriPrompt(){
    inquirer.prompt([{
        type: "list",
        message: "What would you like LIRI to do?",
        name: "choice",
        choices: ["concert-this", "movie-this", "spotify-this-song", "do-what-it-says"]
    }]).then(response => {
        switch(response.choice) {
            case "concert-this":
                concertThis();
                break;
            case "movie-this":
                movieThis();
                break;
            case "spotify-this-song":
                spotifyThis();
            case "do-what-it-says":
                 doWhatItSays();
                 break;
        }
    })
};

function concertThis(){
    inquirer.prompt([{
        type: "input",
        message: "What artist or band would you like to see?",
        name: "bandName"
    }]).then(bandChoice => {
        request("https://rest.bandsintown.com/artists/" + bandChoice.bandName + "/events?app_id=codingbootcamp", function(error, response, body){
            let data = JSON.parse(body)

            let concertInfo = 
                 "\nVenue: " + data[0].venue.name +
                 "\nLocation: " + data[0].venue.city +
                 "\nDate: " + moment(data[0].datetime).format("MM/DD/YYYY") + "\n";

             if (!error && response.statusCode === 200){
                console.log(concertInfo);
                liriPrompt();
                
             }
        })
    })
};

function movieThis(){
    inquirer.prompt([{
        type: "input",
        message: "What movie would you like to know more about?",
        name: "movieName"
    }]).then(movieChoice => {
        if(!movieChoice.movieName){
            movieChoice.movieName = "Mr Nobody";
        }
        request("http://www.omdbapi.com/?y=&plot=short&apikey=trilogy&t=" + movieChoice.movieName, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body);

                let movieInfo =  
                    "\nTitle: " + data.Title +
                    "\nYear of Release: " + data.Year +
                    "\nIMDB Rating: " + data.imdbRating +
                    "\nRotten Tomatoes Rating: " + data.Ratings[1].Value +
                    "\nCountry: " + data.Country + 
                    "\nLanguage: " + data.Language +
                    "\nPlot: " + data.Plot +
                    "\nActors: " + data.Actors + "\n";
            
                console.log(movieInfo);
                liriPrompt();
            }
        });
    })
}


function spotifyThis(){
    inquirer.prompt([{
        type: "input",
        message: "What song would like to know more about?",
        name: "songName"
    }]).then(songChoice => {
        if(!songChoice.songName){
            songChoice.songName = "The Sign Ace of Base";
        };
        spotify.search({ type: 'track', query: songChoice.songName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            } 

            let song = data.tracks.items[0];

            let songInfo = 
                "\nArtist: " + JSON.stringify(song.album.artists[0].name) +
                "\nSong Title: " + JSON.stringify(song.name) + 
                "\nPreview Link: " + JSON.stringify(song.preview_url) +
                "\nAlbum: " + JSON.stringify(song.album.name) + "\n";
            
            console.log(songInfo);
            liriPrompt();


        });
    })
};

function doWhatItSays(){
    
}

liriPrompt();
