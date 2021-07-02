import { Dimensions, PixelRatio } from 'react-native';

// TODO: update with rotation
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const pixelRatio = PixelRatio.get();

// baseline sizes are based on a standard 5" mobile screen
export const baselineHeight = 680;
export const baselineWidth = 350;

export const defaultFontSize = 4 * pixelRatio

export default {
  window: {
    width,
    height,
  },
  defaultFontSize,
  isSmallDevice: width < 375,
};
