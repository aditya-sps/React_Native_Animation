import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Screen1 = () => {
  return (
    <View style={styles.screen1}>
      <Text>screen1</Text>
    </View>
  );
};

const Screen2 = () => {
  return (
    <View style={styles.screen2}>
      <Text>screen2</Text>
    </View>
  );
};

const Screen3 = () => {
  return (
    <View style={styles.screen3}>
      <Text>screen3</Text>
    </View>
  );
};

const TopNavigator = () => {
  const {width} = Dimensions.get('window');
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef();
  const insets = useSafeAreaInsets();

  const tabOption = [
    {name: 'Chat', component: <Screen1 />},
    {name: 'Contact', component: <Screen2 />},
    {name: 'Albums', component: <Screen3 />},
  ];

  const scroll = useAnimatedScrollHandler(event => {
    scrollX.value = event?.contentOffset?.x;
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
            {item?.component}
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
