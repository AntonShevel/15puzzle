'use strict';

const blessed = require('blessed');

class Screen {
  /**
   * @param {string} title — terminal window title
   */
  constructor(title) {
    this.screen = blessed.screen({
      smartCSR: true
    });

    this.screen.title = title;
  }

  /**
   * @param {number} top
   * @param {number} left
   * @param {*} content
   * @returns {*}
   */
  createBox(top, left, content) {
    const contentString = content && typeof content.toString === 'function' ? content.toString() : '';

    const box = blessed.box({
      top,
      left,
      content: contentString,
      width: 5,
      height: 3,
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
    this.screen.append(box);

    return box;
  }

  /**
   * @param {number} top
   * @param {number} left
   * @param {string} content
   * @returns {*}
   */
  createText(top, left, content) {
    const text = blessed.text({
      top,
      left,
      content
    });
    this.screen.append(text);

    return text;
  }

  render() {
    this.screen.render();
  }

  onKey(...args) {
    this.screen.key(...args);
  }
}

module.exports = Screen;