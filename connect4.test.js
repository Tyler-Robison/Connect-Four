describe('Check for tie', function () {
    it('should check for tie (false)', function () {
        expect(checkForTie()).toEqual(false);
    });

    it('should check for tie (true)', function () {
        board[0] = [1, 2, 1, 2, 1, 2, 1];
        expect(checkForTie()).toEqual(true);
        board[0] = [null, null, null, null, null, null, null];
    });

})

describe('Check for win', function(){
    it('Should check for p1 win.', function() {
        board[5] = [null, 1, 1, 1, 1, 2, null];
        expect(checkForWin()).toEqual(true);
        board[5] = [null, null, null, null, null, null, null];
    });

    it('Should check for p2 win.', function() {
        board[5] = [null, 2, 2, 2, 2, 1, null];
        expect(checkForWin()).toEqual(true);
        board[5] = [null, null, null, null, null, null, null];
    })
})

describe('makeBoard Tests', function () {
    it('should make a board of the correct size and composition', function () {
        board2 = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ]
        expect(makeBoard(7, 6)).toEqual(board2);
    });

    it('HTML table is correct size and composition', function () {
        makeHtmlBoard(7, 6);
        const table = document.querySelector('#board');
        const arr = Array.from(table.rows);
        expect(arr.length).toEqual(7);
    });
})



// it('handle click', function() {

//     handleClick(evt){
//         evt.target.id === 0
//     }
// })


