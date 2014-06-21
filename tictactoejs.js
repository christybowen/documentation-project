/**
 * Javascript for Tic Tac Toe game
 */

var playerTurn = true;
var tempboard = new Array(9);
var has_won = false;
var countrow0 = 0;
var countrow1 = 0;
var countrow2 = 0;
var countcol0 = 0;
var countcol1 = 0;
var countcol2 = 0;
var countdiag1 = 0;
var countdiag2 = 0;

// 
// This function builds the table via code, instead of having the HTML
// file contain it.
// It also ties the Javascript functions to the appropriate buttons
//
$(function () {
    // Add the 9 buttons to the gameboard
    var board = "<table>";
    for (var r = 0; r < 3; r++) {
        var row = "<tr>";
        for (var c = 0; c < 3; c++) {
            row += "<td><input type='button' value =''/></td>";
        }
        row += "</tr>";
        board += row;
    }
    board += " <tr> <td colspan=3><hr/></td> \
               </tr>";

    board += "</table>";
    $(".gameboard").append(board);

    // Tie the randomize button to the randomize() function
    $("[value='Restart']").click(restart);

    // Tie the gameboard buttons to the play function
    $(".gameboard input").click(function () {
        play(this);
    });

    $(".message").append("<div id='new'> <p> You are X's. You start! </p> </div>");
});


//Called when one of the 9 gameboard buttons is clicked.
function play(button) {

    // Figure out the row and column of the button
    var td = $(button).parent();
    var col = td.parent().children().index(td);
    var row = td.parent().parent().children().index(td.parent());

    if (playerTurn) {
        if ($(button).attr("value") == '') {
            // player selected this square to occupy
            $(button).attr("value", "X");
            tempboard[(row * 3 + col)] = "X";
            reset_counts();
            check_counts("X");
            if (has_won) {
                var play_again = confirm("You have won the game!");
                if (play_again) {
                    restart();
                    return;
                } else return;
            }
            playerTurn = false;
            $("#new").remove();
            setTimeout(computerMove(), 100000);
            reset_counts();
            check_counts("O");
            if (has_won) {
                var play_again = confirm("Sorry, you lose! \n Would you like to play again?");
                if (play_again) {
                    restart();
                    return;
                } else return;
            }
            reset_counts();
        }
    }
}

/*
 * Function to start a new game
 */
function restart() {
    // clear all the buttons
    for (var row = 0; row < 9; row++) {
        clear(row);
        tempboard[row] = "";

    }
    playerTurn = true;
    $("#new").remove();
    $(".message").append("<div id='new'><p>  You are X's. You start! </p></div>");
}

/*
 * Function to control the computers moves
 */
function computerMove() {
    var midButton = $(".gameboard input").get(4);
    var made_move = false;

    reset_counts();

    // check if middle space is taken, if not take it
    if (tempboard[4] != "X" && tempboard[4] != "O") {
        tempboard[4] = "O";
        $(midButton).attr("value", "O");
        made_move = true;
    } else {
        made_move = check_win(); // check to see if we can win with this move
        reset_counts();
        if (!made_move) {
            made_move = check_block(); // if we couldn't win, see if we can block
            reset_counts();
        }
        if (!made_move) {
            made_move = take_any(); // if no win and no block, pick a square
        }
    }

    playerTurn = true;
    $(".message").append("<div id='new'><p> Your turn </p></div>");
}

/*
 * Function to check if the computer can make a move to block the player from winning the game
 */
function check_block() {
    var moved = false;
    reset_counts();
    check_counts("X");

    if (countdiag1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + i);
        }
    }
    if (countdiag2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 2 + 2);
        }
    }
    if (countrow0 == 2) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i);
        }
    }
    if (countrow1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(3 + i);
        }
    }
    if (countrow2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(6 + i);
        }
    }
    if (countcol0 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3);
        }
    }
    if (countcol1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + 1);
        }
    }
    if (countcol2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + 2);
        }
    }
    return moved;
}

/*
 * Function to check if the computer can make a move to win the game
 */
function check_win() {
    var moved = false;
    check_counts("O"); //gets the counts of O's to see if can win

    if (countdiag1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + i);
        }
    }
    if (countdiag2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 2 + 2);
        }
    }

    if (countcol0 == 2) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3);
        }
    }
    if (countcol1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + 1);
        }
    }
    if (countcol2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i * 3 + 2);
        }
    }
    if (countrow0 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(i);
        }
    }
    if (countrow1 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(3 + i);
        }
    }
    if (countrow2 == 2 && !moved) {
        for (i = 0; i < 3; i++) {
            moved = take_space(6 + i);
        }
    }
    return moved;
}

/* 
 * Function that will take any space if the computer cannot win or block
 */
function take_any() {
    // take first corner space available
    for (var i = 0; i < 9; i += 2) {
        if (tempboard[i] != "X" && tempboard[i] != "O") {
            midButton = $(".gameboard input").get(i);
            tempboard[i] = "O";
            $(midButton).attr("value", "O");
            return true;
        }
    }
    // if no corner spaces available, take one of the other spaces
    for (i = 1; i < 9; i += 2) {
        if (tempboard[i] != "X" && tempboard[i] != "O") {
            midButton = $(".gameboard input").get(i);
            tempboard[i] = "O";
            $(midButton).attr("value", "O");
            return true;
        }
    }
}
/* 
 * Function that takes the selected space
 */
function take_space(x) {
    if (tempboard[x] != "X" && tempboard[x] != "O") {
        midButton = $(".gameboard input").get(x);
        tempboard[x] = "O";
        $(midButton).attr("value", "O");
        return true;
    } else return false;
}

/*
 * Function to count the number of X's or O's in each row, column, and diagonal
 */
function check_counts(p) {
    //checks the rows and columns for the number of X's or O's
    for (var i = 0; i < 3; i++) {
        if (tempboard[(0 + i)] == p) {
            countrow0++;
        }
        if (tempboard[(3 + i)] == p) {
            countrow1++;
        }
        if (tempboard[(6 + i)] == p) {
            countrow2++;
        }
        if (tempboard[(i * 3 + 0)] == p) {
            countcol0++;
        }
        if (tempboard[(i * 3 + 1)] == p) {
            countcol1++;
        }
        if (tempboard[(i * 3 + 2)] == p) {
            countcol2++;
        }
    }
    //checks the diagonals for the number of X's or O's
    if (tempboard[0] == p) {
        countdiag1++;
    }
    if (tempboard[4] == p) {
        countdiag1++;
        countdiag2++;
    }
    if (tempboard[8] == p) {
        countdiag1++;
    }
    if (tempboard[2] == p) {
        countdiag2++;
    }
    if (tempboard[6] == p) {
        countdiag2++;
    }

    // if a row, column or diagonal has 3 X's or O's, we have a winner!
    if (countrow0 == 3 || countrow1 == 3 || countrow2 == 3 || countcol0 == 3 || countcol1 == 3 || countcol2 == 3 || countdiag1 == 3 || countdiag2 == 3) has_won = true;
}

/*
 * Empties the button at the specified index
 */
function clear(r) {
    if (r >= 0 && r < 9) {
        var button = $(".gameboard input").get(r);
        $(button).attr("value", "");
    }
}
/*
 * Function to reset the counts of the rows, columns, and diagonals
 */
function reset_counts() {
    countrow0 = 0;
    countrow1 = 0;
    countrow2 = 0;
    countcol0 = 0;
    countcol1 = 0;
    countcol2 = 0;
    countdiag1 = 0;
    countdiag2 = 0;
}