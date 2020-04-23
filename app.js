const Game = require('./modules/game');
const Screen = require('./modules/screen');
const Board = require('./modules/board');

const fieldSize = 4;
const screen = new Screen('15 Puzzle');
const board = new Board(screen, fieldSize);
const game = new Game(fieldSize);

const text = screen.createText(20, 1, 'Use arrows to move a cursor and space to move a tile');

game.start();
board.render(game.tiles);


// Quit on Escape, q, or Control-C.
screen.onKey(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0);
});

// Handle cursor events
screen.onKey(['up', 'down', 'left', 'right'], (ch, key) => {
  board.moveCursor(key.name);
});

// Handle space event — move tiles
screen.onKey('space', () => {
  const newCursor = game.moveTile(board.cursorIndex);
  if (newCursor !== board.cursorIndex) {
    board.swapBoxes(newCursor);
    if (game.isSolved()) {
      text.setContent('Well done!');
    } else {
      text.setContent('Nice move');
    }
  } else {
    text.setContent('Cannot move');
  }
  screen.render();
});
