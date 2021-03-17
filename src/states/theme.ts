import { createState, State, useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePersistor, { PersistorWrapper } from 'hookstate-persist';
import { DefaultTheme } from 'styled-components/native';
import { darkTheme, lightTheme } from '../styles/theme';

const wrapped = PersistorWrapper(darkTheme);

const defaultThemeState = createState(wrapped);

const themePersistor = CreatePersistor({
    key: '@themePersist', // store name
    engine: AsyncStorage, // storage engine which implements getItem & setItem
});

defaultThemeState.attach(themePersistor)

const themeState = (s: State<DefaultTheme>) => ({

    get: () => {
        console.log('value', s.value.isDarkTheme);
        return s.value;
    },

    changeTheme: () => {
        console.log('isDarkTheme', s.value.isDarkTheme);
        return s.set(ct => ct.isDarkTheme ? lightTheme : darkTheme)
    }
})

// @ts-ignore 
export const useMyTheme = () => themeState(useState(defaultThemeState))