/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import Login from './src/Login';
import SwipeFlatlist from './src/SwipeFlatlist/SwipeFlatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* <Login /> */}
        <SwipeFlatlist />
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
