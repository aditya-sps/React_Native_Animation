import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ScrollHeader = () => {
  const scrolledValue = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(event => {
    // scrolledValue.value = event.contentOffset.x;
    console.log('scrollY', event.contentOffset.y);
    scrolledValue.value = event.contentOffset.y;
  });

  const topHeader = useAnimatedStyle(() => {
    const value = interpolate(
      scrolledValue.value,
      [0, 30],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: value,
    };
  });

  const bottomHeader = useAnimatedStyle(() => {
    const value = interpolate(
      scrolledValue.value,
      [0, 30],
      [1, -1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: value,
    };
  });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <View style={styles.rowView}>
        <View style={styles.backIconWrapper}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.backIcon}
          />
        </View>
        <Animated.Text style={[styles.headerText, topHeader]}>
          Header
        </Animated.Text>
      </View>
      <Animated.ScrollView
        style={{marginTop: 20}}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <Animated.Text style={[styles.headerScrollText, bottomHeader]}>
          Header
        </Animated.Text>
        {Array(10)
          .fill(1)
          .map((item, index) => (
            <View key={index?.toString()} style={styles.item}></View>
          ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ScrollHeader;

const styles = StyleSheet.create({
  backIcon: {
    height: 20,
    width: 20,
  },
  backIconWrapper: {
    backgroundColor: 'white',
    padding: 7,
    borderWidth: 1,
    borderColor: '#ffe736',
    borderRadius: 6,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '800',
  },
  headerScrollText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 28,
    fontWeight: '800',
  },
  item: {
    height: 80,
    backgroundColor: '#369aff',
    marginBottom: 20,
  },
});
