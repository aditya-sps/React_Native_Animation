import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import CalenderView from './src/CalenderView/CalenderView';
import TinderSwipe from './src/TinderSwipe/TinderSwipe';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CalenderView" component={CalenderView} />
      <Stack.Screen name="TinderSwipe" component={TinderSwipe} />
    </Stack.Navigator>
  );
};

export default Navigation;
