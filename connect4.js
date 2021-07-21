/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let HEIGHT = 6;
let WIDTH = 7;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

const topRow = document.createElement("tr");

let tie = false;
const startButton = document.querySelector('#startButton');

startButton.addEventListener('click', (e) => {
  e.preventDefault();
  startGame();
  document.querySelector('#startDiv').remove();
})

// Creates the JS board
function makeBoard(WIDTH, HEIGHT) {
  for (let i = 0; i < HEIGHT; i++) {
    board.push([]);
    for (let j = 0; j < WIDTH; j++) {
      board[i].push(null);
    }
  }
  return board;
}

// Creates the HTML board
function makeHtmlBoard(WIDTH, HEIGHT) {
  const htmlBoard = document.querySelector('#board');
  // creates table-row element, gives it col-top id then adds event listener.     
  // The for loop runs x times with x= board width, each td in tr is given the x value 
  // from that loop iteration as its ID. 

  topRow.setAttribute("id", "column-top");
  topRow.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    topRow.append(headCell);
  }
  htmlBoard.append(topRow);

  // outer for loop loop runs HEIGHT (6) times
  // inner loop creates the cells that populate table
  // id is set by str temp lit that uses y (height) and x (width) to create a coord-grid
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      const blankDiv = document.createElement('div');
      blankDiv.classList.add('blank');
      cell.setAttribute("id", `${y}-${x}`);
      cell.append(blankDiv);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let i = 0; i < HEIGHT; i++) {
    if (board[i][x] === null) {
      y = i;
    }
  }
  if (board[0][x] !== null) {
    y = null;
  }
  return y;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const div = document.createElement('div');
  div.classList.add('piece', 'drop', `p${currPlayer}`);
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  topRow.removeEventListener("click", handleClick);
  // Check if tie. If no tie, see who won and add corresponding class. 
  const p = document.createElement('p');
  p.innerText = msg;
  tie ? p.classList.add('tie-text') : currPlayer === 1 ? p.classList.add('win-text-red') : p.classList.add('win-text-blue');
  document.body.append(p);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // Updates JS board then places colored div in HTML board. 
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  // check for tie
  if (checkForTie()) {
    tie = true;
    return endGame(`It's a tie!`);
  }

  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // This loop creates 4 variables corresponding to all 4 possible ways to win.
  // These variables are entered into the _win function when it is invoked. 
  // _win brute force checks whole board (168 times) against the 4 possible win conditions. 
  // checking isn't based on last placed piece, brute force check whole thing. 

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//If top row is full then its a tie. 
const checkForTie = () => board[0].every(ele => ele !== null);

function startGame() {
  WIDTH = parseInt(document.querySelector('#widthSelect').value);
  HEIGHT = parseInt(document.querySelector('#heightSelect').value);
  makeBoard(WIDTH, HEIGHT);
  makeHtmlBoard(WIDTH, HEIGHT);
}