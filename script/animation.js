function renderNum(x, y, num) {
    var $numCell = $("#num-cell-" + x + "-" + y);
    $numCell.css({
            "background-color": setNumCellBgColor(num),
            "color": setNumCellColor(num)
        })
        .text(num)
        .animate({
            "width": cellSideLength,
            "height": cellSideLength,
            "top": getTop(x),
            "left": getLeft(y)
        }, 200);
}

function move(fromX, fromY, toX, toY) {
    var $numCell = $("#num-cell-" + fromX + "-" + fromY);
    $numCell.animate({
        "top": getTop(toX),
        "left": getLeft(toY)
    }, 400);
}

function updateScore(score) {
    $("#score").text(score);
}
