import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AnimateImage from './AnimateImage';

const TinderSwipe = () => {
  const insets = useSafeAreaInsets();

  const [data, setData] = useState([
    {
      id: '1',
      uri: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: '2',
      uri: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: '3',
      uri: 'https://picsum.photos/200/300?grayscale',
    },
    {
      id: '4',
      uri: 'https://picsum.photos/200/300/?blur',
    },
    {
      id: '5',
      uri: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
    },
    {
      id: '6',
      uri: 'https://picsum.photos/200/300/?blur',
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      {data?.map((item, index) => {
        return (
          <AnimateImage
            key={item?.id}
            uri={item.uri}
            index={index}
            data={data}
            setData={setData}
          />
        );
      })}
    </View>
  );
};

export default TinderSwipe;

const styles = StyleSheet.create({});
