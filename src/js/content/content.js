"use strict";

var $ = require("jquery");

var MOVIE_CLASS_NAME = ".smallTitleCard";
var MOVIE_NAME_ATTR = "aria-label";
var TITLE_TAG = "movie-netflix-imdb-title";

var renderingRating = function(prevNumMovies, prevUrl) {
  if (window.location.href !== prevUrl) {
    $(TITLE_TAG).remove();
    return {url: window.location.href, movieCount: 0};
  }

  var movieList = $(MOVIE_CLASS_NAME);
  if (prevNumMovies == movieList.length) {
    return {url: prevUrl, movieCount: prevNumMovies};
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
          $(titleTagElement).attr("movie-name", movieName)
        });

      })();
    }
  }

  return {url: window.location.href , movieCount: movieList.length};
};


var prevNumMovies = 0;
var prevUrl = "";

setInterval(function() {
  var obj = renderingRating(prevNumMovies, prevUrl);
  prevNumMovies = obj.movieCount;
  prevUrl = obj.url;
}, 500);

function addDescription(movieElement, textDescription) {
  // console.log(movieElement);
  var titleTagElement = document.createElement(TITLE_TAG);

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
  console.log(movieElement.getElementsByClassName('video-artwork'));
  $(movieElement.getElementsByClassName('video-artwork')[0]).after(titleTagElement);
  titleTagElement.innerHTML = textDescription;
  $(titleTagElement).offset($(movieElement).offset());

  return titleTagElement;
}
