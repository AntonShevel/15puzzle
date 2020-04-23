'use strict';

const Game = require('./game');

describe('Game class', () => {
  describe('#constructor', () => {
    test('it stores fieldSize', () => {
      const game = new Game(3);
      expect(game.fieldSize).toBe(3);
    });
  });

  describe('#start', () => {
    let game;
    beforeEach(() => {
      game = new Game(3);
      game.start();
    });

    test('it creates tiles based on fieldSize', () => {
      expect(game.tiles).toHaveLength(3 * 3);
    });

    test('it has tiles from 1 to 8 including null for empty tile', () => {
      expect(game.tiles.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, null]);
    });
  });

  describe('#moveTile', () => {
    let game;
    beforeEach(() => {
      game = new Game(2);
      game.start();
      game.tiles = [null, 1, 2, 3];
      game.emptyIndex = 0;
    });

    test('it returns same index if tile cannot move', () => {
      expect(game.moveTile(3)).toBe(3);
      expect(game.emptyIndex).toBe(0);
    });

    test('it returns a new index when tile was moved', () => {
      expect(game.moveTile(2)).toBe(0);
      expect(game.emptyIndex).toBe(2);
    });
  });

  describe('#isSolved', () => {
    let game;
    beforeEach(() => {
      game = new Game(2);
      game.start();
    });

    test('it returns true when tiles are sorted', () => {
      game.tiles = [null, 1, 2, 3];
      game.emptyIndex = 0;
      expect(game.isSolved()).toBe(true);
      game.tiles = [1, 2, 3, null];
      game.emptyIndex = 3;
      expect(game.isSolved()).toBe(true);
    });

    test('it returns false when tiles are not sorted', () => {
      game.tiles = [null, 2, 1, 3];
      game.emptyIndex = 0;
      expect(game.isSolved()).toBe(false);
      game.tiles = [1, 2, null, 3];
      game.emptyIndex = 2;
      expect(game.isSolved()).toBe(false);
    });
  });
});