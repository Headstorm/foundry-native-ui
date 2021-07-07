import React, { ReactNode } from 'react';
import { Platform, Text } from 'react-native';
import { parseToRgb } from 'polished';
import variants from '../enums/variants';
import { getFontColorFromVariant } from './color';
import Layout, { baselineWidth, defaultFontSize } from '../../constants/Layout';

// A constant factor that works well with base 10 logarithms
const elevationFactor = 10 ** 0.1;

export type ElevationValues = {
  xOffset: number;
  yOffset: number;
  blur: number;
  opacity: number;
};

/**
 * Calculates the values for shadows based on the provided elevation
 * @param {number} elevation - The elevation to get values for
 * @returns {ElevationValues} The values for each of the shadow values plus color opacity
 */
export const calculateElevationValues = (elevation = 0) => {
  const elevationValues = {
    xOffset: 0,
    yOffset: 0,
    blur: 0,
    opacity: 0,
  };

  // return the default values of 0 if elevation is 0
  if (!elevation) {
    return elevationValues;
  }
  const isNegative = elevation < 0;
  const absVal = Math.abs(elevation);
  const calc = () => Math.E ** (absVal / 16);
  // Using abs will return the same values for negative and positive elevations
  const logVal = Math.log10(absVal + elevationFactor);

  // Set the updated values for the elevation
  elevationValues.xOffset = 0;
  elevationValues.yOffset = isNegative
    ? Math.round(Math.E ** (absVal / 10) + 0.1) / 16
    : calc() / 16;
  elevationValues.blur = isNegative ? (absVal * 2) / 16 : absVal * 0.25;
  elevationValues.opacity = /** isNegative ? 0.3 - 0.05 * absVal : */ 0.5 - logVal * 0.2;

  elevationValues.xOffset = remToPx(elevationValues.xOffset);
  elevationValues.yOffset = remToPx(elevationValues.yOffset);

  return elevationValues;
};

/**
 * Returns the entire shadow style for a given elevation. If elevation is positive, a drop-shadow filter is returned.
 * If the elevation is negative, a box-shadow is returned and is inset. If elevation is 0, emptystring is returned.
 * @param {number} elevation - The elevation to get the shadow style for
 * @param {string} shadowColor - The color to be used for the shadow in hex or rgba format
 * @returns {string} The css style property and value
 */
export const getShadowStyle = (elevation = 0, shadowColor: string) => {
  if (elevation === 0) {
    return '';
  }

  const { red, green, blue } = parseToRgb(shadowColor);

  if (elevation > 0 && Platform.OS === 'android') {
    return `elevation: ${elevation}; shadow-color: rgb(${red},${green},${blue});`;
  }

  const { xOffset, yOffset, blur, opacity } = calculateElevationValues(elevation);

  // TODO: Add shadow inset when elevation < 0
  return `box-shadow: ${xOffset}px ${yOffset}px ${blur}px rgba(${red},${green},${blue},${opacity});`;
};

/**
 * Determines the style of the of the tag component for the dropdown
 * @param dropdownVariant - The dropdown variant
 * @param tagVariant - The tag variant
 * @param dropdownColor - The color prop passed into the dropdown
 * @param transparentColor - The transparent color provided from the useTheme hook
 */
export const getDropdownTagStyle = (
  dropdownVariant: variants,
  tagVariant: variants,
  dropdownColor: string,
  transparentColor: string,
) => {
  let backgroundColor = '';
  let fontColor = '';
  switch (dropdownVariant) {
    case variants.fill:
      if (tagVariant === variants.text) {
        backgroundColor = transparentColor;
        fontColor = getFontColorFromVariant(dropdownVariant, dropdownColor);
      } else if (tagVariant === variants.fill) {
        backgroundColor = getFontColorFromVariant(dropdownVariant, dropdownColor);
        fontColor = dropdownColor;
      } else {
        backgroundColor = transparentColor;
        fontColor = getFontColorFromVariant(dropdownVariant, dropdownColor);
      }
      break;
    case variants.outline:
      if (tagVariant === variants.text) {
        backgroundColor = transparentColor;
        fontColor = dropdownColor;
      } else if (tagVariant === variants.fill) {
        backgroundColor = dropdownColor;
        fontColor = getFontColorFromVariant(tagVariant, dropdownColor);
      } else {
        backgroundColor = transparentColor;
        fontColor = dropdownColor;
      }
      break;
    case variants.text:
      if (tagVariant === variants.text) {
        backgroundColor = transparentColor;
        fontColor = dropdownColor;
      } else if (tagVariant === variants.fill) {
        backgroundColor = dropdownColor;
        fontColor = getFontColorFromVariant(tagVariant, dropdownColor);
      } else {
        backgroundColor = transparentColor;
        fontColor = dropdownColor;
      }
      break;
    default:
      backgroundColor = transparentColor;
      fontColor = dropdownColor;
  }

  return `
    border: ${tagVariant === variants.outline ? `1px solid ${fontColor};` : '0 none;'}
    background-color: ${backgroundColor};
    color: ${fontColor};
    margin-right: .25rem;
    margin-top: 1px;
  `;
};


// TODO: incorporate separate font size util using user preferences
/**
 * Converts a rem value to pixels for the device the user is on
 * @param {number} size - The rem value to get pixels for
 * @param {number} [factor = 1] - The factor to scale by
 * @returns {number} The scaled px value 
 */
export const remToPx = (size: number, factor = 1) => defaultFontSize * (size + (factor * ((Layout.window.width / baselineWidth * size) - size)))

/**
 * Gets all text container stylable children
 * @param {ReactNode []} children - The children object 
 * @returns {ReactNode []} The children that are capable of being directly nested in a Text container
 */
export const getTextChildren = (children: ReactNode[]): ReactNode[] => React.Children.toArray(children).filter(child => typeof (child) === 'string' || (child && child.type && child.type === Text))

