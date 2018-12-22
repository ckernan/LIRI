# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.  When you run the application LIRI will begin with a prompt asking you what you would like to do.  It will display the following list for you to choose from:
<ul>
    <li>my tweets</li>
    <li>concert this</li>
    <li>movie this</li>
    <li>spotify this</li>
  <li>do what it says</li>
</ul>

Using the arrow keys you can select an option and then press the enter key to run it.  

Selecting the <b>my tweets</b> option will display the 10 most recent tweets from @nodejs and when they were created.

Selecting the <b>concert this</b> option will prompt you to enter a band or artist name and using the Bands in Town Artist Events API it will show you the venue name, location and date of that artist/band's next concert.

Selecting the <b>movie this</b> option will prompt you to enter a movie name and using the OMDB API it will display the following information for that film:
<ul>
  <li>Title of the movie</li>
  <li>Year the movie came out</li>
  <li>IMDB Rating of the movie</li>
  <li>Rotten Tomatoes Rating of the movie</li>
  <li>Country where the movie was produced</li>
  <li>Language of the movie</li>
  <li>Plot of the movie</li>
  <li>Actors in the movie</li>
</ul>

If you do not enter a movie name for this option, it will return the above information for the default movie, Mr. Nobody.

Selecting the <b>spotify this</b> option will prompt you to enter the name of a song and using the Spotify API it will display the following information for that song:
<ul>
  <li>Artist(s)</li>
  <li>The song's name</li>
  <li>A preview link of the song from Spotify</li>
  <li>The album that the song is from</li>
</ul>

If you do not enter a song name for this option, it will return the above information for the default song, "The Sign" by Ace of Base.

Selecting the <b>do what it says</b> option will result in LIRI reading the the text inside of the random.txt file which calls the <b>spotify this</b> command for the song "I Want it That Way".

Every time one of these options is run, LIRI will log the resulting data into a file called log.txt.

## Preview

![LIRI gif](/images/LIRI-demo.gif)
  
A video demo of the application can be found [here](https://drive.google.com/file/d/1I923bSeBAAb20YizCbl_nb4VnLEIIEVO/view?usp=sharing).

## Built With

* [Node.js](https://nodejs.org/en/)
* [Twitter API](https://developer.twitter.com/en/docs.html) 
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [OMDB API](http://www.omdbapi.com/)
* [Spotify API](https://developer.spotify.com/documentation/web-api/)
