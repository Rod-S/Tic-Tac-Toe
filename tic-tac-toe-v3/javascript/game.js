(function (){

  $('#board').hide();

  let user1;
  let user2;

  $('#startButton').on('click', function (){
    user1 = prompt('Please enter a name', 'Player 1');
    $('#start').hide();
    $('#board').show();
    $('#player1').addClass('active');
  });



}());
