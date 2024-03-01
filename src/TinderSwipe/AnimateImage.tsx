import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const imageHeight = SCREEN_HEIGHT * 0.8;
const imageWidth = SCREEN_WIDTH * 0.9;

const AnimateImage = ({uri, index, data, setData}: any) => {
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);

  const setState = () => {
    let new_arr = data?.filter((_, imageIndex) => imageIndex !== index);
    setData(new_arr);
  };

  const tapGesture = Gesture.Pan()
    .onStart(() => {})
    .onChange(event => {
      transitionX.value = event.translationX;
      transitionY.value = event.translationY;
    })
    .onEnd(event => {
      const x = event.translationX;
      const y = event.translationY;
      transitionX.value = x;
      transitionY.value = y;
      if (Math.abs(x) < imageWidth / 2 && Math.abs(y) < imageHeight / 2) {
        transitionX.value = withTiming(0);
        transitionY.value = withTiming(0);
      } else {
        if (Math.abs(x) > imageWidth / 2 && Math.abs(y) > imageHeight / 2) {
          transitionX.value = withTiming(
            (transitionX.value > 0 ? 1 : -1) * SCREEN_WIDTH,
          );
          transitionY.value = withTiming(
            (transitionY.value > 0 ? 1 : -1) * SCREEN_HEIGHT,
            {},
            () => {
              runOnJS(setState)();
            },
          );
        } else if (Math.abs(x) > imageWidth / 2) {
          transitionX.value = withTiming(
            (transitionX.value > 0 ? 1 : -1) * SCREEN_WIDTH,
            {},
            () => {
              runOnJS(setState)();
            },
          );
        } else if (Math.abs(y) > imageHeight / 2) {
          transitionY.value = withTiming(
            (transitionY.value > 0 ? 1 : -1) * SCREEN_HEIGHT,
            {},
            () => {
              runOnJS(setState)();
            },
          );
        }
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      transitionX.value,
      [-imageWidth, imageWidth],
      [-45, 45],
    );
    return {
      transform: [
        {translateX: transitionX.value},
        {translateY: transitionY.value},
        {rotate: `${rotate}deg`},
      ],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <AnimatedImage
        source={{uri: uri}}
        style={[styles.size, {zIndex: index * 10}, imageStyle]}
        borderRadius={20}
      />
    </GestureDetector>
  );
};

export default AnimateImage;

const styles = StyleSheet.create({
  size: {
    height: imageHeight,
    width: imageWidth,
    position: 'absolute',
  },
});
