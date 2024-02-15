/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {View} from 'react-native';
import SwipeFlatlist from './src/SwipeFlatlist/SwipeFlatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './src/BottomTab/BottomTab';
import DrawerScreen from './src/DrawerScreen/DrawerScreen';
import Slider from './src/Slider/Slider';
import ImageCarousel from './src/ImageCarousel/ImageCarousel';
import CircularProgress from './src/CircularProgress/CircularProgress';

function App(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

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
          <CircularProgress />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
