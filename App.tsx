/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import SwipeFlatlist from './src/SwipeFlatlist/SwipeFlatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>{/* <SwipeFlatlist /> */}</View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
