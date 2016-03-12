"use strict";

var $ = require("jquery");


var MOVIE_CLASS_NAME = ".smallTitleCard";
var MOVIE_NAME_ATTR = "aria-label";


var renderingRating = function(prevNumMovies) {
  var movieList = $(MOVIE_CLASS_NAME);
 console.log(movieList.length);
  if (prevNumMovies >= movieList.length) {
    return prevNumMovies;
  }

  for (var i = prevNumMovies; i < movieList.length; i++) {

    var movie = $(movieList[i]);
    var movieName = movie.attr(MOVIE_NAME_ATTR);

    if (movieName !== null && movieName !== undefined && movieName !== 'null') {

      (function () {
        var movieElement = movie[0];
        var titleTagElement = addDescription(movieElement, "");
        // http://www.omdbapi.com/?t={title}&y=&plot=full&r=json
        $.get("https://www.omdbapi.com/?t=" + movieName  + "&y=&plot=full&r=json&tomatoes=true", function(data) {
          titleTagElement.innerHTML = "IMDB: " + data['imdbRating'];
        });

      })();
    }
  }

  return movieList.length;
};


var prevNumMovies = 0;
setInterval(function() {
  prevNumMovies = renderingRating(prevNumMovies);
}, 500);

function addDescription(movieElement, textDescription) {
  console.log(movieElement);
  var titleTagElement = document.createElement("div");

  var linkEleWidth = movieElement.offsetWidth.toString() + "px";
  var linkEleHeight = movieElement.offsetHeight.toString() + "px";

  var styles = {
    zIndex: 10,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'left',
    position: 'absolute',
    opacity: 0.5,
    display: 'block',
    width: linkEleWidth,
    height: 0,
    cursor: 'pointer'
  };
  $(titleTagElement).css(styles);
  $('body').after(titleTagElement);
  titleTagElement.innerHTML = textDescription;
  $(titleTagElement).offset($(movieElement).offset());

  return titleTagElement;
}
