import { readableColor } from 'polished';

import variants from '../enums/variants';
import colors from '../enums/colors';

/**
 * Get the appropriate font color for the button based on the variant of button
 * @param {string} variant - The variant of button
 * @param {string} color - The color prop passed into the button
 * @param {string} lightReturnColor - The color to return if the color is too dark
 * @param {string} darkReturnColor - The color to return if the color is too dark
 */
export const getFontColorFromVariant = (
  variant: string,
  color: string,
  lightReturnColor: string = colors.background,
  darkReturnColor: string = colors.grayDark,
) => {
  if (variant === 'fill') {
    return readableColor(color, lightReturnColor, darkReturnColor, true);
  }
  return color;
};

/**
 * Get the appropriate background color for the button based on the variant of button
 * @param {string} variant - The variant of button
 * @param {string} color - The color prop passed into the button
 * @param {string} [transparentColor] - The color to use for a transparent background
 */
export const getBackgroundColorFromVariant = (
  variant: string,
  color: string,
  transparentColor = 'transparent',
) => {
  switch (variant) {
    case variants.text:
    case variants.outline:
      return transparentColor;
    default:
      return color;
  }
};

/*
  Converts a hex color value to grayscale using luminosity.
*/
const filterGrayscale = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var luminosity = 0;
  if(result){
      var r= parseInt(result[1], 16);
      var g= parseInt(result[2], 16);
      var b= parseInt(result[3], 16);
      luminosity = Math.round(r*.3 + g*.59 + b*.11);
  } 
  var grayscaleColor = '#' + [luminosity, luminosity, luminosity].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
  // var grayscaleColor = luminosity.toString() + "," + luminosity.toString() + "," + luminosity.toString()
  return grayscaleColor;
}

/**
 * Returns styling which converts font and background colors to a grayscale disabled style. 
 */
export const disabledStyles = (
  fontColor: string = "#FFFFFF",
  backgroundColor: string = colors.primaryDark,
  borderColor: string = "#000000",
) => {
  return `
  color: ${filterGrayscale(fontColor)};
  background: ${filterGrayscale(backgroundColor)};
  border-color: ${filterGrayscale(borderColor)};
  box-shadow: none;
  `
}; 
