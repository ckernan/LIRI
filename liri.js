require("dotenv").config();

const keys = require("./keys");
const fs = require("fs");
const request = require("request");
const inquirer = require("inquirer");
const moment = require("moment");
const chalk = require("chalk")
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const Twitter = require('twitter');
const twitter = new Twitter(keys.twitter);


function liriPrompt(){
    inquirer.prompt([{
        type: "list",
        message: "What would you like LIRI to do?",
        name: "choice",
        choices: ["my tweets", "concert this", "movie this", "spotify this", "do what it says"]
    }]).then(response => {
        switch(response.choice) {
            case "my tweets":
                myTweets();
                break;
            case "concert this":
                concertThis();
                break;
            case "movie this":
                movieThis();
                break;
            case "spotify this":
                spotifyThis();
                break;
            case "do what it says":
                 doWhatItSays();
                 break;
        }
    })
};

function myTweets(){
    twitter.get('statuses/user_timeline', { screen_name: "nodejs", count: 10 }, function(error, tweets, response) {
        if (error) throw error;

        for (let i = 0; i < tweets.length; i++) {
            let getTweets = ((i + 1) + ". " + tweets[i].created_at + " @nodejs: " + tweets[i].text + "\n");
            console.log(chalk.hex('#6936b5')(getTweets));
            appendLog(getTweets);
        }

        liriPrompt();
    });
}

function concertThis(){
    inquirer.prompt([{
        type: "input",
        message: "What artist or band would you like to see?",
        name: "bandName"
    }]).then(bandChoice => {
        request("https://rest.bandsintown.com/artists/" + bandChoice.bandName + "/events?app_id=codingbootcamp", function(error, response, body){
            if (!error && response.statusCode === 200){
                let data = JSON.parse(body)

                let concertInfo = 
                     "\nVenue: " + data[0].venue.name +
                     "\nLocation: " + data[0].venue.city +
                     "\nDate: " + moment(data[0].datetime).format("MM/DD/YYYY") + "\n";

                console.log(chalk.hex('#e56510')(concertInfo));
                appendLog(concertInfo);
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
            
                console.log(chalk.hex("#0e9e25")(movieInfo));
                appendLog(movieInfo);
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
            
            console.log(chalk.hex('#c607b0')(songInfo));
            appendLog(songInfo);
            liriPrompt();


        });
    })
};

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err) {
            return console.log(err)
        }

        let txtArr = data.split(",");

        switch(txtArr[0]) {
            case "spotify-this-song":
            spotify.search({ type: 'track', query: txtArr[1] }, function(err, data) {
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
                
                console.log(chalk.hex('#0919b5')(songInfo));
                appendLog(songInfo);
                liriPrompt();
            });
                break;
        }
    })
}

function appendLog(data){
    fs.appendFile("log.txt", data + "\n", function(err) {
        if(err) {
            return console.log(err)
        }
    })

}
liriPrompt();
