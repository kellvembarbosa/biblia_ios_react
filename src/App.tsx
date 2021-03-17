import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './routers';
import { ThemeProvider } from "styled-components/native";
import Parse from 'parse/react-native.js'
import { useFonts } from 'expo-font';
import { useMyTheme } from './states/theme';

const AsyncStorage = require('react-native').AsyncStorage;
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('com.biblia', 'javascriptKeyKellvem');
Parse.serverURL = 'https://parse.kellvem.pt/biblia';

export default function App() {
  const currentTheme = useMyTheme();
  const [loaded] = useFonts({
    'Roboto': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('../assets/fonts/Roboto-BoldItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider theme={currentTheme.get()}>
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </ThemeProvider>
  );
}
