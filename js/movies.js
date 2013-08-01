
$(function(){
  $('form').submit(function(){
    // all the code in here will run
      // console.log('form button was clicked');
      // console.log(event);
    // this stops the form from being submitted
      return false;
  });

  $('#search').click(function(event) {
    var input = $('#input').val();
    var url = 'http://www.omdbapi.com/?s=' + input;
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json'
    }).done(function(data){
      console.log(data.Search);
     //  console.log('All good', response);
     for (var i = 0; i < data.Search.length; i++) {
        $('ul').append('<li>' + data.Search[i].Title + ", " + data.Search[i].Year + '</li>');
      }
    });
  });
  $('#lucky').click(function(event){
    var input = $('input').val();
    var url = 'http://www.omdbapi.com/?s=' + input;
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json'
    }).done(function(data) {
      $('ul').append('<li>' + data.Search[0].Title + ", " + data.Search[0].Year + '</li>');
    })
  })
});
