import AsyncStorage from "@react-native-community/async-storage"
import { Platform, NativeModules, Share } from "react-native";

export const setInt = async (key: string, value: number) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value.toString())
    } catch (e) {
        // saving error
    }
    return value;
}

export const setString = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
        // saving error
    }
}

export const getInt = async (key: string, defaultValue: number) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`)
        if (value !== null) {
            // value previously stored
            return parseInt(value);
        } else {
            const newValue = await setInt(key, defaultValue);
            return defaultValue;
        }
    } catch (e) {
        // error reading value
    }
    return defaultValue;
}



export const getString = async (key: string, defaultValue: string) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`)
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
    return defaultValue;
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const deviceLanguage = () => {
    const deviceLanguage: string =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    return deviceLanguage;
}

export const onShare = async (share: string, onSuccess?: Function) => {
    try {
        const result = await Share.share({
            message: share,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
                if (onSuccess) onSuccess();
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        console.log(error.message);
    }
};