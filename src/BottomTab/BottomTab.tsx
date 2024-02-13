import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

interface BottomTabProps {
  height: number;
  visible: boolean;
  onClose: () => void;
  children: React.ReactElement;
  containerStyle?: ViewStyle;
}

const BottomTab = (props: BottomTabProps) => {
  const transitionY = useSharedValue(props.height);

  useEffect(() => {
    if (props?.visible) {
      transitionY.value = withTiming(0);
    } else {
      transitionY.value = props.height;
    }
  }, [props.visible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = transitionY.value;
    },
    onActive: (event, ctx) => {
      let slidingValue = ctx.startY + event.translationY;
      transitionY.value = Math.max(slidingValue, 0);
    },
    onEnd: (event, ctx) => {
      let slidingValue = ctx.startY + event.translationY;
      if (slidingValue < props.height / 2) {
        transitionY.value = withTiming(0);
      } else {
        transitionY.value = withTiming(props.height);
        runOnJS(props?.onClose)?.();
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transitionY.value}],
    };
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={props?.visible}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable style={styles.wrapper}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={[
                styles.container,
                props?.containerStyle,
                {height: props?.height},
                containerStyle,
              ]}>
              {props?.children}
            </Animated.View>
          </PanGestureHandler>
        </Pressable>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
