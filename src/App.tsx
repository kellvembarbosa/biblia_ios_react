import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './routers';
import { ThemeProvider } from "styled-components/native";
import { useFonts } from 'expo-font';
import { useMyTheme } from './states/theme';
import { NativeModules, Platform } from 'react-native';
import i18n from 'i18n-js';
import { useSettings } from './states/setting';
import { initializeParse } from '@parse/react-native';
import { deviceLanguage, getRandomInt } from './utils/settings';


i18n.locale = deviceLanguage();
i18n.fallbacks = true;

//const AsyncStorage = require('react-native').AsyncStorage;
initializeParse(
  'https://parse.kellvem.pt/biblia',
  'com.biblia',
  'javascriptKeyKellvem'
);

export default function App() {

  const currentTheme = useMyTheme();
  const settings = useSettings();

  React.useEffect(() => {
    settings.updateInstallation();
  })


  // React.useEffect(() => {
  //   const isFirstOpen = settings.isFirstOpen();
  //   console.log('isFirstOpen', isFirstOpen);

  //   if (isFirstOpen) {
  //     const uuid = (Date.now() + getRandomInt(0, 100000)).toString();
  //     const createInstallation = async () => {
  //       const Installation = Parse.Object.extend(new Parse.Installation);
  //       const installation = new Installation();

  //       installation.set('deviceType', Platform.OS);
  //       installation.set('installationId', uuid);
  //       await installation.save();
  //       settings.registerFirstOpen(uuid);
  //     };

  //     createInstallation();
  //   }

  // }, []);

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
