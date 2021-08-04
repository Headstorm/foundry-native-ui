import * as React from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SVGIconProps {
  path: string;
  size: number | string;
  color?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ path, size, color = 'white' }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path fill={color} d={path} />
    </Svg>
  );
};

interface IconProps {
  path: string;
  size: number | string;
  color?: string;
  spin?: boolean | number;
}

const Icon: React.FC<IconProps> = ({ path, size, color = 'white', spin = false }) => {
  const iconElement = <SVGIcon path={path} size={size} color={color} />;

  if (!spin) return iconElement;

  const spinAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 100,
        duration: Number(spin) * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const interpolatedSpinAnim = spinAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate: interpolatedSpinAnim }] }]}>
      {iconElement}
    </Animated.View>
  );
};

export default Icon;
