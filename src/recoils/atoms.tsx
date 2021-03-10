import React from "react";
import { View } from "react-native";
import { atom } from "recoil";
import { DefaultTheme } from "styled-components/native";
import { darkTheme } from "../styles/theme";

const snapPointsState = atom({
    key: 'snapPointsState', // unique ID (with respect to other atoms/selectors)
    default: [0, 0, 0], // default value (aka initial value)
});

const defualtThemeState = atom<DefaultTheme>({
    key: 'defualtThemeState', // unique ID (with respect to other atoms/selectors)
    default: darkTheme, // default value (aka initial value)
});

const contentBottomSheetState = atom({
    key: 'contentBottomSheetState', // unique ID (with respect to other atoms/selectors)
    default: <></>, // default value
});


export { snapPointsState, contentBottomSheetState, defualtThemeState }