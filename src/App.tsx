import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './routers';
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { defualtThemeState } from './recoils/atoms';

const ThemedApp = () => {
  const themeValue = useRecoilValue(defualtThemeState)
  return (
    <ThemeProvider theme={themeValue}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default function App() {
  return (

    <RecoilRoot>
      <ThemedApp />
    </RecoilRoot>

  );
}
