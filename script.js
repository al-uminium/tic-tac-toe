//Query Selectors
const container = document.querySelector(".container");
const currentPlayerTurn = document.querySelector(".current-player-turn")
const boardGrid = document.querySelector(".board-grid")

//Module for display
const displayController = (() => {
    const landingPage = () => {
        container.innerHTML = `
            <div class="header">tic tac toe</div>
            <div class="play-options">
                <button type="button" class="btn" id="play-with-friends">Play With Friends</button>
                <button type="button" class="btn" id="play-with-AI">If You Have No Friends</button>
            </div>
        `
        container.id = "landing-page"
    }

    const playerPage = () => {
        container.innerHTML = `
            <div class="player-page-header">Choose your mark</div>
            <div class="mark-radio-container">
                <input type="radio" name="mark" id="mark-X">
                <label for="mark-X">X</label>
                <input type="radio" name="mark" id="mark-O">
                <label for="mark-O">O</label>
            </div>
            <button type="button" class="btn" id="start-btn">Start Game!</button>
        `
        container.id = "player-page"
    }

    const boardPage = (currentPlayer) => {
        let currentPlayerTurn = currentPlayer
        let HTMLsnippet = `<div class="current-player-turn">${currentPlayerTurn}'s turn</div>`
        if (gameBoard.playingWithAI()) {
            HTMLsnippet = `<div class="current-player-turn"></div>`
        }

        container.innerHTML = `
            ${HTMLsnippet}
            <div class="board-container">
                <div id="grid-0" class="board-grid"></div>
                <div id="grid-1" class="board-grid"></div>
                <div id="grid-2" class="board-grid"></div>
                <div id="grid-3" class="board-grid"></div>
                <div id="grid-4" class="board-grid"></div>
                <div id="grid-5" class="board-grid"></div>
                <div id="grid-6" class="board-grid"></div>
                <div id="grid-7" class="board-grid"></div>
                <div id="grid-8" class="board-grid"></div>
            </div>
            <div class="game-status-container hide">
                <div class="game-status"></div>
                <div class="game-end-action">
                    <div id="replay">Replay</div>
                    <div id="restart">Restart</div>
                </div>
            </div>
        `
        container.id = "board-page"
    }

    const updateCurrentPlayerStatus = () => {
        const currentPlayerTurn = document.querySelector(".current-player-turn")
        if (!gameBoard.playingWithAI()) {
            currentPlayerTurn.innerText = `${gameBoard.getCurrentPlayer()}'s turn`
        }
    }

    const updateBoardGrids = (grid) => {
        grid.innerText = gameBoard.getCurrentPlayer();
    }

    return {
        landingPage,
        playerPage,
        boardPage,
        updateCurrentPlayerStatus,
        updateBoardGrids,
    }
})();

// Module for game board
const gameBoard = ((e) => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    let currentPlayer = "X";
    let playWithAI = false;

    const winArrays = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonal
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWinner = (board) => {
        for (const arr of winArrays) {
            if (board[arr[0]] && board[arr[0]] == board[arr[1]] && board[arr[1]] == board[arr[2]]) {
                console.log(`Winning array is: ${arr}`)
            }
        }
    }

    const updateBoard = (e, currentPlayerTurn) => {
        let gridID = getGridID(e)
        if (!board[gridID]) {
            board[gridID] = currentPlayerTurn
            displayController.updateBoardGrids(e.target)
            updateCurrentPlayer()
            displayController.updateCurrentPlayerStatus()
            checkWinner(board)
        }
    }

    const printBoard = () => {
        console.log(board)
    }

    const resetBoard = () => {
        board = [
            "", "", "",
            "", "", "",
            "", "", ""
        ]
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    const updateCurrentPlayer = () => {
        currentPlayer = currentPlayer == "X" ? "O" : "X"
    }

    const playingWithAI = () => {
        return playWithAI
    }

    const updatePlayWithAI = (bool) => {
        playWithAI = bool
    }

    return {
        updateBoard,
        printBoard,
        resetBoard,
        getCurrentPlayer,
        updateCurrentPlayer, 
        playingWithAI,
        updatePlayWithAI,
    }
})();

const testCase_1 = [
    "", "", "",
    "", "", "",
    "X", "X", "X"
]

const testCase_2 = [
    "", "X", "",
    "", "X", "",
    "", "X", ""
]


// helper functions 
const getGridID = (grid) => {
    let gridID = grid.target.id
    gridID = gridID.slice(gridID.length-1, gridID.length);
    return gridID
}


displayController.landingPage()

// To add event listeners for dynamically created HTML snippets, event delegation is used
// Add event listener to the parent, so when individual elements are clicked, it'll bubble up

container.addEventListener("click", (e) => {
    if (e.target.id == "play-with-friends") {
        displayController.playerPage()

    } else if (e.target.id == "play-with-AI" || e.target.id == "start-btn") {
        let playingWithAI = e.target.id == "play-with-AI" ? true : false
        gameBoard.updatePlayWithAI(playingWithAI)

        if (!playingWithAI) {
            let OMark = document.querySelector("#mark-O")
            // player is defaulted to X
            if (OMark.checked) {
                gameBoard.updateCurrentPlayer()
            }
        } 

        displayController.boardPage(gameBoard.getCurrentPlayer())

    } else if (e.target.className == "board-grid") {
        gameBoard.updateBoard(e, gameBoard.getCurrentPlayer())
        gameBoard.printBoard()
    } else {
        console.log(e.target.id)
    }
})