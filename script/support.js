function getTop(i) {
    return (20 + 120 * i);
}

function getLeft(j) {
    return (20 + 120 * j);
}

function setNumCellBgColor(num) {
    switch (num) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#99cc00";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#0099cc";
        case 4096:
            return "#aa66cc";
        case 8192:
            return "#9933cc";
    }

    return "black";
}

function setNumCellColor(num) {
    if (num <= 4) {
        return "#776e56";
    }

    return "white";
}

function checkSpace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return true;
            }
        }
    }

    return false;
}
