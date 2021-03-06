import _ from 'lodash';
import {Nod} from './nod.js';

// An array of each number 1..9
var ONE_TO_NINE = _.times(9).map((n) => n + 1);

export function correctSet(set) {
  return '' + _.orderBy(set) == '' + ONE_TO_NINE;
}

function full(set) {
  return _.compact(set).length === 9;
}

function emptyGrid() {
  return _.times(9).map(() => {
    return _.times(9).map((n) => null);
  });
}

export function transpose(grid) {
  var result = [];
  for(var i = 0; i < grid.length; i++) {
    for(var j = 0; j < grid[i].length; j++) {
      if(!result[j]) {
        result[j] = [];
      }
      result[j][i] = grid[i][j];
    }
  }
  return result;
}

export class Board {
  constructor(grid) {
    // make a deep copy of whatever grid was passed in...
    this.grid = _.map(grid || emptyGrid(), _.clone);
  }

  complete() {
    return _.every(this.rows(), full);
  }

  correct() {
    if (!this.complete()) {
      return false;
    }
    return _.every(this.rows(), correctSet) && _.every(this.cols(), correctSet);
  }

  rows() {
    return this.grid;
  }

  cols() {
    return transpose(this.grid);
  }

  // Array of values of a subsquare given coordinates of the top left corner
  squareAt(corner) {
    var [x, y] = corner;
    var result = [];
    for(var i = x; i < x + 3; i++) {
      for(var j = y; j < y + 3; j++) {
        result.push(this.grid[i][j]);
      }
    }
    return result;
  }

  set(pos, value) {
    var [x, y] = pos;
    this.grid[x][y] = value;
  }

  get(pos) {
    var [x, y] = pos;
    return this.grid[x][y];
  }

  generateNods() {
    var nods = [];
    for(var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        nods.push(new Nod(this, [i, j]));
      }
    }
    return nods;
  }

  numEmptySquares() {
    return _.countBy(_.flatten(this.grid))[null]
  }

  display() {
    var i = 0;
    _.each(this.grid, (row) => {
      var line = '|';
      var j = 1;
      _.each(row, (el) => {
        if (el === null) {
          line += '   ';
        } else {
          line += ' ' + el + ' ';
        }
        if (j % 3 === 0) {
          line += '|';
        }
        j += 1
      })
      if (i % 3 === 0) {
        console.log('  ---------------------------');
      }
      console.log(line);
      i++;
    });
  }
}
