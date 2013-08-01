var results;

$(function() {
  var mainDiv = $("<div>");
  mainDiv.attr("id", "main");
  $("body").append(mainDiv);

  $('form').submit(function(event) {
    console.log(event);
    console.log('form button was clicked');
    return false;
  });

  $('#search').click(function(event) {
    $("div").empty();
    var searchKeywords = $('input').val();
    var searchUrl = 'http://www.omdbapi.com/?s=' + searchKeywords;

    $.ajax({
      type: 'get',
      url: searchUrl,
      dataType: 'json'
    }).done(function(data){
      results = data;
      for (var i = 0; i < results.Search.length; i++) {
        var result = $("<div>");
        result.attr("class", "movie");
        result.attr("id", i);
        result.text(results.Search[i].Title);
        $('#main').append(result);
      }
      console.log(data);
    });
    movieClick();
  });

  $('#lucky').click(function(event) {
    $("div").empty();
    var luckyKeywords = $('input').val();
    var luckyUrl = 'http://www.omdbapi.com/?t=' + luckyKeywords;
    var result;

    $.ajax({
      type: 'get',
      url: luckyUrl,
      dataType: 'json'
    }).done(function(data){
      results = $('<div>');
      results.attr("class", "movie");
      results.attr("id", 0);
      results.text(data.Title);
      $("#main").append(results);
      console.log(data);
    });
  });

});
var test;
function movieClick() {
  $(".movie").click(function() {
    test = $(this);
    console.log(test);
  });
}