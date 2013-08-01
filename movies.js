//variable for results in array for search
var results;
//variable for first result of results array for i'm feeling lucky
var result;

var numberOfClicks = 0;

$(function() {
  var mainDiv = $("<div>");
  mainDiv.attr("id", "main");
  $("body").append(mainDiv);

  $("form").submit(function(event) {
    console.log(event);
    console.log("form button was clicked");
    return false;
  });

  $("#search").click(function() {
    getSearchResults();
    movieClick();
  });

  $("#lucky").click(function(event) {
    getLuckyResult();
  });

});

var searchKeywords;
var searchUrl;

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
  }).done(function(data){
    results = data;
    for (var i = 0; i < results.Search.length; i++) {
      var result = $("<div>");
      result.attr("class", "movie");
      result.attr("id", i);
      result.text(results.Search[i].Title);
      $("#main").append(result);
    }
    console.log(data);
  });
}

function getLuckyResult() {
  getInput();

  $.ajax({
    type: "get",
    url: searchUrl,
    dataType: "json"
  }).done(function(data){
    results = data;
    result = $("<div>");
    result.attr("class", "movie");
    result.attr("id", 0);
    result.text(results.Search[0].Title);
    $("#main").append(result);
    console.log(data);
  });
}

function movieClick() {
  $(".movie").click(function() {
    numberOfClicks++;
    console.log("index: " + $(this));
  });
}