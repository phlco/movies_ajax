//global variables set at first load




// code executed once the page is fully loaded.
$(function(){

  $('form').submit(function(event){
    return false;
  });

  $('#lucky').click(function(event){
    $('#display').empty()
    var input = $('input').val();
    $.ajax({type: 'get', url: 'http://www.omdbapi.com/?i=&t='+input, dataType: 'json'}).done(function(data){
      console.log(data);
      $('#display').append('<div class="'+input+'"></p>')
      var result = data
      $('div').last().text("Title: " + result.Title)
      $('div').last().append('<div id="' + input + '"></div>')
      $('div').last().text("Year: " + result.Year)
      $('div').last().append('<div></div>')
      $('div').last().text("Director: " + result.Director);
      $('div').last().append('<div><img src="' + result.Poster + '"></div>')
    })
  })

  $('#search').click(function(event){
    $('#display').empty()
    var input = $('input').val();
    var searchString = 'http://www.omdbapi.com/?s='
    $.ajax({type: 'get', url: searchString + input, dataType: 'json'}).done(function(data){
      $(data.Search).each(function(index, value){
        var result = value
        $('#display').append('<p></p>')
        $('#display').append('<div class="search-results" id="'+ result.imdbID+'"></div>')
        $('div').last().text("Title: " + result.Title)
        $('div').last().append('<div id="' + input+ '"></div>')
        $('div').last().text(" Year: " + result.Year);
        $('div').last().append('<p></p>')
      })
    })
  })

  $('#display').on('click', '.search-results', movieClick)

});

function movieClick() {
  $('#display').empty()
  var searchString = 'http://www.omdbapi.com/?i='
  $.ajax({type: 'get', url: searchString + this.id, dataType: 'json'}).done(function(data){
    var result = data
    $('#display').append('<div class="' + data.Title + '"></p>')
    $('div').last().text("Title: " + result.Title)
    $('div').last().append('<div></div>')
    $('div').last().text("Year: " + result.Year)
    $('div').last().append('<div></div>')
    $('div').last().text("Director: " + result.Director);
    $('div').last().append('<div><img src="' + result.Poster + '"></div>')
  })
}



