import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ImageView = ({item, index, scrollValue}) => {
  const screenWidth = Dimensions.get('screen').width;
  const width = screenWidth * 0.7;
  const spaceWidth = (screenWidth * 0.3) / 2;

  const imageViewStyle = useAnimatedStyle(() => {
    let scale = interpolate(
      scrollValue.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{scale: scale}],
    };
  }, [scrollValue]);

  const textAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      scrollValue.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [-1, 1, -1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  }, [scrollValue]);

  return (
    <Animated.View
      key={item?.id}
      style={[{marginHorizontal: spaceWidth}, imageViewStyle]}>
      <Image
        source={{uri: item.imageUrl}}
        style={{height: 200, width: width}}
        borderRadius={15}
      />
      <Animated.Text
        style={[styles.textStyle, {maxWidth: width}, textAnimatedStyle]}>
        {item?.text}
      </Animated.Text>
    </Animated.View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
  },
});
