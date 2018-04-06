(function ticTacToe(){

  //2D array of possible winning combinations
  const winCombos = [
    ['box_1', 'box_2', 'box_3'],
    ['box_4', 'box_5', 'box_6'],
    ['box_7', 'box_8', 'box_9'],
    ['box_1', 'box_4', 'box_7'],
    ['box_2', 'box_5', 'box_8'],
    ['box_3', 'box_6', 'box_9'],
    ['box_1', 'box_5', 'box_9'],
    ['box_3', 'box_5', 'box_7']];
  //define player 1 and player 2 arrays that will hold selected moves, respectively
  let p1box = [];
  let p2box = [];
  //convert all li box elements into a single array
  let boxes = $('.box').toArray();

  //check if p1box or p2box contains a winning row/column/diagonal combination defined in winCombos.
  const containsAll = (winCombos, pArray) => {
     for (var i=0; i < winCombos.length; i++) {
      if(winCombos[i].every(value => pArray.indexOf(value) != -1)) return true;
     }
      return false;
  };

  //start screen and game start options
  const startScreen = () => {

    let player_1;
    let player_2;
    //show start screen and hide the board and win screens
    $('#start').show();
    $('#board').hide();
    $('#finish').hide();
    //when start button is clicked:
    $('#startButton').on('click', function (){
      //replace start game button with 1-player and 2-player button options
      $('#startButton').after('<a href="#" class="button" id="start1">1-Player</a>');
      $('#start1').after('<a href="#" class="button" id="start2">2-Player</a>');
      $('#startButton').hide();

      //if 1-player button is clicked:
      $("#start1").on('click', function(){
        //enter player 1 name
        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        player_2 = 'Computer';
        window.player_1 = player_1;
        window.player_2 = player_2;
        //hide the start screen, add active class and 1st turn on player 1
        $('#start').hide();
        $('#board').show();
        //append names to board
        $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
        $('#player2').append('<h3 class=names>' + player_2 + '</h2>');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
        //begin computerMoves() game functionality
        computerMoves();
        hoverCheck();
      });

      //if 2-player button is clicked:
      $('#start2').on('click', function (){
        //enter names for player 1 and player 2
        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        player_2 = prompt('Please enter a name for player 2', 'Player 2');
        window.player_1 = player_1;
        window.player_2 = player_2;
        //hide the start screen, add active class and 1st turn on player 1
        $('#start').hide();
        $('#board').show();
        //append names to board
        $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
        $('#player2').append('<h3 class=names>' + player_2 + '</h2>');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
        //begin playerMoves() game functionality
        playerMoves();
        hoverCheck();
      });
    });
  }
  startScreen();

  //player vs. computer game functionality
  const computerMoves = () => {

    //RNG from 0 to max value
    let getRandomNumber = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    //computer will select an unused box from available moves in boxes array
    let randomBox = (array) => {
      //store random number within index
      let index = getRandomNumber(boxes.length);
      //add box's 2nd class name to p2box array
      p2box.push($(boxes[index]).attr('class').split(' ')[1]);
      //visually change box for computer chosen move and disable
      $(boxes[index]).addClass('box-filled box-filled-2');
      $(boxes[index]).attr('disabled', true);
      //once move is used, remove from boxes array
      boxes.splice(index, 1);
    };

    //when a box is clicked:
    $('.box').on('click', function (event) {
      //do nothing if box is already in play
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {
        //find 'this' index within boxes array
        let thisToBoxesIndex = boxes.indexOf(this);
        //add box's 2nd class name to p1box array
        p1box.push($(this).attr('class').split(' ')[1]);
        //visually change box for player 1 chosen move and disable
        $(this).toggleClass('box-filled box-filled-1');
        $(this).attr('disabled', true);
        //once move is used, remove from boxes array
        boxes.splice(thisToBoxesIndex, 1);
        //player 1 turn ends, computer turn begins
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        //if empty boxes are currently in play:
        if (boxes.length !== 0) {
          //run computer's move
          randomBox(boxes);
          //computer turn ends, player 1 turn begins
          $('#player2').toggleClass('active');
          $('#player1').toggleClass('active');
        }
        //check if p1box array contains any of the winning combinations, if so:
        if (containsAll(winCombos, p1box)) {
          winOneScreen();
          newGame();
        //check if p2box array contains any of the winning combinations, if so:
        } else if (containsAll(winCombos, p2box)) {
            winTwoScreen();
            newGame();
        //check if all boxes have been played, if no winning combinations:
        } else if ($('.box-filled').length === 9) {
            //(note: p1 has the last move, so following conditional only checks if p1box is t/f)
            if (!containsAll(winCombos, p1box)){
              tieScreen();
              newGame();
            }
          }
      }
    });
  }

  //2-player game functionality
  const playerMoves = () => {
    //when a box is clicked:
    $('.box').on('click', function (event) {
      //do nothing if box is already in play
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      //if it's currently player 1's turn:
      if ($('#player1').is('.active')) {
        //add box's 2nd class name to p1box array
        p1box.push($(this).attr('class').split(' ')[1]);
        //visually change box for player 1 chosen move and disable
        $(this).toggleClass('box-filled box-filled-1');
        $(this).attr('disabled', true);
        //player 1 turn ends, player 2 begins
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        //check if p1box array contains any of the winning combinations, if so:
        if (containsAll(winCombos, p1box)) {
          winOneScreen();
          newGame();
        //check if all boxes have been played, if no winning combinations:
        } else if ($('.box-filled').length === 9) {
            //(note: p1 has the last move, so following conditional only checks if p1box is t/f)
            if (!containsAll(winCombos, p1box)){
            tieScreen();
            newGame();
            }
          }
      //if it's currently player 2's turn:
      } else if ($('#player2').is('.active')){
          //add box's 2nd class name to p2box array
          p2box.push($(this).attr('class').split(' ')[1]);
          //visually change box for player 2 chosen move and disable
          $(this).toggleClass('box-filled box-filled-2');
          $(this).attr('disabled', true);
          //player 2 turn ends, player 1 begins
          $('#player1').toggleClass('active');
          $('#player2').toggleClass('active');
          //check if p2box array contains any of the winning combinations, if so:
          if (containsAll(winCombos, p2box)) {
            winTwoScreen();
            newGame();
          }
        }
    });
  }



  //box mouse hover behavior
  const hoverCheck = () => {
    //on mouse-in on box element:
    $('.box').hover(
      function (event) {
      //do nothing if the current box has already been filled
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      //if player1 is active show O symbol
      if ($('#player1').is('.active')) {
        $(this).css("background-image", "url(img/o.svg)");
      //if player2 is active show X symbol
      } else if ($('#player2').is('.active')) {
        $(this).css("background-image", "url(img/x.svg)");
      }
    },
    //on mouse-out on box element:
    function (event) {
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      if ($('#player1').is('.active')) {
        $(this).css("background-image", '');
      } else if ($('#player2').is('.active')) {
        $(this).css("background-image", '');
      }
      });
  };

  //Player 1 win screen
  const winOneScreen = () => {
    //hide board and display 1st player win screen elements on finish screen
    $('#board').hide();
    $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
    $('#finish').addClass('screen-win-one').show();
    $('p.message').text(`WINNER ${player_1}!`);
  };

  //player 2 win screen
  const winTwoScreen = () => {
    //hide board and display 2nd player win screen elements on finish screen
    $('#board').hide();
    $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
    $('#finish').addClass("screen-win-two").show();
    $('p.message').text(`WINNER ${player_2}!`);
  };

  //tie game win screen
  const tieScreen = () => {
          //hide board and display tie screen elements on finish screen
          $('#board').hide();
          $('#finish').show();
          $('p.message').text(`IT'S A TIE!`);
          $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
          $('#finish').addClass('screen-win-tie');

  };

  //new game board wipe
  const newGame = () => {
    //when New game button is clicked, reload the game
    $('.newButton').on('click', function() {
      location.reload(true);
    });
  }
}());
