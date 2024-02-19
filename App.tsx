/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SwipeFlatlist from './src/SwipeFlatlist/SwipeFlatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './src/BottomTab/BottomTab';
import DrawerScreen from './src/DrawerScreen/DrawerScreen';
import Slider from './src/Slider/Slider';
import ImageCarousel from './src/ImageCarousel/ImageCarousel';
import CircularProgress from './src/CircularProgress/CircularProgress';
import SplashScreen from 'react-native-splash-screen';
import FloatingTextInput from './src/FloatingTextInput';
import CustomCurve from './src/CustomCurve';
import ScrollHeader from './src/ScrollHeader/ScrollHeader';
import MovingButton from './src/MovingButton/MovingButton';
import TopNavigator from './src/TopNavigation/TopNavigator';

function App(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {/* <SwipeFlatlist /> */}

          {/* <BottomTab
            visible={visible}
            onClose={() => setVisible(false)}
            height={400}>
            <Text>Hi</Text>
          </BottomTab>
          <View style={{marginTop: 150}}>
            <Text onPress={() => setVisible(true)}>Touch</Text>
          </View> */}

          {/* <DrawerScreen /> */}

          {/* <Slider /> */}

          {/* <ImageCarousel /> */}

          {/* <CircularProgress /> */}

          {/* <FloatingTextInput
            value={value}
            setValue={setValue}
            placeholder={'First Name'}
          /> */}

          {/* <CustomCurve color={'#f59e42'} /> */}

          {/* <ScrollHeader /> */}

          {/* <MovingButton /> */}

          <TopNavigator />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
