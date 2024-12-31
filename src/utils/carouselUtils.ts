export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  // Calculate the shortest distance considering the carousel loop
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  // Adjust for carousel loop
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Define scale values
  const centerScale = 1.2;  // Scale for centered item
  const sideScale = 0.85;   // Scale for side items
  
  // Create a smoother transition curve using exponential scaling
  const transitionProgress = Math.pow(1 - (distance / halfTotal), 2);
  const scale = sideScale + (centerScale - sideScale) * transitionProgress;
  
  return Math.max(sideScale, Math.min(centerScale, scale));
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
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