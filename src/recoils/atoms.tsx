import React from "react";
import { View } from "react-native";
import { atom } from "recoil";

const snapPointsState = atom({
    key: 'snapPointsState', // unique ID (with respect to other atoms/selectors)
    default: [0, 0, 0], // default value (aka initial value)
});

const contentBottomSheetState = atom({
    key: 'contentBottomSheetState', // unique ID (with respect to other atoms/selectors)
    default: <></>, // default value
});


export { snapPointsState, contentBottomSheetState }