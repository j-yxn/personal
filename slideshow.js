document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const easing = 0.05; 
  let startX = 0;
  let endX = 0;
  let raf;

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  function height() {
    const diff = this.innerWidth - this.innerHeight;
    document.body.style.height = `${track.clientWidth - diff}px`;
  }

  function update() {
    startX = lerp(startX, endX, easing);
    track.style.transform = `translateX(${-startX}px)`;
    raf = requestAnimationFrame(update);
    if (Math.abs(startX - endX) < 0.1) {
      cancelAnimationFrame(raf);
    }
  }

  function handleScroll(event) {
    event.preventDefault();
    const maxScroll = track.scrollWidth - window.innerWidth;
    endX = Math.max(0, Math.min(maxScroll, endX + event.deltaY * 70)); // Set limits to endX
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
    console.log('Wheel event detected:', event.deltaY);
  }

  window.addEventListener('wheel', handleScroll, { passive: false });
});
