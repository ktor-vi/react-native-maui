import React, { useEffect } from 'react';
import {View, Image, Dimensions} from 'react-native';
import Animated, { interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Position } from './ImageContainer';

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
  const { width: w, height: h, pageX: x, pageY: y } = position;
  
  const width = useSharedValue(w);
  const height = useSharedValue(h);
  const translateX = useSharedValue(x)
  const translateY = useSharedValue(y - paddingTop);
  const scale = useSharedValue(1);

  useAnimatedReaction(() => willUnMount.value, (value) => {
    if (value && index === currentIndex.value) {
      width.value = withTiming(w, {duration});
      height.value = withTiming(h, {duration});
      translateX.value = withTiming(x, {duration});
      translateY.value = withTiming(y - paddingTop, {duration});  
    }
  });

  useAnimatedReaction(() => containerTranslateY.value, (value) => {
    const ratio = interpolate(value, [-Height/2, 0, Height / 2], [0.5, 1, 0.5]);
    scale.value = withTiming(ratio, {duration});
  })

  const animationStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      transform: [{
        translateX: translateX.value
      }, {
        translateY: translateY.value + containerTranslateY.value
      }, {
        scale: scale.value
      }]
    }
  })

  useEffect(() => {
    if (currentIndex.value === index) {
      width.value = withTiming(Width, {duration});
      height.value = withTiming(Height - paddingTop - paddingBottom, {duration});
      translateX.value = withTiming(0, {duration});
      translateY.value = withTiming(0, {duration});  
    } else {
      width.value = Width;
      height.value = Height - paddingTop - paddingBottom;
      translateX.value = 0;
      translateY.value = 0;  
    }
  }, [])

  return (
    <View style={{ flex: 1, width: Width }}>
      <Animated.View style={[animationStyle]}>
        <Image source={item.source} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </Animated.View>  
    </View>
  )
}

export default Display;