import { readableColor, grayscale } from 'polished';

import variants from '../enums/variants';
import colors from '../enums/colors';

/**
 * Get the appropriate font color for the button based on the variant of button
 * @param {string} variant - The variant of button
 * @param {string} color - The color prop passed into the button
 * @param {string} lightReturnColor - The color to return if the color is too dark
 * @param {string} darkReturnColor - The color to return if the color is too dark
 * @param {boolean} disabled - Whether or not the component is disabled
 */
export const getFontColorFromVariant = (
  variant: string,
  color: string,
  lightReturnColor: string = colors.background,
  darkReturnColor: string = colors.grayDark,
  disabled: boolean = false,
) => {
  if(variant === 'fill') {
    if(!disabled)
      return readableColor(color, lightReturnColor, darkReturnColor, true);
    } else {
      return readableColor(grayscale(color), grayscale(lightReturnColor), grayscale(darkReturnColor), true);
    }
  } else if (disabled) {
    return grayscale(color);
  }
  return color;
};

/**
 * Get the appropriate background color for the button based on the variant of button
 * @param {string} variant - The variant of button
 * @param {string} color - The color prop passed into the button
 * @param {string} [transparentColor] - The color to use for a transparent background
 * @param {boolean} disabled - Whether or not the component is disabled
 */
export const getBackgroundColorFromVariant = (
  variant: string,
  color: string,
  transparentColor = 'transparent',
  disabled: boolean = false,
) => {
  switch (variant) {
    case variants.text:
    case variants.outline:
      if (disabled) {
        return grayscale(transparentColor);
      }
      return transparentColor;
    default:
      if (disabled) {
        return grayscale(color);
      }
      return color;
  }
};
