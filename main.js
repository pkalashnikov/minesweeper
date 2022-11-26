'use strict'

// const WALL = '#'
const WALL = '🧱'
const FOOD = '•'
const EMPTY = ' '
const POWER_FOOD = '🧁'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard
var gIsWinner = false
var gCherryInterval
function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    gGame.foodCount -= 5
    return board
}