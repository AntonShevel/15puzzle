'use strict';

const {shuffle, swap} = require('./helper');

class Game {
  /**
   * @param {number} fieldSize
   */
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
    this.tiles = [];
    this.emptyIndex = 0;
  }

  /**
   * Shuffle tiles
   */
  start() {
    this.tiles = [null];
    let number = 1;
    for(number; number < (this.fieldSize * this.fieldSize); number++) {
      this.tiles.push(number)
    }
    this.tiles = shuffle(this.tiles);
    this.emptyIndex = this.tiles.indexOf(null);
  }

  /**
   * Return new index if tile is moved
   * @param {number} cursorIndex
   * @returns {number}
   */
  moveTile(cursorIndex) {
    const possibleMoves = [
      cursorIndex + 1,
      cursorIndex - 1,
      cursorIndex + this.fieldSize,
      cursorIndex - this.fieldSize
    ];
    console.log('possible moves from', cursorIndex, 'are: ', possibleMoves, 'valid: ', this.emptyIndex);
    if (possibleMoves.includes(this.emptyIndex)) {
      swap(this.tiles, cursorIndex, this.emptyIndex);
      return this.emptyIndex;
    }

    return  cursorIndex;
  }

  /**
   * Check if the puzzle is solved
   * @returns {boolean}
   */
  isSolved() {
    const first = this.tiles[0];
    const last = this.tiles[this.tiles.length - 1];
    const offset = first ? 0 : 1;
    if (first && last) {
      return false; // a solved puzzle has first or last empty element
    }
    let key = offset;
    for (key; key < (this.tiles.length - 1 - offset); key++) {
      if (this.tiles[key] !== key) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Game;