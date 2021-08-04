import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
  name: string;
  size: number;
  color?: string;
  spin?: boolean | number;
}

const Icon: React.FC<IconProps> = ({ name, size, color = 'white', spin = false }) => {
  // @ts-expect-error
  const iconElement = <MaterialCommunityIcons name={name} size={size} color={color} />;

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
    ).start(console.log);
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
