import _ from 'lodash';

export class Solve {
  constructor(board) {
    this.board = board;
  }

  pass() {
    var nods = this.board.generateNods();
    _.each(nods, (nod) => {
      if(nod.knownValue() && !this.board.get(nod.pos)) {
        this.board.set(nod.pos, nod.knownValue());
      }
    });
  }
}
