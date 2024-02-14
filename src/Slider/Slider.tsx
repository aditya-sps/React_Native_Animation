import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  I18nManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  runOnJS,
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
  const [value, setValue] = useState(0);

  const tapGesture = Gesture.Pan()
    .onStart(() => {
      context.value = transitionX.value;
    })
    .onChange(event => {
      let slidingValue = context.value + event.translationX;

      slidingValue = Math.min(scrollWidth, Math.max(slidingValue, 0));

      transitionX.value = slidingValue;
      runOnJS(handleSliderMove)(slidingValue);
    })
    .onEnd(event => {
      let slidingValue = context.value + event.translationX;

      slidingValue = Math.min(scrollWidth, Math.max(slidingValue, 0));

      transitionX.value = slidingValue;
      runOnJS(handleSliderMove)(slidingValue);
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

  // get value on sliding
  function handleSliderMove(currentPosition) {
    // Calculate the percentage of the slider's width where the user is dragging
    const percentage = currentPosition / scrollWidth;

    // Calculate the current value based on the percentage, min, and max values
    const currentValue = minValue + percentage * (maxValue - minValue);

    // Update the state with the current value
    setValue(Math.round(currentValue));
  }

  // get current position based on value
  // need to handle seperately for max value
  const getPosition = currentValue => {
    const currentPosition =
      ((currentValue - minValue) / (maxValue - minValue)) * scrollWidth;
    console.log('currentPosition', currentPosition);
  };

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
            <Animated.View style={[styles.sliderButton, sliderStyle]}>
              <Text style={styles.textStyle}>{value}</Text>
            </Animated.View>
          </GestureDetector>
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
  textStyle: {
    alignSelf: 'center',
    zIndex: 10,
    top: 20,
    textAlign: 'center',
    color: 'black',
  },
});
