var board = [];
var score = 0;

$(document).ready(function() {
    init();
})

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: // left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout(randomNumGenerate, 200);
                setTimeout(isGameOver, 300);
            }
            break;
        case 38: // up
            event.preventDefault();
            if (moveUp()) {
                setTimeout(randomNumGenerate, 200);
                setTimeout(isGameOver, 300);
            }
            break;
        case 39: // right
            event.preventDefault();
            if (moveRight()) {
                setTimeout(randomNumGenerate, 200);
                setTimeout(isGameOver, 300);
            }
            break;
        case 40: // down
            event.preventDefault();
            if (moveDown()) {
                setTimeout(randomNumGenerate, 200);
                setTimeout(isGameOver, 300);
            }
            break;
        default:
            break;
    }
})

function init() {
    // initialize the board
    initBoard();
    // generate random number
    randomNumGenerate();
    randomNumGenerate();
}

function initBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var $gridCell = $("#grid-cell-" + i + "-" + j);
            $gridCell.css("top", getTop(i));
            $gridCell.css("left", getLeft(j));
        }
    }

    for (let i = 0; i < 4; i++) {
        board[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateView();
}

function updateView() {
    $(".num-cell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="num-cell" id="num-cell-' +
                i + '-' + j + '"></div>')
            var theNumCell = $("#num-cell-" + i + "-" + j);

            if (board[i][j] === 0) {

                theNumCell.css({
                    "width": 0,
                    "height": 0,
                    "top": getTop(i) + 50,
                    "left": getLeft(j) + 50
                })

            } else {
                theNumCell.css({
                        "width": "100px",
                        "height": "100px",
                        "top": getTop(i),
                        "left": getLeft(j),
                        "background-color": setNumCellBgColor(board[i][j]),
                        "color": setNumCellColor(board[i][j])
                    })
                    .text(board[i][j]);
            }
        }
    }
}

// 生成随机数字并且渲染
function randomNumGenerate() {
    if (checkSpace(board)) {
        var boardEmpty = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    boardEmpty.push([i, j])
                }
            }
        }
        var rd = Math.floor(Math.random() * boardEmpty.length);
        var x = boardEmpty[rd][0];
        var y = boardEmpty[rd][1];
        var randomNum = Math.random() > 0.5 ? 2 : 4;
        board[x][y] = randomNum;
        renderNum(x, y, randomNum);
        return true;
    } else {
        return false;
    }
}

function moveLeft() {
    if (canMoveLeft(board)) {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (let k = 0; k < j; k++) {
                        if (board[i][k] === 0 && noBlockH(i, k, j, board)) {
                            // move
                            move(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] === board[i][j] && noBlockH(i, k,
                                j, board)) {
                            //move
                            move(i, j, i, k);
                            //add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateView, 400);
        return true;
    } else {
        return false;
    }
}


function moveRight() {
    if (canMoveRight(board)) {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (board[i][j] !== 0) {
                    for (let k = 3; k > j; k--) {
                        if (board[i][k] === 0 && noBlockH(i, j, k, board)) {
                            // move
                            move(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] === board[i][j] && noBlockH(i, j,
                                k, board)) {
                            //move
                            move(i, j, i, k);
                            //add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateView, 400);
        return true;
    } else {
        return false;
    }
}

function moveUp() {
    if (canMoveUp(board)) {
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (let k = 0; k < i; k++) {
                        if (board[k][j] === 0 && noBlockV(j, k, i, board)) {
                            // move
                            move(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] === board[i][j] && noBlockV(j, k,
                                i, board)) {
                            //move
                            move(i, j, k, j);
                            //add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateView, 400);
        return true;
    } else {
        return false;
    }
}

function moveDown() {
    if (canMoveDown(board)) {
        for (let i = 2; i >= 0; i--) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (let k = 3; k > i; k--) {
                        if (board[k][j] === 0 && noBlockV(j, i, k, board)) {
                            // move
                            move(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] === board[i][j] && noBlockV(j, i,
                                k, board)) {
                            //move
                            move(i, j, k, j);
                            //add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateView, 400);
        return true;
    } else {
        return false;
    }
}

function isGameOver() {
    if (!checkSpace(board) && !checkMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
    init();
}
