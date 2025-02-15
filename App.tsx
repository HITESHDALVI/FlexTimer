import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import History from './src/screens/history/History';
import Home from './src/screens/home/Home';
import AddTimer from './src/screens/timer/AddTimer';
import {BackgroundProvider} from './src/context/BackgroundContext';

const Stack = createNativeStackNavigator();

const App = () => (
  <GestureHandlerRootView>
    <BackgroundProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTimer" component={AddTimer} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </BackgroundProvider>
  </GestureHandlerRootView>
);

export default App;
