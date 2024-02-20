import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Screen1 = ({index, activeIndex}) => {
  useEffect(() => {
    if (index === activeIndex) {
      console.log('Screen1');
    }
  }, [activeIndex]);

  return (
    <View style={styles.screen1}>
      <Text>screen1</Text>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  screen1: {
    flex: 1,
    backgroundColor: '#828281',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
