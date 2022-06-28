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
            <div class="player-page-header">Choose your mark<br><span>X starts first</span></div>
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
            HTMLsnippet = `<div class="current-player-turn">STILL A WIP</div>`
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

    const updateBoardGridsAI = (grid) => {
        let aiGrid = document.querySelector(`#grid-${grid}`)
        aiGrid.innerText = "O"
    }

    const unhideGameStatusContainer = () => {
        const gameStatusContainer = document.querySelector(".game-status-container")
        gameStatusContainer.classList.toggle("hide")
    }

    const updateGameStatus = () => {
        const gameStatus = document.querySelector(".game-status")
        let winningPlayer = gameBoard.getWinner()
        
        if (gameBoard.playingWithAI()) {
            gameStatus.innerText = winningPlayer == "O" ? "You lost :(" : "You won!"
        } else {
            gameStatus.innerText = `${winningPlayer} won!`
        }
        // if it's a draw
        if (gameBoard.getDrawStatus()) {
            gameStatus.innerText = "It's a draw!"
        } 
    }

    return {
        landingPage,
        playerPage,
        boardPage,
        updateCurrentPlayerStatus,
        updateBoardGrids,
        unhideGameStatusContainer,
        updateGameStatus,
        updateBoardGridsAI,
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
    let gameFinished = false;
    let isWin = false
    let isDraw = false;
    let winner 

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

    const checkForWin = () => {

        for (const arr of winArrays) {
            //board[arr[0]] is to ensure they are not empty. 
            if (board[arr[0]] && board[arr[0]] == board[arr[1]] && board[arr[1]] == board[arr[2]]) {
                console.log(`Winning array is: ${arr}, winner is ${board[arr[0]]}`)
                isWin = true;
                isDraw = false;
                gameFinished = true;
                winner = board[arr[0]]
            } else if (checkForDraws()) {
                isDraw = true;
                isWin = false;
            }
        }
    }

    const getGameFinishedStatus = () => {
        return gameFinished
    }

    const getDrawStatus = () => {
        return isDraw
    }

    const getWinStatus = () => {
        return isWin
    }

    const getWinner = () => {
        return winner
    }

    const checkForDraws = () => {
        return (!board.includes("")) 
    }

    const updateBoard = (id, currentPlayerTurn) => {
        console.log(id)
        if (!board[id]) {
            board[id] = currentPlayerTurn
            return true
        } else {
            return false
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

    const isGameFinished = () => {
        return gameFinished
    }

    const newGame = () => {
        gameFinished = false
        isWin = false
        isDraw = false
    }

    const aiTurn = () => {
        let easyMode = true
        let availableGrids = []
        
        const randomGrid = () => {
            let len = availableGrids.length
            let random = availableGrids[Math.floor(Math.random() * len)]
            return random
        }
        
        for (let i = 0; i < 9; i++) {
            if (board[i] == "") {
                availableGrids.push(i)
            }
        }
        if (easyMode) {
            let aiMove = randomGrid()
            updateBoard(aiMove, getCurrentPlayer())
            displayController.updateBoardGridsAI(aiMove)
        }
    }

    return {
        updateBoard,
        printBoard,
        resetBoard,
        getCurrentPlayer,
        updateCurrentPlayer, 
        playingWithAI,
        updatePlayWithAI,
        checkForWin,
        isGameFinished,
        newGame,
        checkForDraws,
        getGameFinishedStatus,
        getDrawStatus,
        getWinStatus,
        aiTurn,
        getWinner,
    }
})();

// helper functions 
const getGridID = (grid) => {
    let gridID = grid.id
    gridID = gridID.slice(gridID.length-1, gridID.length);

    return gridID
}

const updateGameBoard = (e) => {
    let gridID = getGridID(e);

    //prevents player from placing additional marks if it's already finished
    if (!gameBoard.isGameFinished()) {
        // updateBoard attempts to update the board, returns boolean
        if (gameBoard.updateBoard(gridID, gameBoard.getCurrentPlayer())) {
            displayController.updateBoardGrids(e)
            gameBoard.checkForWin()

            //checking if it's finished after the update
            if (!gameBoard.isGameFinished()) {
                gameBoard.updateCurrentPlayer()
                if (!gameBoard.playingWithAI){
                    displayController.updateCurrentPlayerStatus()
                }
                console.log(gameBoard.playingWithAI())
                if (gameBoard.playingWithAI()) {
                    gameBoard.aiTurn()
                    gameBoard.checkForWin()
                    gameBoard.updateCurrentPlayer()
                }
            } 
            //check for draws instead
            if (gameBoard.getDrawStatus() || gameBoard.getGameFinishedStatus()) {
                gameOver()
            }

        }
    }
}

const gameOver = () => {
    displayController.updateGameStatus()
    displayController.unhideGameStatusContainer()
}

const newGame = () => {
    gameBoard.newGame()
    gameBoard.resetBoard()
    gameBoard.updatePlayWithAI = false  
    if (gameBoard.getCurrentPlayer() == "O") {
        gameBoard.updateCurrentPlayer()
    }
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

        // Still contemplating if I should default to X first
        // if (!playingWithAI) {
        //     let OMark = document.querySelector("#mark-O")
        //     if (OMark.checked) {
        //         gameBoard.updateCurrentPlayer()
        //     }
        // } 

        displayController.boardPage("X")

    } else if (e.target.className == "board-grid") {
        updateGameBoard(e.target)
        gameBoard.printBoard()
    } else if (e.target.id == "replay") {
        newGame()
        displayController.boardPage(gameBoard.getCurrentPlayer())
    } else if (e.target.id == "restart") {
        newGame()
        displayController.landingPage()
    } else {
        console.log(e.target.id)
    }
})