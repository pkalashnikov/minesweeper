'use strict'

const FLOOR = 'FLOOR'
const EMPTY = 'EMPTY'
const BALL = 'BALL'
const GAMER = 'GAMER'
const PASSAGE = 'PASSAGE'
const MINES = 'MINES'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'

// Model:
var gBoard
var gGamerPos
var minesCount
var mySound
var gNeighborsCount
var gInterval

var mines = 2
var level = 16
var boardSize = document.querySelector('.main')

function onInitGame(number) {
    if (number){ 
        level = number
        onInitGame()}
    //minesCount = 0
    gBoard = buildBoard()

    renderBoard(gBoard)
    countMinesAround(gBoard, 5, 5)
    //gInterval = setInterval(getEmptyCell, 2000);
    //console.log("Mines: ", getmines())

}
function buildBoard() {
    const board = []
    var a
    var b
    var l = 0
    var minesCell = []
    var mineCell = []
    for (var i = 0; minesCell.length<=mines; i++) {
        a = getRandomInt(0, Math.sqrt(level))
        mineCell[a]=[]
        b = getRandomInt(0, Math.sqrt(level))
        //const minecell = minesCell[a][b]
       
         minesCell.push({ a, b })

    }
    console.log(minesCell)
   
    for (var i = 0; i < Math.sqrt(level); i++) {
        board[i] = []
        for (var j = 0; j < Math.sqrt(level); j++) {
            board[i][j] = { type: EMPTY, gameElement: null }
            
            // board[i][j] = { type: FLOOR, gameElement: null }
            // board[i][j] = { type: MINES, gameElement: null }
            // board[i][j] = { type: FLAG, gameElement: null }
        
    }
}
while (l < mines) {
    var c = minesCell[l].a
    var d = minesCell[l].b
    l++
    console.log(c,d)
    board[c][d] = { type: MINES, gameElement: null }
}
    return board
}

// Render the board to an HTML table
function renderBoard(board) {
    if (level === 16) {
        document.querySelector('.main').classList.add('main-4')
        document.querySelector('.main').classList.remove('main-8')
        document.querySelector('.main').classList.remove('main-12')
        mines = 2

    }
    else if (level === 64) {
        document.querySelector('.main').classList.add('main-8')
        document.querySelector('.main').classList.remove('main-4')
        document.querySelector('.main').classList.remove('main-12')
        mines = 14
    }
    else if (level === 144) {
        document.querySelector('.main').classList.add('main-12')
        document.querySelector('.main').classList.remove('main-4')
        document.querySelector('.main').classList.remove('main-8')
        mines = 32
    }
    var zero
    if (mines >= 10) zero = "0"
    else if (mines < 10) zero = "00"

    document.querySelector('.score').innerHTML = `${zero}${mines}`
    const elBoard = document.querySelector('.divTableRow')
    var strHTML = ''
    for (var i = 0; i < Math.sqrt(level); i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < Math.sqrt(level); j++) {
            const currCell = board[i][j]

            var cellClass

            if (currCell.type === EMPTY) {
                cellClass += ' divTableCell-empty'
                strHTML += `\t<div class="divTableCell-empty"></div>\n`
            }
            else if (currCell.type === MINES) {
                cellClass += ' divTableCell'
                strHTML += `\t<div class="mine"><span></span></div>\n`
            }
        }
    }
    elBoard.innerHTML = strHTML
    countMinesAround(gBoard, i, j)
}

// Move the player to a specific location
// Convert a location object {i, j} to a selector and render a value in that element
// function renderCell(location, value) {
//     const cellSelector = '.' + getClassName(location) // cell-i-j
//     const elCell = document.querySelector(cellSelector)
//     elCell.innerHTML = value

// }
function getmines() {
    var minesCell = []

    for (var i = 0; i < mines; i++) {
        const a = getRandomInt(0, Math.sqrt(level))
        const b = getRandomInt(0, Math.sqrt(level))
        minesCell.push({ a, b })
    }
    return minesCell
}
function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function gameOver() {

    var strHTML = `<h2>Game Over</h2>
    <button onclick="onInitGame()">Restart</button>`

    var elBallCount = document.querySelector('h2 span')
    elBallCount.innerText = '0'

    const elGameOver = document.querySelector('.board')
    elGameOver.innerHTML = strHTML

}



// function getEmptyCell(board) {
//     var emptyCells = []
//     for (var i = 0; i < Math.sqrt(level); i++) {
//         for (var j = 0; j < Math.sqrt(level); j++) {

//             if (gBoard.gameElement === null && board.type !== FLOOR) {
//                 emptyCells.push({ i, j })
//             }
//         }
//     }

//     // if (emptyCells.length === 0) gameOver()

//     var randCell = emptyCells[getRandomInt(0, emptyCells.length)]

//     //UPDATE MODEL & DOM
//     //current cell
//     // mines++
//    // gBoard[randCell.i][randCell.j].gameElement = BALL
//     // renderCell(randCell, BALL_IMG)
//     //next cell


// }


function countMinesAround(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell === BALL) count++
        }
    }
    gNeighborsCount = count
}
