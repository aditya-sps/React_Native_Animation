import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const natigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Calendar Drag/Drop Animation"
        onPress={() => natigation.navigate('CalenderView' as never)}
      />
      <View style={{marginTop: 10}} />
      <Button
        title="Tinder swipe clone Animation"
        onPress={() => natigation.navigate('TinderSwipe' as never)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
