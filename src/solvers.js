/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //I : n(matrix size)
  //O : returns a single solution to the n-rook problem

  //create new board instaance usuing n x n
  // var solution = new Board({n: n}); //fixme
  // console.log('solution', solution);
  //if n=4 , put 4 rooks on the board with toggle methods
  //to use toggle methods row index, col index
  //start row index, col index 0
  // var rowIndex = 0;
  // var colIndex = 0;

  //toggle piece
  //if it does NOT have conflict, toggle piece
  //otherwise
  //move or iterate to next spot
  //recurse
  // for (var i = 0; i < n; i++) {
  //   solution.togglePiece(rowIndex, colIndex);
  // }

  // if (!hasAnyRooksConflicts()) {
  //   solution.togglePiece(rowIndex, colIndex);
  // } else {
  //   for (var i = rowIndex; i < n; i++) {

  //   }
  // }


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  var solution = new Board({'n': n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
