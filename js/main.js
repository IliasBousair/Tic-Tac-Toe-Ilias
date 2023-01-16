console.log('Main Loaded')

//queryselectors-------------------------------------------
const topLeft = document.querySelector('.div1');
const topMid = document.querySelector('.div2');
const topRight = document.querySelector('.div3');
const midLeft = document.querySelector('.div4');
const midMid = document.querySelector('.div5');
const midRight = document.querySelector('.div6');
const bottomLeft = document.querySelector('.div7');
const bottomMid = document.querySelector('.div8');
const bottomRight = document.querySelector('.div9');
const winMessage = document.querySelector('.winMessage');
const resetBtn = document.querySelector('.resetBtn');
const boxes = document.querySelectorAll('.box');
const playerXscore = document.querySelector('.playerXscore');
const playerOscore = document.querySelector('.playerOscore');
const resetWinsBtn = document.querySelector('.resetWinsBtn');



let playerTurn = true;
let player = "✖";
let playerTwo = "〇";
let playerXwins = 0;
let playerOwins = 0;
let moves = 0;
let gameOver = false;

winMessage.style.display = "none";//veranderd de css van de class winMessage naar display:none; | dus hij toont het eerst niet pas nadat je hebt gewonnen
//---------------------------------------------------------

//Win Combinaties------------------------------------------

const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6]  // diagonal top-right to bottom-left
];
console.log(winningCombinations);


//X & O click----------------------------------------------

boxes.forEach((box) => { //forEach is voor elke box
  box.addEventListener('click', function () { //addeventlistener zorgt ervoor dat elke box een function heeft 
    if (playerTurn == true) {
      if (box.textContent == '' && gameOver == false) {// hij checkt of de box leeg is. zo ja dan plaats hij een X
        box.textContent = player;//als de function uitvoort dan komt er een tekst
        playerTurn = false;
        console.log("empty");
        moves += 1;
        checkWinner(player);
      }
    }
    else {
      if (box.textContent == '' && gameOver == false) { //hij checkt of de box leeg is. zo ja dan plaats hij een O
        console.log("empty1");
        box.textContent = playerTwo;//als de function uitvoort dan komt er een tekst 
        playerTurn = true;
        moves += 1;
        checkWinner(playerTwo);
      }
    }
  });
});

//Reset Button----------------------------------------------

resetBtn.addEventListener('click', resetButton)

function updatePlayerData() {//
  localStorage.setItem('player-o-wins', playerOwins); //local storage het slaat de player O wins op
  localStorage.setItem('player-x-wins', playerXwins);//local storage het slaat de player X wins op
  playerOscore.innerHTML = localStorage.getItem("player-o-wins");
  playerXscore.innerHTML = localStorage.getItem("player-x-wins");
  moves = 0;
  gameOver = true;
}

function resetButton() {
  location.reload();
}

function refreshPlayerData() {
  playerOwins = parseInt(localStorage.getItem('player-o-wins')); // zorgt ervoor dat het een nummer is en geen tekst, anders krijg je bijvoorbeeld 21 ipv 3
  playerXwins = parseInt(localStorage.getItem('player-x-wins'));// zorgt ervoor dat het een nummer is en geen tekst, anders krijg je bijvoorbeeld 21 ipv 3
  playerOscore.innerHTML = localStorage.getItem("player-o-wins"); //hij zet de opgeslagen wins in de html
  playerXscore.innerHTML = localStorage.getItem("player-x-wins");//hij zet de opgeslagen wins in de html
}

resetWinsBtn.addEventListener('click', function () {
  localStorage.clear();
  resetButton();
})






if (localStorage.length != 0) { //checkt of er uberhaupt iets is opgeslagen in de local storage
  refreshPlayerData(); // als iets is opgeslagen refresht het de data
}

//Win Combinaties boxes-------------------------------------
function checkWinner(currPlayer) { //currplayer is voor de player die bezig is dus voor player O en player X
  if (moves == 9) {
    document.querySelector('.status').innerHTML = "It's a Tie!"; // je haalt de class van de index.html en het wordt dan player + wie gewonnen heeft
    winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'  
    gameOver = true;
  }
  else {
    if (boxes[0].textContent == currPlayer && boxes[1].textContent == currPlayer && boxes[2].textContent == currPlayer) { //TOP ROW  0-1-2
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!"; // je haalt de class van de index.html en het wordt dan player + wie gewonnen heeft
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'  
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[3].textContent == currPlayer && boxes[4].textContent == currPlayer && boxes[5].textContent == currPlayer) { //MIDDLE ROW  3-4-5
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[6].textContent == currPlayer && boxes[7].textContent == currPlayer && boxes[8].textContent == currPlayer) { //BOTTOM ROW  6-7-8
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[0].textContent == currPlayer && boxes[3].textContent == currPlayer && boxes[6].textContent == currPlayer) { //LEFT COLUMN  0-3-6
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block' 
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[1].textContent == currPlayer && boxes[4].textContent == currPlayer && boxes[7].textContent == currPlayer) { //MIDDLE COLUMN  1-4-7
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[2].textContent == currPlayer && boxes[5].textContent == currPlayer && boxes[8].textContent == currPlayer) { //RIGHT COLUMN  2-5-8
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }
    if (boxes[0].textContent == currPlayer && boxes[4].textContent == currPlayer && boxes[8].textContent == currPlayer) { //TOP LEFT TO BOTTOM RIGHT  0-4-8
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }

    if (boxes[2].textContent == currPlayer && boxes[4].textContent == currPlayer && boxes[6].textContent == currPlayer) { //TOP RIGHT TO BOTTOM LEFT  2-4-6
      document.querySelector('.status').innerHTML = "Player " + currPlayer + " Won!";
      winMessage.style.display = "block";// style verandert de css van de winmessage en het wordt dan veranderd naar display 'block'
      if (currPlayer == player) {
        playerXwins += 1;
        updatePlayerData();
      } else {
        playerOwins += 1;
        updatePlayerData();
      }
    }
  }
}



