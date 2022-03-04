// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() { // all rows on boards
      return _(_.range(this.get('n'))).map(function(rowIndex) { // range 0-n
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //loop to find the element has '1'
      //Input : an array [0,0,0,1,0]
      //O : boolean
      var counter = 0;

      // console.log(rowIndex);
      // console.log(this.get(n));
      var row = this.get(rowIndex);

      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //entire board
      //get n value
      var n = this.get('n');
      for ( var i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var counter = 0;
      // console.log(rowIndex);
      // console.log(this.get(n));
      var n = this.get('n');

      for (var i = 0; i < n; i++) {
        var row = this.get(i);
        if (row[colIndex] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {

      // column
      // board[n][0]
      var n = this.get('n');

      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //one single diagonal line
      //i : one number range - (n -1) ~ (n -1)
      var n = this.get('n');
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      //check input is negative or positive or 0
      //if input positive
      //loop [i,j]
      var counter = 0;
      //assume input is 0
      //if input 0
      //check 00, 11, 22 ........ n-1n-1
      if (colIndex >= 0) {
        for (var i = 0; i < n; i++) {
          var row = this.get(i); //[1, 0, 0, 0]
          if (row[i] === 1) { // 00, 11, 22....12, 23, 34
            counter++;
          }
        }
      }
      //input is negataive
      //convert input to positive
      if (colIndex < 0) {
        var positiveinput = Math.abs(colIndex);
        for (var i = positiveinput; i < n; i++) {
          var row = this.get(i);
          var j = i - positiveinput;
          if (row[j] === 1) {
            counter++;
          }
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //entrie board
      var n = this.get('n');

      for ( var i = 1 - n; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      // i goes up  // j goes dow
      // if input is 0, positive
      // loop
      //input: n =4, column index =  0, i
      if (colIndex >= 0) {
        for (var i = 0; i < n; i++, colIndex--) {
          var row = this.get(i); //[1, 0, 0, 0]
          // if (row[n - i - 1] === 1) { // 03, 12, 21, 30.... n = 4 i = 0 -> row[3] n = 4 i = 1 -> row [2]
          // console.log('colIndex  ', colIndex);
          // conosle.log('rowIndex  ', i);
          if (row[colIndex] === 1) {
            counter++;
          }
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    //if negative - 02, 11, 20
    //input n = 4
    //col index  = -1
    //1,3/ 2,2/ 3,1
    //0,2/ 1, 1 / 2,0
    // if (colIndex < 0) { //if minorDiagonalColumnIndexAtFirstRow = -3
    //   // var positiveinput = Math.abs(colIndex); //positiveinput = 1
    //   var positiveinput = Math.abs(colIndex); //positiveinput = 3

    //   var j = n - positiveinput - 1; // 2 //1 //0
    //   for (var i = 0; i < n; i++) {
    //     var row = this.get(i); //[1, 0, 0, 0]
    //     if (row[j] === 1) { // 02 11 20 //01 10 //00
    //       counter++;
    //     }
    //     j --;
    //   }

    // }

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');

      for ( var i = (n * 2); i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
