export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  return 1; // All items will have the same scale
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
  // Calculate the shortest distance considering the carousel loop
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  // Adjust for carousel loop
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Define opacity values
  const maxOpacity = 1;
  const minOpacity = 0.3; // Increased minimum opacity for better visibility
  
  // Create a sharper opacity transition curve
  const opacityProgress = Math.pow(1 - (distance / 2), 2);
  const opacity = minOpacity + (maxOpacity - minOpacity) * opacityProgress;
  
  return Math.max(minOpacity, Math.min(maxOpacity, opacity));
};