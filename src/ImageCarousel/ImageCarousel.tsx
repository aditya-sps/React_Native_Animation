import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ImageView from './ImageView';

const ImageCarousel = () => {
  const scrollValue = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollValue.value = event.contentOffset.x;
  });
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <Animated.ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {images?.map((item, index) => (
            <ImageView
              key={item?.id}
              item={item}
              index={index}
              scrollValue={scrollValue}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({});

const images = [
  {
    id: '1',
    imageUrl:
      'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: '2',
    imageUrl:
      'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: '3',
    imageUrl:
      'https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: '4',
    imageUrl:
      'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
