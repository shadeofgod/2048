var board = [];
var score = 0;

$(document).ready(function(){
    init();
})

function init() {
    // initialize the board
    initBoard();
}

function initBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var $gridCell = $("#grid-cell-" + i + "-" + j);
            $gridCell.css("top", getTop(i));
            $gridCell.css("left", getLeft(j));
        }
    }
}
