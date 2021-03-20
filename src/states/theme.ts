import { createState, State, useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePersistor, { PersistorWrapper } from 'hookstate-persist';
import { DefaultTheme } from 'styled-components/native';
import { darkTheme, lightTheme } from '../styles/theme';

const wrapped = PersistorWrapper(darkTheme);

const defaultThemeState = createState(wrapped);

const themePersistor = CreatePersistor({
    key: '@themePersist',
    engine: AsyncStorage,
});

defaultThemeState.attach(themePersistor)

const themeState = (s: State<DefaultTheme>) => ({

    get: () => {
        return s.value;
    },

    changeTheme: () => {
        return s.set(ct => ct.isDarkTheme ? lightTheme : darkTheme)
    }
})

// @ts-ignore 
export const useMyTheme = () => themeState(useState(defaultThemeState))