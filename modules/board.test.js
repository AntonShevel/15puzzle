'use strict';

const Board = require('./board');
jest.mock('./screen');
const Screen = require('./screen');

beforeEach(() => {
  Screen.mockClear();
});

describe('Board class', () => {
  describe('#constructor', () => {
    test('it stores screen and fieldSize', () => {
      const board = new Board({}, 12);
      expect(board.screen).toStrictEqual({});
      expect(board.fieldSize).toBe(12);
    });
  });

  describe('#render', () => {
    let board, screen;
    beforeEach(() => {
      screen = new Screen('test');
      screen.createBox.mockReturnValue({ focus: jest.fn() });
      board = new Board(screen, 2);
    });

    test('it creates four boxes', () => {
      board.render([null, 1, 2, 3]);
      expect(board.boxes).toHaveLength(4);
    });
    test('it calls createBox four times', () => {
      board.render([null, 1, 2, 3]);
      expect(screen.createBox.mock.calls).toHaveLength(4);
    });
  });

  describe('#moveCursor', () => {
    let board;
    beforeEach(() => {
      const screen = new Screen('test');
      screen.createBox.mockReturnValue({ focus: () => {} });
      board = new Board(screen, 2);
      board.render([null, 1, 2, 3]);
    });

    test('it throws error on unsupported direction', () => {
      expect(() => {
        board.moveCursor('somewhere');
      }).toThrow();
    });

    test('it moves cursor down', () => {
      expect(board.cursorIndex).toBe(0);
      board.moveCursor('down');
      expect(board.cursorIndex).toBe(2);
    });

    test('it moves cursor right', () => {
      expect(board.cursorIndex).toBe(0);
      board.moveCursor('right');
      expect(board.cursorIndex).toBe(1);
    });

    test('it moves cursor left', () => {
      board.moveCursor('right');
      expect(board.cursorIndex).toBe(1);
      board.moveCursor('left');
      expect(board.cursorIndex).toBe(0);
    });

    test('it moves cursor up', () => {
      board.moveCursor('down');
      expect(board.cursorIndex).toBe(2);
      board.moveCursor('up');
      expect(board.cursorIndex).toBe(0);
    });
  });

  describe('#swapBoxes', () => {
    let board;
    beforeEach(() => {
      const screen = new Screen('test');
      screen.createBox.mockImplementation((top, left, content) => {
        return {
          text: content,
          focus: () => {},
          getText: function () {
            return this.text;
          },
          setText: function (text) {
            this.text = text;
          },
        };
      });
      board = new Board(screen, 2);
      board.render([null, 1, 2, 3]);
    });

    test('it swaps box under cursor with a given one', () => {
      const boxA = board.boxes[0];
      const boxB = board.boxes[1];
      expect(boxA.text).toBe(null);
      expect(boxB.text).toBe(1);
      board.swapBoxes(1);
      expect(boxA.text).toBe(1);
      expect(boxB.text).toBe(null);
    });

    test('it moves cursor', () => {
      board.swapBoxes(1);
      expect(board.cursorIndex).toBe(1);
    });
  });
});

// test('it is object', () => {
// //   expect(typeof Board).toBe('function');
// // });
