export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  // Calculate the shortest distance considering the carousel loop
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  // Adjust for carousel loop
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Create a smooth scale transition
  // 1 = full size (center), 0.8 = minimum size (sides)
  const scale = 1 - (distance * 0.1);
  return Math.max(0.8, scale);
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Smooth opacity transition
  return 1 - (distance * 0.2);
};