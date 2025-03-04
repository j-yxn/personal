document.addEventListener('DOMContentLoaded', () => {
  const pick = document.querySelector('.slider-independent');
  const smoothing = 0.04; // Determines the speed of the smoothing effect (0 < val < 1)
  let startX = 0; // The current scroll (or translateX) position of the slider
  let endX = 0; // The target scroll position
  let raf; // Reference to the requestAnimationFrame instance (used for smooth animations)

  // A linear interpolation function (lerp) used to calculate the position of the slider
  const lin = (start, end, t) => start * (1 - t) + end * t;

  // A function to update the slider's position and animate it smoothly towards the target position
  function update() {
    startX = lin(startX, endX, smoothing); // Gradually move startX toward endX
    pick.style.transform = `translateX(${-startX}px)`; // Apply the horizontal translation to the slider
    raf = requestAnimationFrame(update);  // Call update for smooth animations
    // Stop the animation when the slider is close enough to the target position
    if (Math.abs(startX - endX) < 0.1) {
      cancelAnimationFrame(raf); // Cancel the animation frame as it has reached target position
    }
  }

  // A function to track the `wheel` (scroll) event to calculate the target scroll position
  function trackScroll(event) {
    event.preventDefault(); // "Turns off" default scrolling behavior to apply custom functionality
    const maxScroll = pick.scrollWidth - window.innerWidth; // Calculate the maximum scrollable distance
    endX = Math.max(0, Math.min(maxScroll, endX + event.deltaY * 70)); // Update target position with limits
    cancelAnimationFrame(raf); // Cancel any ongoing `update` calls to avoid conflicts
    raf = requestAnimationFrame(update); // Start a new animation frame for the updated position
    // console.log('Wheel event detected:', event.deltaY); // Debugging purposes, logs scroll movement
  }

  window.addEventListener('wheel', trackScroll, { passive: false });
});
