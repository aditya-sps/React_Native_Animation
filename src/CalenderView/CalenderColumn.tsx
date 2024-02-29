import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import CalenderMeeting from './CalenderMeeting';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const CalenderColumn = ({item, weekData, setWeek, columnIndex}: any) => {
  const width = (Dimensions.get('window').width - 60) / 7;
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
      style={[styles.timeHorizontal, {width: width}, containerStyle]}>
      {item?.meetings?.map((meeting: any, meetingIndex: number) => (
        <CalenderMeeting
          meeting={meeting}
          key={meetingIndex?.toString()}
          updateZindex={updateZindex}
          weekData={weekData}
          setWeek={setWeek}
          columnIndex={columnIndex}
          rowIndex={meetingIndex}
        />
      ))}
    </Animated.View>
  );
};

export default CalenderColumn;

const styles = StyleSheet.create({
  timeHorizontal: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#b3b3b3',
  },
});
