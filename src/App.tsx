import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './routers';
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </ThemeProvider>
  );
}
