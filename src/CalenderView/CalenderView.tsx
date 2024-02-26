import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';

const CalenderView = () => {
  const insets = useSafeAreaInsets();
  const width = (Dimensions.get('window').width - 60) / 7;
  const [week, setWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const times = [
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
  ];

  useEffect(() => {
    getWeekDay(0);
  }, []);

  const getWeekDay = (skipDays: number) => {
    const currentWeek = [];
    Array(7)
      .fill(1)
      .map((_, index) =>
        currentWeek.push(
          dayjs(skipDays === 0 ? undefined : week[0]).add(
            index + skipDays,
            'day',
          ),
        ),
      );
    setWeek(currentWeek);
    setSelectedDate(currentWeek[0]);
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.header, {paddingTop: Math.max(insets.top, 20)}]}>
        <View style={styles.rowCenter}>
          <Image
            source={require('../assetsIcons/calendar.png')}
            style={{tintColor: 'white'}}
          />
          <View
            style={[
              styles.rowCenter,
              {
                marginLeft: 20,
              },
            ]}>
            <TouchableOpacity onPress={() => getWeekDay(-7)}>
              <Image
                source={require('../assetsIcons/leftChevron.png')}
                style={{tintColor: 'white', marginRight: 10}}
              />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>
              {dayjs(week?.[0])?.format('MMM DD, YYYY')}
            </Text>
            <TouchableOpacity onPress={() => getWeekDay(7)}>
              <Image
                source={require('../assetsIcons/rightChevron.png')}
                style={{tintColor: 'white', marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowCenter}>
          <View
            style={[
              styles.rowCenter,
              {
                marginRight: 20,
              },
            ]}>
            <Text style={{color: 'white'}}>Week</Text>
            <Image
              source={require('../assetsIcons/down.png')}
              style={{tintColor: 'white'}}
            />
          </View>
          <Image
            source={require('../assetsIcons/list.png')}
            style={{tintColor: 'white'}}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={{uri: 'https://picsum.photos/id/237/200/300'}}
          style={{height: 35, width: 35}}
          borderRadius={18}
        />
        <Text style={styles.title}>Jag Brar</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{width: 60}} />
        {week?.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.dateBorder,
              {width: width},
              selectedDate === item && {backgroundColor: '#f0ab43'},
            ]}
            onPress={() => setSelectedDate(item)}
            key={index?.toString()}>
            <Text
              style={[styles.date, selectedDate === item && {color: 'white'}]}>
              {dayjs(item)?.format('D')}
            </Text>
            <Text
              style={[styles.day, selectedDate === item && {color: 'white'}]}>
              {dayjs(item)?.format('ddd')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.timeHorizontal, {width: 60}]}>
            {times?.map((item, index) => (
              <View style={styles.timeContainer} key={index?.toString()}>
                <Text style={styles.hours}>{item}</Text>
                <Text style={styles.minutes}>15</Text>
                <Text style={styles.minutes}>30</Text>
                <Text style={styles.minutes}>45</Text>
              </View>
            ))}
          </View>
          {week?.map((item, index) => (
            <View
              style={[styles.timeHorizontal, {width: width}]}
              key={index?.toString()}>
              {/* <Text style={styles.date}>{dayjs(item)?.format('D')}</Text>
              <Text style={styles.day}>{dayjs(item)?.format('ddd')}</Text> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CalenderView;

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    backgroundColor: '#f0ab43',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  dateBorder: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#b3b3b3',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 2,
  },
  timeHorizontal: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#b3b3b3',
  },
  timeContainer: {
    alignSelf: 'center',
  },
  hours: {
    color: 'black',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  minutes: {
    color: 'black',
    textAlign: 'right',
    marginBottom: 10,
  },
  date: {
    textAlign: 'center',
    fontSize: 24,
  },
  day: {
    textAlign: 'center',
  },
});
