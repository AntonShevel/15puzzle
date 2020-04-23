'use strict';

const helper = require('./helper');

describe('Helper module', () => {
  describe('#shuffle', () => {
    test('it returns array', () => {
      expect(helper.shuffle([])).toStrictEqual([]);
    });

    test('it returns array with the same items', () => {
      const initialArray = [1, 2, 3, 4];
      const shuffledArray = helper.shuffle(initialArray).sort();
      expect(shuffledArray).toStrictEqual(initialArray);
    });
  });
});