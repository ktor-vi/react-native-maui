import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Swiper, SwiperRef } from '../components/Swiper';

const {width} = Dimensions.get('window');

const card = [
  {
    source: require('../../assets/a.jpg'),
  },
  {
    source: require('../../assets/b.jpg'),
  },
  {
    source: require('../../assets/c.jpg'),
  },
  {
    source: require('../../assets/d.jpg'),
  },
]

export default function SwiperExample() {
  const ref = useRef<SwiperRef>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [horizontal, setHorizontal] = useState(false);

  return (
    <View style={styles.container}>
      <Swiper
        ref={ref}
        interval={1000}
        dataSource={card}
        renderItem={(item) => {
          return <Image source={item.source} style={{ width: '100%', height: '100%'}} />
        }}
        onScollStart={() => {
          // console.log('滚动开始');
        }}
        onScollEnd={() => {
          // console.log('滚动结束');
        }}
        auto={autoplay}
        horizontal={horizontal}
        style={{
          width,
          height: 200,
        }}
      />
      <View style={{ flexDirection: 'row', marginTop: 100 }}>
        <RectButton onPress={() => {
          ref.current?.previous();
        }} style={{height: 50, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Pre</Text>
        </RectButton>
        <RectButton onPress={() => {
          setAutoplay(auto => !auto);
        }} style={{height: 50, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{`isAuto: ${autoplay}`}</Text>
        </RectButton>
        <RectButton onPress={() => {
          setHorizontal(auto => !auto);
        }} style={{height: 50, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{`isHorizontal: ${horizontal}`}</Text>
        </RectButton>
        <RectButton onPress={() => {
          ref.current?.next();
        }} style={{height: 50, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Next</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
