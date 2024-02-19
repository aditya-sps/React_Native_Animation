import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MovingButton = () => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const insets = useSafeAreaInsets();
  const {height, width} = Dimensions.get('window');
  const leftTransition = useSharedValue(0);
  const topTransition = useSharedValue(0);
  const isAndroid = Platform.OS === 'android';
  const [isDisable, setIsDisable] = useState(false);

  const ballPressed = () => {
    setIsDisable(true);
    leftTransition.value = withTiming(
      width - 80,
      {
        duration: 2000,
      },
      () => {
        topTransition.value = withTiming(
          height - (80 + (isAndroid ? 23 : 0)),
          {
            duration: 2000,
          },
          () => {
            leftTransition.value = withTiming(
              0,
              {
                duration: 2000,
              },
              () => {
                topTransition.value = withTiming(
                  0,
                  {
                    duration: 2000,
                  },
                  () => {
                    runOnJS(setIsDisable)(false);
                  },
                );
              },
            );
          },
        );
      },
    );
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: leftTransition.value},
        {translateY: topTransition.value},
      ],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedPressable
        style={[styles.roundButton, buttonStyle]}
        disabled={isDisable}
        onPress={ballPressed}
      />
    </SafeAreaView>
  );
};

export default MovingButton;

const styles = StyleSheet.create({
  roundButton: {
    height: 80,
    width: 80,
    backgroundColor: '#0317fc',
    borderRadius: 40,
  },
});
