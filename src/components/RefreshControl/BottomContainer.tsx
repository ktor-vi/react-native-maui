import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { RefreshStatus, useRefresh } from './type';

const { width } = Dimensions.get('window');

interface BottomContainerProps {}

const BottomContainer: React.FC<BottomContainerProps> = (props) => {
  const { children } = props;
  const { scrollBounse, transitionY, triggleHeight, direction, refreshStatus } =
    useRefresh();

  const animatedStyle = useAnimatedStyle(() => {
    if (
      scrollBounse.value ||
      direction.value === 1 ||
      (direction.value === -1 && refreshStatus.value === RefreshStatus.Done)
    ) {
      return {
        height: 0,
        opacity: 0,
      };
    }
    return {
      bottom: 0,
      height: transitionY.value * direction.value,
      opacity: interpolate(
        transitionY.value * direction.value,
        [0, triggleHeight / 3, triggleHeight],
        [0, 0, 1]
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
export default BottomContainer;