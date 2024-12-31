export const getScaleValue = (currentSlide: number, index: number, totalSlides: number) => {
  const center = Math.floor(totalSlides / 2);
  const distance = Math.abs((currentSlide + center) % totalSlides - index);
  
  // Calculate scale based on distance from center (0 = center, max distance = edges)
  const scale = distance === 0 ? 1 : 0.75; // 1 for center, 0.75 for others
  return scale;
};

export const getOpacity = (currentSlide: number, index: number, totalSlides: number) => {
  const center = Math.floor(totalSlides / 2);
  const distance = Math.abs((currentSlide + center) % totalSlides - index);
  return distance === 0 ? 1 : 0.5;
};