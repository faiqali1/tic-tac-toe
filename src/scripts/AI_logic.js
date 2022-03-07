
function checkWin(WinChar, list) {
    function checkLine(x, y, z) {
        return list[x] == WinChar && list[y] == WinChar && list[z] == WinChar;
    }
    return (checkLine(0, 3, 6) ||
        checkLine(1, 4, 7) ||
        checkLine(2, 5, 8) ||
        checkLine(0, 1, 2) ||
        checkLine(3, 4, 5) ||
        checkLine(6, 7, 8) ||
        checkLine(0, 4, 8) ||
        checkLine(2, 4, 6));
}
function movesLeft(list) {
    if (list.includes(""))
        return true;
    else
        return false;
}
function evaluate(list) {
    if (checkWin("X", list))
        return -10;
    // player wins
    else if (checkWin("O", list))
        return +10;
    // computer wins
    else
        return 0; // in progress
}
function minMax(list, depth, isMax) {
    var score = evaluate(list);
    if (score == 10)
        return score;
    if (score == -10)
        return score;
    if (movesLeft(list) == false)
        return 0;
    if (isMax) {
        var best = -1000;
        for (var i = 0; i < list.length; i++) {
            // ** try with my own temp list
            if (list[i] == "") {
                // is blank
                list[i] = "O";
                best = Math.max(best, minMax(list, depth + 1, !isMax));
                list[i] = ""; // add the leave it empty again
            }
        }
        return best;
    }
    else {
        var best = 1000;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == "") {
                list[i] = "X";
                best = Math.min(best, minMax(list, depth + 1, !isMax));
                list[i] = ""; // undo the move
            }
        }
        return best;
    }
}
export default function bestMove(list) {
    var bestVal = -1000;
    var bestMove = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == "") {
            list[i] = "O";
            var movVal = minMax(list, 0, false);
            list[i] = ""; // reset the board
            if (movVal > bestVal) {
                bestMove = i;
                bestVal = movVal;
            }
        }
    }
    console.log("the value of the best move is : " + bestVal);
    console.log("");
    return bestMove;
}

