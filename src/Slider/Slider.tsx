import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const minValue = 4;
const maxValue = 90;

const Slider = () => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const context = useSharedValue(0);
  const transitionX = useSharedValue(0);

  const tapGesture = Gesture.Pan()
    .onStart(() => {
      context.value = transitionX.value;
    })
    .onChange(event => {
      let slidingValue = context.value + event.translationX;

      transitionX.value = Math.min(scrollWidth, Math.max(slidingValue, 0));
    })
    .onEnd(event => {
      let slidingValue = context.value + event.translationX;

      transitionX.value = Math.min(scrollWidth, Math.max(slidingValue, 0));
    });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: transitionX.value}],
    };
  }, [transitionX.value]);

  const sliderAreaColor = useAnimatedStyle(() => {
    return {
      width: transitionX.value,
    };
  }, [transitionX.value]);

  return (
    <SafeAreaView style={{justifyContent: 'center', flex: 1}}>
      <View style={{paddingHorizontal: 20}}>
        <View
          onLayout={event => {
            const {width} = event.nativeEvent.layout;
            setScrollWidth(width);
          }}
          style={styles.width}>
          <Animated.View style={[styles.selectedColor, sliderAreaColor]} />
          <GestureDetector gesture={tapGesture}>
            <Animated.View style={[styles.sliderButton, sliderStyle]} />
          </GestureDetector>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  width: {
    backgroundColor: '#d1d1d1',
    height: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  sliderButton: {
    borderColor: '#1165ed',
    borderWidth: 2,
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: 'white',
  },
  selectedColor: {
    backgroundColor: '#edb611',
    height: '100%',
    position: 'absolute',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
