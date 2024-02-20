import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Screen3 = ({index, activeIndex}) => {
  useEffect(() => {
    if (index === activeIndex) {
      console.log('Screen3');
    }
  }, [activeIndex]);
  return (
    <View style={styles.screen3}>
      <Text>screen3</Text>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  screen3: {
    flex: 1,
    backgroundColor: '#c7c6c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
