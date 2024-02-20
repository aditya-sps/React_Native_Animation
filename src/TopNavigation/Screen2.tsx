import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Screen2 = ({index, activeIndex}) => {
  useEffect(() => {
    if (index === activeIndex) {
      console.log('Screen2');
    }
  }, [activeIndex]);
  return (
    <View style={styles.screen2}>
      <Text>screen2</Text>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  screen2: {
    flex: 1,
    backgroundColor: '#a1a09f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
