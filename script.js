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
