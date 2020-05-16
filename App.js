import 'react-native-gesture-handler';
import React from 'react';

import Login from './screens/Login';
import Home from './screens/Home';
import Budget from './screens/Budget';
import Expenses from './screens/Expenses';
import Reminders from './screens/Reminders';

import {createStore} from 'redux';
import allReducers from './redux/reducer';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();  
  const store = createStore(allReducers);
  
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Reminders" component={Reminders}/>
          <Stack.Screen name="Expenses" component={Expenses}/>
          <Stack.Screen name="Budget" component={Budget}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}