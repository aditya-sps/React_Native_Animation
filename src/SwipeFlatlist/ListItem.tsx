import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ListItem = ({item}: any) => {
  const scrollMinValue = -100;
  const leftSlide = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = leftSlide.value;
    },
    onActive: (event, ctx) => {
      let slidingValue = ctx.startX + event.translationX;
      if (slidingValue <= 0) {
        leftSlide.value = slidingValue;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationX < scrollMinValue / 2) {
        leftSlide.value = withTiming(-100);
      } else {
        leftSlide.value = withTiming(0);
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      left: leftSlide.value,
    };
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.hiddenView} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.upperView, containerStyle]}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            // setheight(height);
          }}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.body}>{item?.body}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop: 15,
    overflow: 'hidden',
  },
  upperView: {
    // position: 'absolute',
    backgroundColor: '#934df0',
    zIndex: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    color: 'white',
    fontSize: 13,
    marginTop: 4,
  },
  hiddenView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
    // borderRadius: 8,
  },
});
