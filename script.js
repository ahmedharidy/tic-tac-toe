let currentPlayer = 'X';
const NUMBER_OF_ROWS = 4;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;
const createBoardArray = () => {
    const board = [];
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        board.push(Array.from({ length: NUMBER_OF_ROWS }, () => '_'));
    }
    return board;
};
let board = createBoardArray();

const resetButton = document.querySelector('#reset');
const getCellPlacement = (index, numberOfRows) => {
    const row = Math.floor(index / numberOfRows);
    const col = index % numberOfRows;
    return [row, col];
};

const chickRows = (currentPlayer) => {
    let column = 0;

    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        while (column < NUMBER_OF_ROWS) {
            if (board[row][column] !== currentPlayer) {
                column = 0;
                break;
            }
            column++;
        }

        if (column === NUMBER_OF_ROWS) {
            return true;
        }
    }
};

const chickCols = () => {
    let row = 0;
    for (let column = 0; column < NUMBER_OF_ROWS; column++) {
        while (row < NUMBER_OF_ROWS) {
            if (board[row][column] !== currentPlayer) {
                row = 0;
                break;
            }
            row++;
        }

        if (row === NUMBER_OF_ROWS) {
            return true;
        }
    }
};

const chickDiagonals = () => {
    let count = 0;

    while (count < NUMBER_OF_ROWS) {
        if (board[count][count] !== currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }

    if (count === NUMBER_OF_ROWS) {
        return true;
    }
};

const chickReverseDiagonals = () => {
    let count = 0;

    while (count < NUMBER_OF_ROWS) {
        if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }

    if (count === NUMBER_OF_ROWS) {
        return true;
    }
};

const checkWin = (currentPlayer) => {
    // chickRows(currentPlayer)
    //     || chickCols(currentPlayer)
    //     || chickDiagonals(currentPlayer)
    //     || chickReverseDiagonals(currentPlayer)
    if (chickRows(currentPlayer)) return true;

    if (chickCols(currentPlayer)) {
        return true;
    }
    if (chickDiagonals(currentPlayer)) {
        return true;
    }
    if (chickReverseDiagonals(currentPlayer)) {
        return true;
    }
};
const runWinEvent = () => {
    setTimeout(() => {
        alert(`player ${currentPlayer} won`);
        resetBoard();
    }, 100);
};
const resetBoard = () => {
    document.querySelector('.board').remove();
    createBoard();
    board = createBoardArray();
    currentPlayer = 'X';
    turnsCounter = 0;
};

const runDrawEvent = () => {
    setTimeout(() => {
        alert('تعادل!');
        resetBoard();
    }, 100);
};

const cellClickHandler = (event, index) => {
    const cell = event.target;
    // const row = Math.floor(index / NUMBER_OF_ROWS);
    // const col = index % NUMBER_OF_ROWS;
    const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

    if (board[row][col] === '_') {
        turnsCounter++;
        board[row][col] = currentPlayer;
        cell.querySelector('.value').textContent = currentPlayer;

        cell.classList.add(`cell--${currentPlayer}`);

        if (checkWin(currentPlayer)) {
            runWinEvent(currentPlayer);
        } else {
            if (turnsCounter === turns) {
                runDrawEvent();
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};

const createBoard = () => {
    const container = document.querySelector('.container');
    const board = document.createElement('div');

    board.classList.add('board');

    for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
        const cellElementString = `<div class="cell" role="button" tabindex="${i + 1}"><span class="value"></span></div>`;

        const cellElemnt = document.createRange().createContextualFragment(cellElementString);
        cellElemnt.querySelector('.cell').onclick = event => cellClickHandler(event, i);
        cellElemnt.querySelector('.cell').onkeydown = (event) => (event.key === 'Enter' ? cellClickHandler(event, i) : true);

        board.appendChild(cellElemnt);
        document.documentElement.style.setProperty('--grid-rows', NUMBER_OF_ROWS);
    }
    container.insertAdjacentElement('afterbegin', board);
};
resetButton.addEventListener('click', resetBoard);
createBoard();
