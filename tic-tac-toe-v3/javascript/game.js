$(() =>{

  //define player 1 and player 2 arrays that will hold selected moves, respectively
  let p1box = [];
  let p2box = [];

  //convert all li box elements into a single array
  let boxes = $('.box').toArray();

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

  //RNG
  let getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  //check if p1box or p2box contains a winning row/column/diagonal combination defined in winCombos.
  const winCheck = (winCombos, pArray) => {
     for (var i=0; i < winCombos.length; i++) {
      if(winCombos[i].every(value => pArray.indexOf(value) !== -1)) return true
     }
      return false
  };

  //game board mouse hover behavior
  const boxHoverBehavior = () => {
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

  const playerSetup = () => {
    //hide the start screen, add active class and 1st turn on player 1
    window.player_1 = player_1;
    window.player_2 = player_2;
    $('#start').hide();
    $('#board').show();
    //append names to board
    $('.names').remove();
    $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
    $('#player2').append('<h3 class=names>' + player_2 + '</h2>');
    $('#player2').removeClass('active');
    $('#player1').addClass('active');
  }

  //start screen and game start options
  const startScreen = () => {
    let player_1;
    let player_2;
    //show start screen and hide the board and win screens
    $('#start').show();
    $('#board').hide();
    $('#finish').hide();
  }

  //Player 1 win screen
  const winOneScreen = () => {
    $('#finish').addClass('screen-win-one').show();
    $('p.message').text(`WINNER ${player_1}!`);
  };

  //player 2 win screen
  const winTwoScreen = () => {
    $('#finish').addClass("screen-win-two").show();
    $('p.message').text(`WINNER ${player_2}!`);
  };

  //tie game win screen
  const tieScreen = () => {
    $('#finish').addClass('screen-win-tie').show();
    $('p.message').text(`IT'S A TIE!`);

  };

  //start game button handler
  $('#startButton').on('click', function () {
    //replace start game button with 1-player and 2-player button options
    $('#startButton').after('<a href="#" class="button" id="start1">1-Player</a>');
    $('#start1').after('<a href="#" class="button" id="start2">2-Player</a>');
    $('#startButton').hide();
  })

  //new game board wipe handler
  $('.newButton').on('click', function() {
    p1box = [];
    p2box = [];
    $('#board').hide();
    $('#finish').removeClass('screen-win-one screen-win-two screen-win-tie');
    $('li').removeClass(['box-filled', 'box-filled-1', 'box-filled-2']).css('background-image', 'none');
    startScreen();
  });

  //1 player button handler
  $("body").on('click', "#start1", function(){
    //enter player 1 name
    player_1 = prompt('Please enter a name for player 1', 'Player 1');
    player_2 = 'Computer';
    playerSetup();
    computerGame();
    boxHoverBehavior();
  });

  //2 player button handler
  $('body').on('click', '#start2', function (){
    //enter names for player 1 and player 2
    player_1 = prompt('Please enter a name for player 1', 'Player 1');
    player_2 = prompt('Please enter a name for player 2', 'Player 2');
    playerSetup();
    playerGame();
    boxHoverBehavior();
  });


  //solo game functionality
  const computerGame = () => {
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
        if (winCheck(winCombos, p1box)) {
          winOneScreen();
        //check if p2box array contains any of the winning combinations, if so:
        } else if (winCheck(winCombos, p2box)) {
            winTwoScreen();
        //check if all boxes have been played, if no winning combinations:
        } else if ($('.box-filled').length === 9) {
            //(note: p1 has the last move, so following conditional only checks if p1box is t/f)
            if (!winCheck(winCombos, p1box)){
              tieScreen();
            }
          }
      }
    });
  }

  //2-player game functionality
  const playerGame = () => {
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
        if (winCheck(winCombos, p1box)) {
          winOneScreen();
        //check if all boxes have been played, if no winning combinations:
        } else if ($('.box-filled').length === 9) {
            //(note: p1 has the last move, so following conditional only checks if p1box is t/f)
            if (!winCheck(winCombos, p1box)){
            tieScreen();
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
          if (winCheck(winCombos, p2box)) {
            winTwoScreen();
          }
        }
    });
  }


  startScreen();

});