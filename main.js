'use strict'

const FLOOR = 'FLOOR'
const EMPTY = 'EMPTY'
const MINES = 'MINES'
const BALL = 'BALL'
const GAMER = 'GAMER'
const PASSAGE = 'PASSAGE'

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
    if (number) {
        level = number
        onInitGame()
    }
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
    for (var i = 0; minesCell.length < mines; i++) {
        a = getRandomInt(0, Math.sqrt(level))
        b = getRandomInt(0, Math.sqrt(level))
        if (inArray([a, b], minesCell) === false) {
            minesCell.push([a, b])
            console.log([a, b])
        }
    }


    for (var i = 0; i < Math.sqrt(level); i++) {
        board[i] = []
        for (var j = 0; j < Math.sqrt(level); j++) {
            board[i][j] = { type: FLOOR, gameElement: null }

            // board[i][j] = { type: FLOOR, gameElement: null }
            // board[i][j] = { type: MINES, gameElement: null }
            // board[i][j] = { type: FLAG, gameElement: null }
        }
    }
    while (l < mines) {
        var c = minesCell[l][0]
        var d = minesCell[l][1]
        l++
        // console.log(c,d)
        board[c][d] = { type: MINES, gameElement: null }
    }
    return board
}
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i][0] === needle[0] && haystack[i][1] === needle[1]) return true;
    }
    return false;
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
        for (var j = 0; j < Math.sqrt(level); j++) {
            const currCell = board[i][j]

            var cellClass

            if (currCell.type === FLOOR) {
                cellClass += ' divTableCell'
                if (countMinesAround(board, i, j) === 1) {
                    strHTML += `\t<div class="divTableCell"><span style="color:#3016B0">${countMinesAround(board, i, j)}</span></div>\n`
                }
                else if (countMinesAround(board, i, j) === 2) {
                    strHTML += `\t<div class="divTableCell"><span style="color:#22884F">${countMinesAround(board, i, j)}</span></div>\n`
                }
                else if (countMinesAround(board, i, j) === 3) {
                    strHTML += `\t<div class="divTableCell"><span style="color:#BF3030">${countMinesAround(board, i, j)}</span></div>\n`
                }
                else if (countMinesAround(board, i, j) === 4) {
                    strHTML += `\t<div class="divTableCell"><span style="color:#06266F">${countMinesAround(board, i, j)}</span></div>\n`
                }
                else if (countMinesAround(board, i, j) === 5) {
                    strHTML += `\t<div class="divTableCell"><span style="color:#85004B">${countMinesAround(board, i, j)}</span></div>\n`
                }

                else { strHTML += `\t<div class="divTableCell"><span></span></div>\n` }
            }
            else if (currCell.type === MINES) {
                cellClass += ' mine'
                strHTML += `\t<div class="mine"></div>\n`
            }
        }
    }
    elBoard.innerHTML = strHTML
    countMinesAround(gBoard, i, j)
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
function countMinesAround(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.type === MINES) count++
        }
    }
    gNeighborsCount = count
    return count
}
