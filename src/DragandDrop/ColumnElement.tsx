import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RowElement from './RowElement';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ColumnElement = ({item, index, data, setData}: any) => {
  const {width} = Dimensions.get('window');
  const columnZIndex = useSharedValue(-10);

  const containerStyle = useAnimatedStyle(() => {
    return {
      zIndex: columnZIndex.value,
    };
  }, [columnZIndex.value]);

  const updateZindex = (value: number) => {
    columnZIndex.value = value;
  };

  return (
    <Animated.View
      style={[styles.container, {width: width / 4}, containerStyle]}>
      {item?.map((value, valueindex) => (
        <RowElement
          key={valueindex?.toString()}
          value={value}
          columnIndex={valueindex}
          rowIndex={index}
          updateZindex={updateZindex}
          data={data}
          setData={setData}
        />
      ))}
    </Animated.View>
  );
};

export default ColumnElement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5de9f',
    borderWidth: 0.5,
    borderColor: '#030303',
  },
});
