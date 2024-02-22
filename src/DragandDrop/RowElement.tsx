import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const RowElement = ({
  value,
  columnIndex,
  rowIndex,
  updateZindex,
  data,
  setData,
}: any) => {
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const scale = useSharedValue(1);
  const {width} = Dimensions.get('window');

  useEffect(() => {
    if (transitionX.value !== 0 || transitionY.value !== 0) {
      transitionX.value = 0;
      transitionY.value = 0;
    }
  }, [data]);

  const updateState = (draggedIndexX: number, draggedIndexY: number) => {
    if (data) {
      let newData = [...data];
      let filterArray = newData[rowIndex];
      filterArray = filterArray?.filter((_, index) => index !== columnIndex);
      newData[rowIndex] = filterArray;
      console.log('filterArray', filterArray);
      let appendArray = newData[draggedIndexX];
      appendArray = [
        ...appendArray.slice(0, draggedIndexY),
        value,
        ...appendArray.slice(draggedIndexY),
      ];
      newData[draggedIndexX] = appendArray;
      console.log('appendArray', appendArray);
      setData(newData);
    }
  };

  const tapGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart(() => {
      contextX.value = transitionX.value;
      contextY.value = transitionY.value;
      scale.value = withTiming(1.1);
    })
    .onChange(event => {
      transitionX.value = contextX.value + event.translationX;
      transitionY.value = contextY.value + event.translationY;
      runOnJS(updateZindex)(10);
    })
    .onEnd(event => {
      const x = contextX.value + event.translationX;
      const y = contextY.value + event.translationY;
      transitionX.value = x;
      transitionY.value = y;
      scale.value = withTiming(1);
      runOnJS(updateZindex)(-10);
      const cellWidth = width / 4;
      const cellHeight = 100;
      const indexX = Math.floor(x / cellWidth);
      const indexY = Math.floor(y / cellHeight);
      let actualIndexX = rowIndex + 1 + indexX;
      let actualIndexY = columnIndex + 1 + indexY;
      actualIndexY = Math.min(actualIndexY, data?.[actualIndexX]?.length);
      if (
        (actualIndexX !== rowIndex && actualIndexY !== columnIndex) ||
        data?.[actualIndexX]?.[actualIndexY]
      ) {
        runOnJS(updateState)(actualIndexX, actualIndexY);
      }
    });

  const boxStype = useAnimatedStyle(() => {
    const zIndex = interpolate(transitionX.value, [-1, 0, 1], [100, -10, 100]);

    return {
      transform: [
        {translateX: transitionX.value},
        {translateY: transitionY.value},
        {scale: scale.value},
      ],
      zIndex: zIndex,
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.box, boxStype]}>
        <Text>{`Title ${value}`}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default RowElement;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 90,
    backgroundColor: '#f0c03c',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
