import React, { useEffect } from 'react';
import {View, Image, Dimensions} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Position } from './ImageContainer';

import {useInitialPosition} from './hook';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const {width: Width, height: Height} = Dimensions.get('window');

interface DisplayProps {
  position: Position,
  duration?: number,
  paddingTop: number;
  paddingBottom: number;
  item: any;
  currentIndex: Animated.SharedValue<number>;
  index: number;
  willUnMount: Animated.SharedValue<boolean>;
  containerTranslateY: Animated.SharedValue<number>;
}

const Display: React.FC<DisplayProps> = (props) => {
  const {position, duration, paddingTop, paddingBottom, item, currentIndex, index, willUnMount, containerTranslateY} = props;
  const {initialX, initialY, initialW, initialH, toHeight} = useInitialPosition(position, paddingTop, paddingBottom)

  const width = useSharedValue(initialW);
  const height = useSharedValue(initialH);
  const translateX = useSharedValue(initialX)
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const opacity = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = savedScale.value * e.scale;
  })
  .onEnd(() => {
    if (scale.value < 1) {
      scale.value = withTiming(1, {duration});
      savedScale.value = 1;
    } else {
      savedScale.value = scale.value;
    }
  });


  useAnimatedReaction(() => willUnMount.value, (value) => {
    if (value && index === currentIndex.value) {      
      width.value = withTiming(initialW, {duration});
      height.value = withTiming(initialH, {duration});
      translateX.value = withTiming(initialX, {duration});
      translateY.value = withTiming(initialY, {duration});
      opacity.value = withTiming(0, {duration});
    }
  });

  useAnimatedReaction(() => containerTranslateY.value, (value) => {
    const ratio = interpolate(value, [-Height/2, 0, Height / 2], [0.5, 1, 0.5], Extrapolate.CLAMP);
    scale.value = withTiming(ratio, {duration});
    opacity.value = withTiming(ratio, {duration});
  })

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      width: width.value,
      height: height.value,
      transform: [ {
        scale: scale.value
      },{
        translateX: translateX.value
      }, {
        translateY: translateY.value + containerTranslateY.value
      }]
    }
  })

  useEffect(() => {
    if (currentIndex.value === index) {
      width.value = withTiming(Width, {duration});
      height.value = withTiming(toHeight, {duration});
      translateX.value = withTiming(0, {duration});
      translateY.value = withTiming(0, {duration});
      opacity.value = withTiming(1, {duration});
    } else {
      width.value = Width;
      height.value = toHeight;
      translateX.value = 0;
      translateY.value = 0;  
      opacity.value = 1;
    }
  }, [])

  return (
    <View style={{ flex: 1, width: Width }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[animationStyle]}>
          <Image source={item.source} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </Animated.View>  
      </GestureDetector>
    </View>
  )
}

export default Display;