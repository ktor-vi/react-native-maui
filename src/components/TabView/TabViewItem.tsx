import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import Animated, {
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { Freeze } from '../../utils/Freeze';

const { width, height } = Dimensions.get('window');

interface TabViewItemProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
}

const TabListColor = [
  'orange',
  '#666',
  'cyan',
  '#e82c1c',
  'purple',
  'orange',
  '#666',
];

const TabViewItem: React.FC<TabViewItemProps> = (props) => {
  const { index, currentIndex } = props;
  const [freeze, setFreeze] = useState(false);

  useAnimatedReaction(
    () => currentIndex.value,
    (value) => {
      if (index === value) {
        runOnJS(setFreeze)(false);
      } else {
        runOnJS(setFreeze)(true);
      }
    }
  );

  return (
    <Freeze freeze={false} placeholder={<View style={{ width }} />}>
      <ScrollView>
        <View
          style={{
            backgroundColor: TabListColor[index],
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
          <Text style={{ fontSize: 30 }}>{`Tab${index}`}</Text>
        </View>
      </ScrollView>
    </Freeze>
  );
};

export default TabViewItem;