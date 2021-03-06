//   **Sample board**
//  4 8 3 |9 2 1 |6 5 7
//  9 6 7 |3 4 5 |8 2 1
//  2 5 1 |8 7 6 |4 9 3
//  ------+------+------
//  5 4 8 |1 3 2 |9 7 6
//  7 2 9 |5 6 4 |1 3 8
//  1 3 6 |7 9 8 |2 4 5
//  ------+------+------
//  3 7 2 |6 8 9 |5 1 4
//  8 1 4 |2 5 3 |7 6 9
//  6 9 5 |4 1 7 |3 8 2

import _ from 'lodash';
import {correctSet, transpose, Board} from '../js/board.js';

var COMPLETE_BOARD = [
  [4, 8, 3, 9, 2, 1, 6, 5, 7],
  [9, 6, 7, 3, 4, 5, 8, 2, 1],
  [2, 5, 1, 8, 7, 6, 4, 9, 3],
  [5, 4, 8, 1, 3, 2, 9, 7, 6],
  [7, 2, 9, 5, 6, 4, 1, 3, 8],
  [1, 3, 6, 7, 9, 8, 2, 4, 5],
  [3, 7, 2, 6, 8, 9, 5, 1, 4],
  [8, 1, 4, 2, 5, 3, 7, 6, 9],
  [6, 9, 5, 4, 1, 7, 3, 8, 2]
];

describe('Utils', function() {
  it('transpose transposes things', function () {
    var transposed = transpose([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);
    expect(transposed).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]);
  });

  it('correctSet determines if all nums 1..9 are there', function() {
    var correct = correctSet([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(correct).toBe(true);
    var incorrect = correctSet([2, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(incorrect).toBe(false);
    var incorrect = correctSet([2, 3, 4, 5, 6, 7, 8, 9]);
    expect(incorrect).toBe(false);
  });
});

describe('Given a sodoku board', function () {
  it('correctly identifies correct boards', function() {
    var board = new Board(COMPLETE_BOARD);
    expect(board.correct()).toBe(true);
  });

  it('correctly identifies incorrect boards', function() {
    var board = new Board(COMPLETE_BOARD);
    board.set([0, 0], null);
    expect(board.correct()).toBe(false);
  });

  it('correctly identifies complete boards', function() {
    var board = new Board(COMPLETE_BOARD);
    expect(board.complete()).toBe(true);
  });

  it('knows when a board is incomplete', function() {
    var board = new Board([
      [4, 8, 3, 9, 2, 1, 6, 5, 7],
      [9, 6, 7, 3, 4, 5, 8, 2, 1],
      [2, 5, 1, 8, 7, 6, 4, 9, 3],
      [5, 4, 8, 1, 3, 2, 9, 7, 6],
      [7, 2, 9, 5, 6, 4, 1, 3, 8],
      [1, 3, 6, 7, 9, 8, 2, 4, 5],
      [3, 7, 2, 6, 8, 9, 5, 1, 4],
      [8, 1, 4, 2, 5, 3, 7, 6, null]
    ]);
    expect(board.complete()).toBe(false);
  });

  it('can return square given a corner', function() {
    var board = new Board(COMPLETE_BOARD);
    expect(board.squareAt([0, 0])).toEqual([4, 8, 3, 9, 6, 7, 2, 5, 1]);
    expect(board.squareAt([3, 3])).toEqual([1, 3, 2, 5, 6, 4, 7, 9, 8]);
  });
});
