(function ticTacToe(){


  const startScreen = () => {
    let player_1;
    let player_2;
    $('#start').show();
    $('#board').hide();
    $('#finish').hide();
    $('#startButton').on('click', function (){

      $('#startButton').after('<a href="#" class="button" id="start1">1-Player</a>');
      $('#start1').after('<a href="#" class="button" id="start2">2-Player</a>');
      $('#startButton').remove();

      $('#start2').on('click', function (){

        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        player_2 = prompt('Please enter a name for player 2', 'Player 2');
        $('#start').hide();
        $('#board').show();
        $('#player1').append('<h3 class=names>'+player_1+'</h2>');
        $('#player2').append('<h3 class=names>'+player_2+'</h2>');
        $('#player1').addClass('active');
      });
    });
  }
  startScreen();


  $('.box').on('click', function (event) {
    if ($(this).hasClass('box-filled-1')) {return}
    if ($(this).hasClass('box-filled-2')) {return}
    $('#player1').toggleClass('active');
    $('#player2').toggleClass('active');
    if ($('#player1').is('.active')) {
      $(this).toggleClass('box-filled box-filled-2');
      $(this).attr('disabled', true);
    } else if ($('#player2').is('.active')){
      $(this).toggleClass('box-filled box-filled-1');
      $(this).attr('disabled', true);
    }
  });


  const hoverCheck = () => {
    $('.box').hover(
      function (event) {
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {
        $(this).css("background-image", "url(img/o.svg)");
      } else if ($('#player2').is('.active')) {
        $(this).css("background-image", "url(img/x.svg)");
      }
    },
    function (event) {
      if ($('#player1').is('.active')) {
        $(this).css("background-image", '');
      } else if ($('#player2').is('.active')) {
        $(this).css("background-image", '');
      }
      });
    }
  hoverCheck();

  const winScreen = () => {
    $('.box').on('click', function (){
      if ($('.box-filled').length === 9) {
        $('#board').hide();
        $('#finish').show();
      }
    })
  }
winScreen();


}());
