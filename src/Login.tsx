import {
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';

const Login = () => {
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log('gestureState', gestureState);
        pan.setValue(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log('gestureStateRelease', gestureState);
      },
    }),
  ).current;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.loginText}>Login</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{marginBottom: -200}}>
          <Animated.View
            style={[styles.body, {bottom: pan}]}
            {...panResponder.panHandlers}></Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  body: {
    backgroundColor: '#f5d7b8',
    height: 400,
    borderRadius: 10,
  },
});
