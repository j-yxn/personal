const clock = document.querySelector('#work-clock');
workClock(clock)

function workClock(container) {
  let i;
  const dynamic = container.querySelector('.dynamic');
  const hourElement = container.querySelector('.hour');
  const minuteElement = container.querySelector('.minute');
  const secondElement = container.querySelector('.second');

  const div = function (className, innerHTML) {
    const element = document.createElement('div');
    element.className = className
    element.innerHTML = innerHTML || ''
    return element
  };

  const append = function (element) {
    return {
      to: function (parent) {
        parent.appendChild(element)
        return append(parent)
      }
    }
  };

  const anchor = function (element, rotation) {
    const anchor = div('anchor');
    rotate(anchor, rotation)
    append(element).to(anchor).to(dynamic)
  };

  const minute = function (n) {
    const category = n % 5 === 0 ? 'major' : n % 1 === 0 ? 'whole' : 'part';
    const line = div('element minute-line ' + category);
    anchor(line, n)
    if (n % 5 === 0) {
      const text = div('anchor minute-text ' + category);
      const content = div('expand content', (n < 10 ? '0' : '') + n);
      append(content).to(text)
      rotate(text, -n)
      anchor(text, n)
    }
  };

  const hour = function (n) {
    const category = 'hour-item hour-' + n;
    const line = div('element hour-pill ' + category);
    anchor(line, n * 5)
    const text = div('anchor hour-text ' + category)
    const content = div('expand content', n)
    append(content).to(text)
    rotate(text, -n * 5)
    anchor(text, n * 5)
  };

  const rotate = function(element, second) {
    element.style.transform = element.style.transform = 'rotate(' + (second * 6) + 'deg)'
  }

  const animate = function () {
    const current = new Date();
    const time = current.getHours() * 3600 + current.getMinutes() * 60 + current.getSeconds() + current.getMilliseconds() / 1000
    rotate(secondElement, time)
    rotate(minuteElement, time / 60)
    rotate(hourElement, time / 60 / 12)
    requestAnimationFrame(animate)
  };

  for (i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
    for (i = 1; i <= 12; i ++) hour(i)

  animate()
}

function autoResize(element, nativeSize) {
      const update = function() {
        const parent = element.offsetParent
        const scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize
        element.style.transform = element.style.transform = 'scale(' + scale.toFixed(9) + ')'
  }
  update()
  window.addEventListener('resize', update)
}

autoResize(clock, 2200)
