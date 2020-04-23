const {shuffle} = require('./helper');

class Game {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
    this.emptyIndex = 0;
    let numbers = Array.from(Array(fieldSize * fieldSize).keys());
    numbers[this.emptyIndex] = null;
    this.numbers = shuffle(numbers);
  }

  moveTile(index) {

  }
}