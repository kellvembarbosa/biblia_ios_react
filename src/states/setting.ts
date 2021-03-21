import { createState, State, useState } from '@hookstate/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePersistor, { PersistorWrapper } from 'hookstate-persist';
import { Platform } from 'react-native';
import { darkTheme } from '../styles/theme';
import { deviceLanguage, getRandomInt } from '../utils/settings';

export interface SettingProps {
    fontBibleSize: number;
    fontHomeSize: number;
    notifications: boolean;
    firstOpen: boolean;
    uuid: string;
}
// fontBibleSize: 1, fontHomeSize: 1, notifications: true, firstOpen: true, uuid: ''
const initialState = PersistorWrapper({ fontBibleSize: 1, fontHomeSize: 1, notifications: true, firstOpen: true, uuid: '' } as SettingProps);

const settingState = createState<SettingProps>(initialState);

const settingsPersistor = CreatePersistor({
    key: '@setting', // store name
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



    isFirstOpen: () => {
        console.log(s.value.firstOpen);
        return s.value.firstOpen
    },
    registerFirstOpen: (uuid: string) => s.set(f => {

        console.log(uuid);
        return { ...f, firstOpen: false, uuid: uuid }
    }),

    updateInstallation: () => {
        // @ts-ignore
        if (s.value.hydrateTime != null && s.value.firstOpen && s.value.uuid.length < 1) {
            const uuid = (Date.now() + getRandomInt(0, 100000)).toString();
            console.log('uuid', uuid, 'firstOpen', s.value.firstOpen, 'uuid', s.value.uuid.length);

            const createInstallation = async () => {
                const Installation = Parse.Object.extend(new Parse.Installation);
                const installation = new Installation();

                installation.set('deviceType', Platform.OS);
                installation.set('localeIdentifier', deviceLanguage());
                installation.set('installationId', uuid);
                await installation.save();
            };

            createInstallation();

            s.set(f => {
                console.log(uuid);
                return { ...f, firstOpen: false, uuid: uuid }
            })
        }
    }
})

export const useSettings = () => settingHook(useState(settingState).attach(settingsPersistor));