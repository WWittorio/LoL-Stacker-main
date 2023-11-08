const provetta = document.querySelector(".prova");
/* PROVA */
const gameGrid = document.querySelector(".game-grid");
const baseMinion = document.querySelector(".base-minion");
const dark = document.querySelector(".dark");
const stackButton = document.querySelector(".stack-button");
const winEndScreen = document.querySelector(".win-endscreen");
const loseButton = document.querySelector(".lose-button");

const gridTable = [
  [0, 0, 0, 0, 0, 0] /* 0 */,
  [0, 0, 0, 0, 0, 0] /* 1 */,
  [0, 0, 0, 0, 0, 0] /* 2 */,
  [0, 0, 0, 0, 0, 0] /* 3 */,
  [0, 0, 0, 0, 0, 0] /* 4 */,
  [0, 0, 0, 0, 0, 0] /* 5 */,
  [0, 0, 0, 0, 0, 0] /* 6 */,
  [0, 0, 0, 0, 0, 0] /* 7 */,
  [1, 1, 1, 0, 0, 0] /* 8 */,
];

let intervalID = 0;
let currentRowIndex = gridTable.length - 1;
let blockDirection = "right";
let timeToStack = 600;
const increseStackSpeed = 0.99;

/* let previousRowIndex = currentRow + 1;
let previousRow = gridTable[previousRowIndex]; */
let blockSize = 3;

/* DISEGNA TABELLA */
function draw() {
  gameGrid.innerHTML = " ";
  gridTable.forEach(function (rowContent, rowIndex) {
    rowContent.forEach(function (cellContent, cellIndex) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      /*   cell.innerText = cellContent; */

      const isRowEven = rowIndex % 2 === 0;
      const isCellEven = cellIndex % 2 === 0;
      if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) {
        cell.classList.add("dark");
      }
      if (cellContent === 1) {
        cell.classList.add("block");
      }
      gameGrid.appendChild(cell);
    });
  });
}

/*_______________________________________________ UPDATE ROW ____________*/

stackButton.addEventListener("click", function () {
  updateRow();

  /*  if (currentRowIndex !== gridTable.length - 1) {
    checkResult();
  } */
});

function main() {
  moveBlock();
  draw();
}

console.table(gridTable);

/*



 ALTRE FUNZIONI */
function disableButton(anyButton) {
  anyButton.disabled = true;
  anyButton.addEventListener("click", disableButton);
}

function moveRight(row) {
  row.unshift(0);
  row.pop();
}

function moveLeft(row) {
  row.push(0);
  row.shift();
}

function loseGame() {
  clearInterval(intervalID);
  /* crea immagine lose */
  const loseEndScreen = document.createElement("div");
  loseEndScreen.classList.add("lose-endscreen");
  gameGrid.appendChild(loseEndScreen);
  /* mostra bottone lose */
  loseButton.classList.remove("hidden");
  disableButton(stackButton);
  console.log("HAI PETO");
  console.log(loseEndScreen);
}

function winGame() {
  clearInterval(intervalID);

  console.log("HAI VITO");
}

function updateRow() {
  if (currentRowIndex >= 4 && currentRowIndex <= 6) {
  }
  if (currentRowIndex !== 8) {
    /* confronta blocchi */
    let newBlockSize = 0;
    for (let i = 0; i < gridTable[currentRowIndex].length; i++) {
      if (gridTable[currentRowIndex][i] !== gridTable[currentRowIndex + 1][i]) {
        gridTable[currentRowIndex][i] = 0;
      }
      if (gridTable[currentRowIndex][i] === 1) {
        newBlockSize++;
      }
    }
    blockSize = newBlockSize;

    if (blockSize === 0) {
      loseGame();
      return;
    } else if (currentRowIndex === 0) {
      winGame();
      return;
    }
  }

  currentRowIndex--;
  for (let i = 0; i < blockSize; i++) {
    gridTable[currentRowIndex][i] = 1;
  }

  stackButton.classList.add("prova");
  draw();
  clearInterval(intervalID);
  timeToStack = timeToStack * increseStackSpeed;
  intervalID = setInterval(main, timeToStack); // aiiii caramba
  console.log(timeToStack); // mamma mia
}

/* MUOVI BLOCCO  */
function moveBlock() {
  let currentRow = gridTable[currentRowIndex];
  if (currentRow[5] === 0 && blockDirection === "right") {
    blockDirection = "right";
    moveRight(currentRow);
  } else if (currentRow[5] === 1 && blockDirection === "right") {
    blockDirection = "left";
    moveLeft(currentRow);
  } else if (currentRow[0] === 0 && blockDirection === "left") {
    blockDirection = "left";
    moveLeft(currentRow);
  } else if (currentRow[0] === 1 && blockDirection === "left") {
    blockDirection = "right";
    moveRight(currentRow);
  }
}

draw();
intervalID = setInterval(main, timeToStack);
console.log(timeToStack);
