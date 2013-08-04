//variable for results in array for search
var results;
//variable for first result of results array for i'm feeling lucky
var result;

var searchKeywords;
var searchUrl;

var movieTitle;
var movieID;
var movieUrl;

function getInput() {
  $("div").empty();
  searchKeywords = $("input").val();
  searchUrl = "http://www.omdbapi.com/?s=" + searchKeywords;
}

function getSearchResults() {
  getInput();

  $.ajax({
    type: "get",
    url: searchUrl,
    dataType: "json"
  }).done(function (data) {
    results = data;
    for (var i = 0; i < results.Search.length; i++) {
      var result = $("<div>");
      result.attr("class", "movie");
      result.attr("id", results.Search[i].imdbID);
      result.text(results.Search[i].Title);
      $("#main").append(result);
    }
    addMovieClickEventListeners();
    console.log(data);
  });
}

function getLuckyResult() {
  getInput();

  $.ajax({
    type: "get",
    url: searchUrl,
    dataType: "json"
  }).done(function (data){
    results = data;
    result = $("<div>");
    result.attr("class", "movie");
    result.attr("id", results.Search[0].imdbID);
    result.text(results.Search[0].Title);
    $("#main").append(result);
    addMovieClickEventListeners();
    console.log(data);
  });
}

function addMovieClickEventListeners() {
  $(".movie").click(function () {
    movieTitle = $(this);
    movieID = $(this).attr("id");
    movieUrl = "http://www.omdbapi.com/?i=" + movieID;

    $.ajax({
      type: "get",
      url: movieUrl,
      dataType: "json"
    }).done(function (data){
      movie = data;
      console.log(data);
      movieDetails = $("<div>");
      movieDetails.attr("class", "details");
      movieDetails.text(movie.Director + " | " + movie.Year + " | " + movie.Rated);
      movieTitle.append(movieDetails);
    });
  });
}

$(function () {
  var mainDiv = $("<div>");
  mainDiv.attr("id", "main");
  $("body").append(mainDiv);

  $("form").submit(function (event) {
    console.log(event);
    console.log("form button was clicked");
    return false;
  });

  $("#search").click(function () {
    getSearchResults();
  });

  $("#lucky").click(function (event) {
    getLuckyResult();
  });

});

