export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  return 1; // All items will have the same scale
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
  // Calculate the shortest distance considering the carousel loop
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  const maxOpacity = 1;
  const minOpacity = 0.6;
  
  // Create a smoother opacity transition
  const opacityProgress = Math.pow(1 - (distance / halfTotal), 1.5);
  const opacity = minOpacity + (maxOpacity - minOpacity) * opacityProgress;
  
  return Math.max(minOpacity, opacity);
};
