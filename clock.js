const clock = document.querySelector('#work-clock');
workClock(clock);

/**
 * Sets up the clock with minute lines, hour markers, and animation.
 * @param {HTMLElement} container - The DOM element that holds the clock.
 */
function workClock(container) {
  let i;
  // Identify key elements within the container
  const dynamic = container.querySelector('.dynamic');
  const hourElement = container.querySelector('.hour');
  const minuteElement = container.querySelector('.minute');
  const secondElement = container.querySelector('.second');

  /**
   * Creates a new div element with optional text.
   * @param {string} className - The CSS class(es) for the element.
   * @param {string} [innerHTML] - Optional text or HTML content.
   * @returns {HTMLElement}
   */
  const div = function (className, innerHTML) {
    const element = document.createElement('div');
    element.className = className;
    element.innerHTML = innerHTML || '';
    return element;
  };

  /**
   * Appends one element to another, returning an object
   * that allows chaining with 'to' for nested appends.
   * @param {HTMLElement} element - The element to append.
   * @returns {Object}
   */
  const append = function (element) {
    return {
      to: function (parent) {
        parent.appendChild(element);
        return append(parent);
      }
    };
  };

  /**
   * Applies a rotation transform based on the given value.
   * @param {HTMLElement} element - The element to transform.
   * @param {number} second - A numeric value converted into rotation degrees.
   */
  const rotate = function(element, second) {
    element.style.transform = 'rotate(' + (second * 6) + 'deg)';
  };

   /**
   * Creates an 'anchor' wrapper, rotates it, and appends it
   * as well as the given element to the clock's 'dynamic' container.
   * @param {HTMLElement} element - The element to anchor.
   * @param {number} rotation - Rotation value for positioning.
   */
  const anchor = function (element, rotation) {
    const anchor = div('anchor');
    rotate(anchor, rotation);
    append(element).to(anchor).to(dynamic);
  };

  /**
   * Draws minute lines around the clock and places minute text
   * where appropriate (every 5 minutes).
   * @param {number} n - The minute marker to create.
   */
  const minute = function (n) {
    const category = n % 5 === 0 ? 'major' : n % 1 === 0 ? 'whole' : 'part';
    const line = div('element minute-line ' + category);
    anchor(line, n);
    if (n % 5 === 0) {
      const text = div('anchor minute-text ' + category);
      rotate(text, -n);
      anchor(text, n);
    }
  };

  /**
   * Draws hour markers and hour text around the clock.
   * @param {number} n - The hour marker to create.
   */
  const hour = function (n) {
    const category = 'hour-item hour-' + n;
    const text = div('anchor hour-text ' + category);
    rotate(text, -n * 5);
    anchor(text, n * 5);
  };

  /**
   * Updates the clock hands continuously based on the current time.
   */
  const animate = function () {
    const current = new Date();
    const time = current.getHours() * 3600 + current.getMinutes() * 60 + current.getSeconds() + current.getMilliseconds() / 1000;
    rotate(secondElement, time);
    rotate(minuteElement, time / 60);
    rotate(hourElement, time / 60 / 12);
    requestAnimationFrame(animate);
  };

  // Draw minute lines in increments of 15 seconds (1/4 minute)
  for (i = 1 / 4; i <= 60; i += 1 / 4) {
    minute(i);
  }
  // Draw hour markers for a 12-hour clock
  for (i = 1; i <= 12; i++) {
    hour(i);
  }
  animate();
}

/**
 * Automatically scales the clock to fit its container.
 * @param {HTMLElement} element - The element to scale.
 * @param {number} nativeSize - The original size used for calculating scale.
 */
function autoResize(element, nativeSize) {
  const update = function() {
    const parent = element.offsetParent;
    const scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize;
    element.style.transform = 'scale(' + scale.toFixed(9) + ')';
  };
  update();
  window.addEventListener('resize', update);
}

autoResize(clock, 2200);
