import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from './_layout';
import MapScreen from './map';
import ReportScreen from './report';
import SalariesScreen from './salaries';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Layout} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
        />
        <Stack.Screen 
          name="Report" 
          component={ReportScreen} 
        />
        <Stack.Screen 
          name="Salaries" 
          component={SalariesScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}