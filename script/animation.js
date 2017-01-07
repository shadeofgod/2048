function renderNum(x, y, num) {
    var $numCell = $("#num-cell-" + x + "-" + y);
    $numCell.css({
            "background-color": setNumCellBgColor(num),
            "color": setNumCellColor(num)
        })
        .text(num)
        .animate({
            "width": "100px",
            "height": "100px",
            "top": getTop(x),
            "left": getLeft(y)
        }, 50);
}
