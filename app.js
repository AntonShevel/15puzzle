const blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = '15puzzle';

const text = blessed.text({
  left: 30,
  content: 'Press space to move a tile'
});
screen.append(text);

function createBox(top, left, content) {
  return blessed.box({
    top,
    left,
    width: 5,
    height: 3,
    content,
    align: 'center',
    tags: false,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      border: {
        fg: 'white'
      },
      focus: {
        border: {
          fg: 'green'
        },
      }
    }
  });
}

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

const fieldSize = 4;
let numbers = Array.from(Array(fieldSize * fieldSize).keys());
let emptyIndex = 0;
numbers[emptyIndex] = null;

// while(0 !== index) {
//   let randomIndex = Math.floor(Math.random() * index);
//   index -= 1;
//   [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
// }

// shuffle the array
numbers.forEach((number, index, numbers) => {
  let randomIndex = Math.floor(Math.random() * (numbers.length - index));
  // TODO create swap function
  [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
});

let boxes = numbers
  .map((number, index) => {
    const row = Math.floor(index / fieldSize);
    const column = index - row * fieldSize;
    console.log(index , row, fieldSize);
    // TODO move side effect elsewhere
    if (!number) {
      emptyIndex = index;
    }
    // TODO come up with a better way to determine empty tile
    return createBox(10 + row * 3, 30 + column * 5, number ? number.toString() : '');
  });

boxes.forEach((box) => screen.append(box));

// Render the screen.
screen.render();

let cursor = 0;
boxes[0].focus();

screen.key(['up', 'down', 'left', 'right'], (ch, key) => {
  switch (key.name) {
    case 'up':
      cursor = Math.max(cursor - fieldSize, 0);
      break;
    case 'down':
      cursor = Math.min(cursor + fieldSize, fieldSize * fieldSize - 1);
      break;
    case 'left':
      cursor = Math.max(cursor - 1, 0);
      break;
    case 'right':
      cursor = Math.min(cursor + 1, fieldSize * fieldSize - 1);
      break;
  }
  boxes[cursor].focus();
});

screen.key('space', () => {
  // console.log('cursor', cursor, 'empty index', emptyIndex);
  // console.log('can move to', [cursor + 1, cursor - 1, cursor + fieldSize, cursor - fieldSize]);
  if ([cursor + 1, cursor - 1, cursor + fieldSize, cursor - fieldSize].includes(emptyIndex)) {
    boxes[cursor].setContent('');
    boxes[emptyIndex].setContent(numbers[cursor].toString());
    boxes[emptyIndex].focus();
    [numbers[cursor], numbers[emptyIndex]] = [numbers[emptyIndex], numbers[cursor]];
    [cursor, emptyIndex] = [emptyIndex, cursor];
    console.log('new cursor', cursor, 'new empty index', emptyIndex);
    if (isPuzzleSolved(numbers)) {
      console.log('solved!');
      text.setContent('Well done!');
    }
  } else {
    text.setContent('Cannot move');
  }
  screen.render();
});

function isPuzzleSolved(numbers) {
  const first = numbers[0];
  const last = numbers[numbers.length - 1];
  const offset = first ? 0 : 1;
  console.log(first, last, offset);
  if (first && last) {
    console.log('false 1');
    // first or last element must be empty
    return false;
  }
  let key = offset;
  for (key; key < (numbers.length - 1 - offset); key++) {
    if (numbers[key] !== key) {
      return false;
    }
  }
  return true;
  // const res = numbers.every((number, index) => {
  //   if (number === first || number === last) {
  //     return true;
  //   }
  //   return number === (index + offset)
  // });
  // console.log(res, '2');
  // return res;
}

// setTimeout(() => {
//   box1.setContent('z');
//   screen.render();
// }, 500);

console.log(numbers);