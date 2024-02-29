import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';

const CalenderMeeting = ({
  meeting,
  updateZindex,
  weekData,
  setWeek,
  columnIndex,
  rowIndex,
}: any) => {
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [minuteDifference, setMinuteDifference] = useState(0);
  const [topDifference, setTopDifference] = useState(0);
  const width = (Dimensions.get('window').width - 60) / 7;
  dayjs.extend(customParseFormat);
  dayjs.extend(isBetween);
  const layoutViewHeight = Platform.OS === 'android' ? 116 : 108;

  useEffect(() => {
    if (transitionX.value !== 0 && transitionY.value !== 0) {
      transitionX.value = 0;
      transitionY.value = 0;
      scale.value = 1;
    }
  }, [weekData]);

  useEffect(() => {
    if (meeting) {
      const difference = dayjs(meeting?.endTime, 'hh:mm A').diff(
        dayjs(meeting?.startTime, 'hh:mm A'),
        'm',
      );
      setMinuteDifference(difference);
      setTopDifference(getMarginTop(meeting?.startTime));
    }
  }, [meeting]);

  const getMarginTop = (startTime: string) => {
    const existhours = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
    const splitTime = startTime?.split(':');
    const extractHrs = Number(splitTime?.[0]);
    const extractMins = Number(splitTime?.[1]?.slice(0, 2));
    const hrsIndex = existhours?.findIndex(item => item === extractHrs);
    let heightPixel = 0;
    existhours?.map((_, index) => {
      if (index <= hrsIndex) {
        heightPixel = heightPixel + layoutViewHeight;
      }
    });
    // existmins?.map(item => {
    //   if (item < extractMins) {
    //     heightPixel = heightPixel + minsPixels;
    //   }
    // });
    heightPixel = heightPixel + (extractMins / 60) * layoutViewHeight;
    return heightPixel;
  };

  const addTime = (hours: number, minutes: number, draggedXIndex: number) => {
    let startTime = dayjs('08:00 AM', 'hh:mm A').add(hours, 'h');
    startTime = startTime.add(minutes, 'm');
    const endTIme = startTime.add(minuteDifference, 'm');
    let meetingCollides = false;
    weekData?.[draggedXIndex]?.meetings?.map(item => {
      const meetStartTime = dayjs(item?.startTime, 'hh:mm A').subtract(1, 'm');
      const meetEndTime = dayjs(item?.endTime, 'hh:mm A').add(1, 'm');
      if (
        startTime?.isBetween(meetStartTime, meetEndTime) ||
        endTIme?.isBetween(meetStartTime, meetEndTime)
      ) {
        meetingCollides = true;
      }
    });

    if (meetingCollides) {
      transitionX.value = withTiming(0);
      transitionY.value = withTiming(0);
    } else {
      let newArr = [...weekData];
      let filterMeet = newArr[columnIndex]?.meetings?.filter(
        (_, index) => index !== rowIndex,
      );
      newArr[columnIndex].meetings = filterMeet;
      let addMeet = newArr[draggedXIndex];
      if (addMeet?.meetings) {
        addMeet?.meetings.push({
          title: meeting?.title,
          startTime: dayjs(startTime).format('hh:mm A'),
          endTime: dayjs(endTIme).format('hh:mm A'),
        });
      } else {
        addMeet.meetings = [];
        addMeet?.meetings.push({
          title: meeting?.title,
          startTime: dayjs(startTime).format('hh:mm A'),
          endTime: dayjs(endTIme).format('hh:mm A'),
        });
      }
      newArr[draggedXIndex] = addMeet;
      setWeek(newArr);
    }
  };

  const tapGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart(() => {
      scale.value = withTiming(1.1);
    })
    .onChange(event => {
      transitionX.value = event.translationX;
      transitionY.value = event.translationY;
      runOnJS(updateZindex)(10);
    })
    .onEnd(event => {
      const x = event.translationX;
      const y = event.translationY;
      transitionX.value = x;
      transitionY.value = y;
      scale.value = withTiming(1);
      runOnJS(updateZindex)(-10);
      const draggedXIndex = Math.round((columnIndex * width + x) / width);
      let topMarginPixel = topDifference + y;
      topMarginPixel = Math.max(topMarginPixel, 0);
      const hour = Math.floor(topMarginPixel / layoutViewHeight);
      const minutes =
        Math.round(
          (topMarginPixel % layoutViewHeight) / (layoutViewHeight / 4),
        ) * 15;
      if (draggedXIndex >= 0 && draggedXIndex < 7) {
        runOnJS(addTime)(hour, minutes, draggedXIndex);
      } else {
        transitionX.value = withTiming(0);
        transitionY.value = withTiming(0);
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
    <GestureDetector
      key={columnIndex?.toString() + rowIndex?.toString()}
      gesture={tapGesture}>
      <Animated.View
        style={[
          styles.meetingView,
          {
            marginTop: getMarginTop(meeting?.startTime),
            height:
              getMarginTop(meeting?.endTime) - getMarginTop(meeting?.startTime),
          },
          boxStype,
        ]}>
        <Text style={{color: 'white'}}>{meeting?.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default CalenderMeeting;

const styles = StyleSheet.create({
  meetingView: {
    backgroundColor: '#ff2b6e',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
