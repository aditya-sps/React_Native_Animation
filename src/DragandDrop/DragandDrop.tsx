import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ColumnElement from './ColumnElement';

const DragandDrop = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState([
    [1, 2, null, 4, null, 6, 7],
    [11, null, null, 14, 15, 16, null],
    [21, 22, null, 24, null, 26, 27],
    [31, null, 33, null, 35, 36, 37],
    [null, 42, 43, 44, null, 46, null],
    [null, 52, 53, 54, 55, null, 57],
  ]);

  return (
    <View
      style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <Text style={styles.eventText}>EventList</Text>
      <ScrollView bounces={false}>
        {/* <FlatList
          data={data}
          style={{zIndex: 0}}
          horizontal
          renderItem={({item, index}) => (
            <ColumnElement
              item={item}
              index={index}
              key={index?.toString()}
              data={data}
              setData={setData}
            />
          )}
          keyExtractor={(item, index) => index?.toString()}
        /> */}
        <ScrollView horizontal bounces={false}>
          <View style={{flexDirection: 'row'}}>
            {data?.map((item, index) => (
              <ColumnElement
                item={item}
                index={index}
                key={index?.toString()}
                data={data}
                setData={setData}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default DragandDrop;

const styles = StyleSheet.create({
  eventText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
