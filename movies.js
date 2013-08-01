$(function() {

  $('form').submit(function(event) {
    return false;
  });

  // event handler for Search button
  $('#search').click(function(event){
    var url = "http://www.omdbapi.com/?s=" + $('#movie').val();
    var response = $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
    }).done(function(data){
      $('body').append('<p>Search for '+$('#movie').val()+':</p><ul></ul>');
      for (var i = 0; i < data.Search.length; i += 1) {
        var title = data.Search[i].Title;
        var year = data.Search[i].Year;
        var id = data.Search[i].imdbID;

        // XXX where will append go?
        var oneMovie = $('<div id=' + id + '></div>');
        oneMovie.append('<p><strong>' + title + '</strong></p>');
        oneMovie.append('<p>' + year + '</p>');

        var that = this;
        // When a search result is clicked, further information about
        // the result is dynamically added
        oneMovie.click(function(event) {
          console.log($(event.target).attr('id'));
          $.ajax({
            type: 'get',
            url: "http://www.omdbapi.com/?i=" + $(event.target).attr('id'),
            dataType: 'json'
          }).done(function(data) {
            console.log(data);
            var poster = data.Poster;
            console.log("poster:"+poster);
            $(event.target).append('<br><img src="' + poster + '" />');
          }); // end done() for second request
          $(event.target).off('click');
        }); // end event listener

        $('ul').append(oneMovie);
      } // end for loop
    })
  });

  // event handler for 'I'm feeling lucky' button
  $('#lucky').click(function(event) {
    console.log('lucky');
    var url = "http://www.omdbapi.com/?s=" + $('#movie').val();
    console.log('url:'+url);
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json'
    }).done(function(data) {
      $('body').append("<ul id='luckyMovie'></ul>");
      var movieId = data.Search[0].imdbID;
      var idUrl = "http://www.omdbapi.com/?i=" + movieId;
      $.ajax({
        type: 'get',
        url: idUrl,
        dataType: 'json'
      }).done(function(data) {
        var title = data.Title;
        var year = data.Year;
        var poster = data.Poster;
        console.log("poster:"+poster);
        $('#luckyMovie').append('<li>'+ title + '</li>');
        $('#luckyMovie').append('<li>'+ year + '</li><br>');
        $('#luckyMovie').append('<div><img src="' + poster + '"></div></br>');
      });
    });
  }); // end event handler

});