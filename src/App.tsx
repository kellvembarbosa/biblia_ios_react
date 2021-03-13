import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './routers';
import { ThemeProvider } from "styled-components/native";
import { RecoilRoot, useRecoilValue } from 'recoil';
import { defualtThemeState } from './recoils/atoms';
import Parse from 'parse/react-native.js'

const AsyncStorage = require('react-native').AsyncStorage;
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('QB2utfmO5d34QzKcuOhFk5iomKpaYpQi4ajl7qlm', 'p5XkIY2uwURpqE8CkbJn1MlPviwowRwJr8nMYf9h');
Parse.serverURL = 'https://bibliasagrada.b4a.io/';

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
