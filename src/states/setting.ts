import { createState, State, useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePersistor from 'hookstate-persist';

export interface SettingProps {
    fontBibleSize: number;
    fontHomeSize: number;
    notifications: boolean;
}

const settingState = createState<SettingProps>({ fontBibleSize: 1, fontHomeSize: 1, notifications: true });

const settingsPersistor = CreatePersistor({
    key: '@settings', // store name
    engine: AsyncStorage, // storage engine which implements getItem & setItem
});

const settingHook = (s: State<SettingProps>) => ({
    fontBibleSize: () => s.value.fontBibleSize,

    upBibleSize: () => s.set(v => {
        return { ...v, fontBibleSize: v.fontBibleSize + 1 }
    }),

    downBibleSize: () => s.set(v => {
        return { ...v, fontBibleSize: v.fontBibleSize - 1 }
    }),

    fontHomeSize: () => s.value.fontHomeSize,

    upHomeSize: () => s.set(v => {
        return { ...v, fontHomeSize: v.fontHomeSize + 1 }
    }),

    downHomeSize: () => s.set(v => {
        return { ...v, fontHomeSize: v.fontHomeSize - 1 }
    }),

    isNotifications: () => s.value.notifications,

    toggleNotification: () => s.set(n => {
        return { ...n, notifications: !n.notifications }
    }),
})

export const useSettings = () => settingHook(useState(settingState).attach(settingsPersistor));