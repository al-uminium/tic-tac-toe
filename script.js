//Query Selectors
const container = document.querySelector(".container");
// const currentPlayerTurn = document.querySelector(".current-player-turn")
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

    const boardPage = () => {
        let HTMLsnippet = `<div class="current-player-turn">${gameBoard.getCurrentPlayer()}'s turn</div>`
        if (gameBoard.playingWithAI()) {
            HTMLsnippet = `<div class="current-player-turn">🤖 Supremacy</div>`
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
        let gameResult = gameBoard.checkForWin()

        if (gameBoard.getGameFinishedStatus()) {
            if (gameBoard.playingWithAI()) {
                gameStatus.innerText = gameResult == "O" ? "You lost :(" : "You won!"
            } 
            if (!gameBoard.playingWithAI()) {
                gameStatus.innerText = `${gameResult} won!`
            }
            if (gameResult === "draw") {
                gameStatus.innerText = "It's a draw!"
            }
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
            console.log(arr)
            console.log(Boolean(board[arr[0]]), board[arr[0]] == board[arr[1]], board[arr[0]] == board[arr[2]])
            if (board[arr[0]] && board[arr[0]] == board[arr[1]] && board[arr[0]] == board[arr[2]]) {
                console.log(`Winning array is: ${arr}, winner is ${board[arr[0]]}`)
                gameFinished = true;
                winner = board[arr[0]]
                return winner
            } 
        }
        if (!board.includes("")) {
            gameFinished = true;
            return "draw"
        }
    }

    const getGameFinishedStatus = () => {
        return gameFinished
    }

    const updateBoard = (id, currentPlayerTurn) => {
        // console.log(id)
        if (!board[id]) {
            board[id] = currentPlayerTurn
            return true
        } else {
            return false
        }
    }

    const getBoard = () => {
        return board
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

    const newGame = () => {
        gameFinished = false
    }

    const aiTurn = () => {
        let easyMode = false
        let availableGrids = []
        
        const randomGrid = () => {
            let len = availableGrids.length
            let random = availableGrids[Math.floor(Math.random() * len)]
            return random
        }

        const minimax = (boardGrid, depth, maximizingPlayer) => {
            //depth will be 0 if there's no more moves
            //the "node" will be the board states
            //maximizing player is the AI
            let gameResult = gameBoard.checkForWin()

    
            if (availableGrids.length === 0 || getGameFinishedStatus()) {
                if (gameResult == "X") {
                    return 1
                } else if (gameResult == "O") {
                    return -1
                } else if (gameResult == "draw") {
                    return 0
                }
            }
            return 1;
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

        } else {
            let bestScore = -Infinity;
            let currentBoard = getBoard()
            let bestMove;

            availableGrids.forEach(boardGrid => {
                currentBoard[boardGrid] = "O"
                let score = minimax(currentBoard, 0, true)
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = boardGrid;
                }
                currentBoard[boardGrid] = ""
            });

            updateBoard(bestMove, getCurrentPlayer())
            displayController.updateBoardGridsAI(bestMove)

        }
    }

    return {
        updateBoard,
        getBoard,
        resetBoard,
        getCurrentPlayer,
        updateCurrentPlayer, 
        playingWithAI,
        updatePlayWithAI,
        checkForWin,
        newGame,
        getGameFinishedStatus,
        aiTurn,
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
    let gameStatus = gameBoard.checkForWin()

    //prevents player from placing additional marks if it's already finished
    if (!gameBoard.getGameFinishedStatus()) {
        // updateBoard attempts to update the board, returns boolean
        if (gameBoard.updateBoard(gridID, gameBoard.getCurrentPlayer())) {
            displayController.updateBoardGrids(e)
            gameStatus = gameBoard.checkForWin()

            //checking if it's finished after the update
            if (!gameBoard.getGameFinishedStatus()) {
                gameBoard.updateCurrentPlayer()
                if (!gameBoard.playingWithAI()) {
                    displayController.updateCurrentPlayerStatus()

                } else if (gameBoard.playingWithAI()) {
                    gameBoard.aiTurn()
                    gameStatus = gameBoard.checkForWin()
                    if (!gameBoard.getGameFinishedStatus()) {
                        //the update below is to switch it back to X since it's the player's turn again
                        gameBoard.updateCurrentPlayer()
                    }
                }
            } 
            //check for draws instead
            if (gameStatus == "draw" || gameBoard.getGameFinishedStatus()) {
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
        displayController.boardPage("X")

    } else if (e.target.className == "board-grid") {
        updateGameBoard(e.target)
        console.log(gameBoard.getBoard())
    } else if (e.target.id == "replay") {
        newGame()
        displayController.boardPage(gameBoard.getCurrentPlayer())
    } else if (e.target.id == "restart") {
        newGame()
        displayController.landingPage()
    } else {
        // console.log(e.target.id)
    }
})