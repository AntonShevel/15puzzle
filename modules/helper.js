/**
 * Swap two elements of array
 * @param array
 * @param keyA
 * @param keyB
 * @returns {*}
 */
function swap(array, keyA, keyB) {
  [array[keyA], array[keyB]] = [array[keyB], array[keyA]];

  return array;
}

/**
 * Shuffle array items
 * @param array
 * @returns {*[]}
 */
function shuffle(array) {
  const newArray = [...array];
  newArray.forEach((number, index, numbers) => {
    const randomIndex = Math.floor(Math.random() * (numbers.length - index));
    swap(numbers, index, randomIndex);
  });

  return newArray;
}

module.exports = {
  swap,
  shuffle,
};
