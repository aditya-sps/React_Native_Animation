import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';

const TopNavigator = () => {
  const {width} = Dimensions.get('window');
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  const tabOption = [
    {
      name: 'Chat',
      component: (index: number) => (
        <Screen1 index={index} activeIndex={activeIndex} />
      ),
    },
    {
      name: 'Contact',
      component: (index: number) => (
        <Screen2 index={index} activeIndex={activeIndex} />
      ),
    },
    {
      name: 'Albums',
      component: (index: number) => (
        <Screen3 index={index} activeIndex={activeIndex} />
      ),
    },
  ];

  const scroll = useAnimatedScrollHandler(event => {
    scrollX.value = event?.contentOffset?.x;
    let index = event?.contentOffset?.x / width;
    let prevIndex = Math.floor(index);
    index =
      index > Number(`${prevIndex}.9`) ? Math.ceil(index) : Math.floor(index);

    runOnJS(setActiveIndex)(index);
  });

  const tabBarStyle = useAnimatedStyle(() => {
    const oneTabWidth = width / tabOption?.length;
    const transformX = interpolate(
      scrollX.value,
      tabOption?.map((_, index) => index * width),
      tabOption?.map((_, index) => index * oneTabWidth),
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateX: transformX}],
    };
  }, [scrollX]);

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <View style={styles.rowContainer}>
        {tabOption?.map((item, index) => (
          <TouchableOpacity
            key={index?.toString()}
            onPress={() => {
              const scrollTo = width * index;
              scrollX.value = withTiming(scrollTo);
              scrollViewRef?.current?.scrollTo({x: scrollTo, animated: true});
            }}
            style={styles.eachView}>
            <Text style={styles.text}>{item?.name}</Text>
            {index === 0 && (
              <Animated.View style={[styles.tabBar, tabBarStyle]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        bounces={false}
        onScroll={scroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {tabOption?.map((item, index) => (
          <View key={index?.toString()} style={{flex: 1, width: width}}>
            {item?.component(index)}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default TopNavigator;

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 20,
    flexDirection: 'row',
    height: 50,
  },
  eachView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'black',
  },
  tabBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#000000',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    bottom: 0,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#828281',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#a1a09f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen3: {
    flex: 1,
    backgroundColor: '#c7c6c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
