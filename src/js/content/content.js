"use strict";

var $ = require("jquery");

var MOVIE_CLASS_NAME = ".smallTitleCard";
var MOVIE_NAME_ATTR = "aria-label";
var TITLE_TAG = "movie-netflix-imdb-title";
var cache = {};

var renderingRating = function() {
  if (window.location.href !== prevUrl) {
    $(TITLE_TAG).remove();
    prevUrl = window.location.href;
    return;
  }

  var movieList = $(MOVIE_CLASS_NAME);

  for (var i = 0; i < movieList.length; i++) {

    var movie = $(movieList[i]);
    var movieName = movie.attr(MOVIE_NAME_ATTR);


    if (movieName !== null && movieName !== undefined && movieName !== 'null' && movieList[i].getElementsByTagName(TITLE_TAG).length == 0) {
      console.log(movieName);

      (function () {
        var movieElement = movie[0];
        var titleTagElement = addDescription(movieElement, "");
        var name = movieName;

        function updateTitle(element, name, data) {
          element.innerHTML = "IMDB: " + data['imdbRating'];
          element.setAttribute("movie-name", name);
        }

        if (cache[name]) {
          var data = cache[name];
          updateTitle(titleTagElement, name, data);
        } else {
          // http://www.omdbapi.com/?t={title}&y=&plot=full&r=json
          $.get("https://www.omdbapi.com/?t=" + movieName  + "&y=&plot=full&r=json&tomatoes=true", function(data) {
            cache[name] = data;
            updateTitle(titleTagElement, name, data);
          });
        }

      })();
    }
  }
};

var prevUrl = "";
setInterval(function() {
  renderingRating();
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
  $(movieElement.getElementsByClassName('video-artwork')[0]).after(titleTagElement);
  titleTagElement.innerHTML = textDescription;
  $(titleTagElement).offset($(movieElement).offset());

  return titleTagElement;
}
