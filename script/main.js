var board = [];
var score = 0;

$(document).ready(function() {
    init();
})

function init() {
    // initialize the board
    initBoard();
    // generate random number
    randomNumGenerator();
    randomNumGenerator();
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

function randomNumGenerator() {
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
    } else {
        return false;
    }
}
