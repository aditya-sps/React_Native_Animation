import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ReText from './Retext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = () => {
  const {width, height} = Dimensions.get('window');
  const circle_permimeter = 1000;
  const radius = circle_permimeter / (2 * Math.PI);
  const porgress = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const animatedProp = useAnimatedProps(() => {
    return {
      strokeDashoffset: circle_permimeter * (1 - porgress.value),
    };
  });

  const getTextValue = useDerivedValue(() => {
    return `${Math.round(porgress.value * 100)}`;
  });

  const onPress = () => {
    porgress.value = withTiming(porgress.value === 1 ? 0 : 1, {duration: 2000});
  };

  return (
    <View style={styles.viewStyle}>
      <ReText text={getTextValue} style={styles.text} />
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={'#2a294a'}
          strokeWidth={30}
          fill={'transparent'}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={'#aeabf5'}
          strokeWidth={15}
          fill={'transparent'}
          strokeDasharray={circle_permimeter}
          //   strokeDashoffset={circle_permimeter * 0.5}
          animatedProps={animatedProp}
        />
      </Svg>
      <TouchableOpacity
        style={[styles.button, {bottom: insets.bottom}]}
        onPress={onPress}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#454287',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
  },
  button: {
    position: 'absolute',
    width: '90%',
    height: 60,
    backgroundColor: '#320082',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
