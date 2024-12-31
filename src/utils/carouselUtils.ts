export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  // Calculate the shortest distance considering the carousel loop
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  // Adjust for carousel loop
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Create a more pronounced scale difference
  // Center item (distance = 0) will be at scale 1.2
  // Other items will scale down to 0.8
  const maxScale = 1.2;
  const minScale = 0.8;
  const scaleRange = maxScale - minScale;
  
  // Calculate scale based on distance
  // When distance is 0, scale will be maxScale
  // As distance increases, scale decreases linearly
  const scale = maxScale - (distance * (scaleRange / halfTotal));
  
  // Ensure scale doesn't go below minScale
  return Math.max(minScale, scale);
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
  let distance = Math.abs(currentSlide - index);
  const halfTotal = Math.floor(totalSlides / 2);
  
  if (distance > halfTotal) {
    distance = totalSlides - distance;
  }
  
  // Create a more pronounced opacity difference
  const maxOpacity = 1;
  const minOpacity = 0.5;
  const opacityRange = maxOpacity - minOpacity;
  
  // Calculate opacity based on distance
  const opacity = maxOpacity - (distance * (opacityRange / halfTotal));
  
  // Ensure opacity doesn't go below minOpacity
  return Math.max(minOpacity, opacity);
};
