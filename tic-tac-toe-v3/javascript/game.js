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

      $('#start2').on('click', function (){

        player_1 = prompt('Please enter a name for player 1', 'Player 1');
        player_2 = prompt('Please enter a name for player 2', 'Player 2');
        $('#start').hide();
        $('#board').show();
        $('#player1').append('<h3 class=names>' + player_1 + '</h2>');
        $('#player2').append('<h3 class=names>' + player_2 + '</h2>');
        $('#player1').addClass('active');
      });
    });
  }
  startScreen();


/*
  function containsAll(winArray,pArray) {
     for (var i=0; i < winArray[i].length; i++) {
      for (var j=0; j < winArray[j].length; j++) {
         if($.inArray(winArray[i][j] , pArray) == -1) return false;
       }
       return true;
     }
  }
*/

/*
function containsAll(winArray,pArray) {
   for (var i=0; i < winArray.length; i++) {
    for (var j=0; j < winArray[i].length; j++) {
       if($.inArray(winArray[i][j] , pArray) > -1) return true;
     }
   }
return false;
}
*/

function containsAll(winCombos, pArray) {
   for (var i=0; i < winCombos.length; i++) {
    if(winCombos[i].every(value => pArray.indexOf(value) != -1)) return true;
   }
return false;
}



  $('.box').on('click', function (event) {
    if ($(this).hasClass('box-filled-1')) {return}
    if ($(this).hasClass('box-filled-2')) {return}
    if ($('#player1').is('.active')) {
      p1box.push($(this).attr('class').split(' ')[1]);
      console.log('p1box: ' + p1box);
      $(this).toggleClass('box-filled box-filled-1');
      $(this).attr('disabled', true);
      $('#player1').toggleClass('active');
      $('#player2').toggleClass('active');
      console.log(containsAll(winCombos, p1box));
      if (containsAll(winCombos, p1box)) {
        $('#board').hide();
      };
    } else if ($('#player2').is('.active')){
      p2box.push($(this).attr('class').split(' ')[1]);
      console.log('p2box: ' + p2box);
      $(this).toggleClass('box-filled box-filled-2');
      $(this).attr('disabled', true);
      $('#player1').toggleClass('active');
      $('#player2').toggleClass('active');
      console.log(containsAll(winCombos, p2box));
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
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
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
