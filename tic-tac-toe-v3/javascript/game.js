(function ticTacToe(){

  const winCombos = [
    ['box_1', 'box_2', 'box_3'],
    ['box_4', 'box_5', 'box_6'],
    ['box_7', 'box_8', 'box_9'],
    ['box_1', 'box_4', 'box_7'],
    ['box_2', 'box_5', 'box_8'],
    ['box_3', 'box_6', 'box_9'],
    ['box_1', 'box_5', 'box_9'],
    ['box_3', 'box_5', 'box_7']];

  let p1box = [];
  let p2box = [];
  let boxes = $('.box').toArray();


  const containsAll = (winCombos, pArray) => {
     for (var i=0; i < winCombos.length; i++) {
      if(winCombos[i].every(value => pArray.indexOf(value) != -1)) return true;
     }
      return false;
  };

  const startScreen = () => {
    let player_1;
    let player_2;
    $('#start').show();
    $('#board').hide();
    $('#finish').hide();
    $('#startButton').on('click', function (){

      $('#startButton').after('<a href="#" class="button" id="start1">1-Player</a>');
      $('#start1').after('<a href="#" class="button" id="start2">2-Player</a>');
      $('#startButton').hide();

      $("#start1").on('click', function(){
        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        window.player_1 = player_1;
        $('#start').hide();
        $('#board').show();
        $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
        $('#player2').append('<h3 class=names>Computer</h2>');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');

        computerMoves();
        hoverCheck();
        newGame();
      });


      $('#start2').on('click', function (){
        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        player_2 = prompt('Please enter a name for player 2', 'Player 2');
        window.player_1 = player_1;
        window.player_2 = player_2;
        $('#start').hide();
        $('#board').show();
        $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
        $('#player2').append('<h3 class=names>' + player_2 + '</h2>');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
        playerMoves();
        hoverCheck();
        newGame();
      });
    });
  }
  startScreen();

  const computerMoves = () => {
    function getRandomNumber(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    function randomBox(array) {
      let index = getRandomNumber(boxes.length);
      p2box.push($(boxes[index]).attr('class').split(' ')[1]);
      $(boxes[index]).addClass('box-filled box-filled-2');
      $(boxes[index]).attr('disabled', true);
      boxes.splice(index, 1);
    };

    $('.box').on('click', function (event) {
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {

        let thisToBoxesIndex = boxes.indexOf(this);
        p1box.push($(this).attr('class').split(' ')[1]);
        $(this).toggleClass('box-filled box-filled-1');
        $(this).attr('disabled', true);
        boxes.splice(thisToBoxesIndex, 1);

        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        if (boxes.length !== 0) {
          randomBox(boxes);
          $('#player2').toggleClass('active');
          $('#player1').toggleClass('active');
        }
        if (containsAll(winCombos, p1box)) {
          $('#board').hide();
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass('screen-win-one').show();
          $('p.message').text(`WINNER ${player_1}!`);
        } else if (containsAll(winCombos, p2box)) {
          $('#board').hide();
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass("screen-win-two").show();
          $('p.message').text(`WINNER Computer!`);;
        } else if ($('.box-filled').length === 9) {
            if (!containsAll(winCombos, p1box)){
            tieScreen();
            }
          }
      }
    });
  }

  const playerMoves = () => {
    $('.box').on('click', function (event) {
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {
        p1box.push($(this).attr('class').split(' ')[1]);
        $(this).toggleClass('box-filled box-filled-1');
        $(this).attr('disabled', true);
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        if (containsAll(winCombos, p1box)) {
          $('#board').hide();
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass('screen-win-one').show();
          $('p.message').text(`WINNER ${player_1}!`);
        } else if ($('.box-filled').length === 9) {
            if (!containsAll(winCombos, p1box)){
            tieScreen();
            }
          }
      } else if ($('#player2').is('.active')){
        p2box.push($(this).attr('class').split(' ')[1]);
        $(this).toggleClass('box-filled box-filled-2');
        $(this).attr('disabled', true);
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        if (containsAll(winCombos, p2box)) {
          $('#board').hide();
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass("screen-win-two").show();
          $('p.message').text(`WINNER ${player_2}!`);
        }
      }
    });
  }

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
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {
        $(this).css("background-image", '');
      } else if ($('#player2').is('.active')) {
        $(this).css("background-image", '');
      }
      });
    }

  const winOneScreen = () => {

  };

  const tieScreen = () => {

          $('#board').hide();
          $('#finish').show();
          $('p.message').text(`IT'S A TIE!`);
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass('screen-win-tie');

  };

  const newGame = () => {
    $('.newButton').on('click', function() {
      player_1 = '';
      player_2 = '';
      p1box = [];
      p2box = [];
      boxes = $('.box').toArray();
      $('.names').remove();
      $('.box')
        .removeClass('box-filled box-filled-1 box-filled-2')
        .attr('disabled', false)
        .css('background-image', '');
      startScreen();
    });
  }
}());
