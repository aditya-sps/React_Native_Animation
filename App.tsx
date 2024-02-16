/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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
          </BottomTab> */}
          {/* <DrawerScreen /> */}
          {/* <Slider /> */}
          {/* <ImageCarousel /> */}
          {/* <CircularProgress /> */}
          <FloatingTextInput
            value={value}
            setValue={setValue}
            placeholder={'First Name'}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
