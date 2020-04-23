'use strict';

class Board {
  /**
   * @param {object} screen — instance of Screen
   * @param {number} fieldSize
   */
  constructor(screen, fieldSize) {
    this.fieldSize = fieldSize;
    this.screen = screen;
    this.boxes = [];
    this.cursorIndex = 0;
  }

  /**
   * Render the board
   * @param {number[]} tiles
   */
  render(tiles) {
    this.boxes = tiles.map((tile, index) => {
      const row = Math.floor(index / this.fieldSize);
      const column = index - row * this.fieldSize;
      return this.screen.createBox(4 + row * 3, 2 + column * 5, tile);
    });

    this.boxes[0].focus();
    this.screen.render();
  }

  /**
   * Move the cursor
   * @param {'up' | 'down' | 'left' | 'right'} direction
   */
  moveCursor(direction) {
    switch (direction) {
      case 'up':
        this.cursorIndex = Math.max(this.cursorIndex - this.fieldSize, 0);
        break;
      case 'down':
        this.cursorIndex = Math.min(
          this.cursorIndex + this.fieldSize,
          this.fieldSize * this.fieldSize - 1
        );
        break;
      case 'left':
        this.cursorIndex = Math.max(this.cursorIndex - 1, 0);
        break;
      case 'right':
        this.cursorIndex = Math.min(
          this.cursorIndex + 1,
          this.fieldSize * this.fieldSize - 1
        );
        break;
      default:
        throw new Error('Unsupported cursor direction');
    }

    this.boxes[this.cursorIndex].focus();
  }

  /**
   * Swap two boxes
   * @param {number} key
   */
  swapBoxes(key) {
    const boxA = this.boxes[this.cursorIndex];
    const boxB = this.boxes[key];
    const textA = boxA.getText();
    const textB = boxB.getText();
    boxA.setText(textB);
    boxB.setText(textA);
    boxB.focus();
    this.cursorIndex = key;
  }
}

module.exports = Board;
