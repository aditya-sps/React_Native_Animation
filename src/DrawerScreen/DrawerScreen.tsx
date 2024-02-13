import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DrawerScreen = () => {
  const insets = useSafeAreaInsets();
  const scaleOut = useSharedValue(0);

  const handleClick = () => {
    scaleOut.value = scaleOut.value === 0 ? withTiming(1) : withTiming(0);
  };

  const transformStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scaleOut.value, [0, 1], [1, 0.7]);
    const borderRadius = interpolate(scaleOut.value, [0, 1], [0, 15]);
    const translateX = interpolate(scaleOut.value, [0, 1], [0, 200]);

    return {
      transform: [{scale: scaleValue}, {translateX: translateX}],
      borderRadius: borderRadius,
    };
  }, [scaleOut.value]);

  return (
    <View
      style={[
        styles.fullView,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Text>DrawerScreen</Text>
      <Animated.View
        style={[styles.absoluteView, transformStyle, {paddingTop: insets.top}]}>
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={handleClick}>
          <Image
            source={{
              uri: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
            }}
            style={styles.image}
            borderRadius={30}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
    backgroundColor: '#7132a8',
  },
  absoluteView: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    height: 60,
    width: 60,
    marginTop: 20,
    marginLeft: 20,
  },
});
