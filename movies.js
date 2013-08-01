$(function(){

  // annotate each line about what it does


  //Have a test function that returns something on the console
  $('form').submit(function() {
    console.log('form button was clicked');
    return false;
  });

  //Regular results Multiple Movies
  $('#regular').click(function() {
    //create a div tag that the movie results can be appended to
    $('body').append('<div id="main"></div>');
    //set the users input to a variable so it can be stored and called
    var movie = $('input').val();
    //set the imdb search url and append var movie to this
    var url = "http://www.omdbapi.com/?s=";

    // use ajax to make a call to the imdb website and return a set of results
    $.ajax({
      //combine var url and var movie to have a complete search
      url: url + movie,
      type: 'get',
      dataType: 'json'
    }).done(function(data) {
      // the returned data is an array of movie objects
      //show the data in the console to show we returned something
      console.log(data);
      //iterate through our results
      for (var i = 0; i < data.Search.length; i++) {
        //return the movie title for each item in the array
        var movieTitle = data.Search[i].Title;
        //show the movie titles in the console
        console.log(movieTitle);
        //append the movie results within an element to #main and display it
        //onto the html
        $('#main').append('<p>' + movieTitle + '</p>');
        // New click event on the movie title

      }
    });
  });

  // New click event on the movie title
    // when i click on the movies search results
    // perform a new search based on the imdbId
    // display the individual movie's details.


  // I'm feeling Lucky = 1 result
  $('#lucky').click(function(){
    // #lucky should have a click event on it
    console.log('click');
    // when i click the button it should get the movie Title
    var movie = $('input').val();
    console.log(movie);
    // the base_url should be for a single search
    var baseUrl = "http://www.omdbapi.com/?s="
    console.log(baseUrl);
    // the url should be the baseUrl + movie
    var url = baseUrl + movie;
    console.log(url);
    // the ajax request should be a 'get', to the url, asking for json
    // it should return one movie object
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json'
    }).done(function(movie){
    // when the movie object is returned we should display it.
      console.log(movie.Search[0]);
      // get #results
      var results = $('#results');
      console.log(results);
      // display the movie as html
      var movieHtml = '<p>'+movie.Search[0].Title+ ', ' + movie.Search[0].Year + '</p>'
      console.log(movieHtml);
      // append the movie html to #results
      results.append(movieHtml);

    });
  });

});
