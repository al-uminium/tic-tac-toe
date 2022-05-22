//Query Selectors
const container = document.querySelector(".container");
const currentPlayerTurn = document.querySelector(".current-player-turn")
const boardGrid = document.querySelector(".board-grid")

//IIFE to control pages
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

    const boardPage = () => {
        container.innerHTML = `
            <div class="current-player-turn"></div>
            <div class="board-container">
                <div id="grid-1" class="board-grid"></div>
                <div id="grid-2" class="board-grid"></div>
                <div id="grid-3" class="board-grid"></div>
                <div id="grid-4" class="board-grid"></div>
                <div id="grid-5" class="board-grid"></div>
                <div id="grid-6" class="board-grid"></div>
                <div id="grid-7" class="board-grid"></div>
                <div id="grid-8" class="board-grid"></div>
                <div id="grid-9" class="board-grid"></div>
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

    return {
        landingPage,
        playerPage,
        boardPage,
    }
})();











const board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

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

checkWinner(testCase_2)


displayController.landingPage()

// To add event listeners for dynamically created HTML snippets, event delegation is used
// Add event listener to the parent, so when individual elements are clicked, it'll bubble up

container.addEventListener("click", (e) => {
    if (e.target.id == "play-with-friends") {
        displayController.playerPage()
    } else if (e.target.id == "play-with-AI" || e.target.id == "start-btn") {
        displayController.boardPage()
    } else {
        console.log(e.target.id)
    }
}
)