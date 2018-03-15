(function ticTacToe(){

  $('#start').show();
  $('#board').hide();
  $('#finish').hide();

  let player_1;
  let player_2;

  $('#startButton').on('click', function (){
    player_1 = prompt('Please enter a name for player 1', 'player_1');
    player_2 = prompt('Please enter a name for player 2', 'player_2');
    $('#start').hide();
    $('#board').show();
    $('#player1').addClass('active');
  });

  $('.box').on('click', function (event) {
    $('#player1').toggleClass('active');
    $('#player2').toggleClass('active');

    if ($('#player1').is('.active')) {
      $(this).toggleClass('box-filled-2');
    } else if ($('#player2').is('.active')){
      $(this).toggleClass('box-filled-1');
    }
  });

  $('.box').on('hover', function (event) {

  });


}());
