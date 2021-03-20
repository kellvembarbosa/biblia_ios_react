import React from "react";
import { GestureResponderEvent } from "react-native";

export interface ISocialicons {
    color: string;
}

export interface ISelectedButton {
    flex?: number | string;
    justifyContent?: string;
    alignItems?: string;
}

export interface IBottomSheetProvider {
    children: React.ReactNode;
}

export interface IContainerBottomSheet {
    height: string;
}

export interface ITipography {
    fontSize: number;
    scaling?: number;
}

export interface INumberVerse {
    fontSize: number;
    scaling?: number;
}

export interface IVerseText {
    isFirst?: boolean;
    fontSize: number;
    scaling?: number;
    colorBg?: string;
}

export interface VerseProps {
    item: any;
    index: number;
}

export interface IBiblia {
    primary: boolean;
    isActive: boolean;
    version: string;
    lang: string;
    livro: any;
}

// export interface IMarkedChapters {
//     abbrev: string;
//     name: string;
//     livro: IBooks[];
// }

export interface IBooks {
    abbrev: string;
    name: string;
    chapters: IChapters[];
}

export interface IChapters {
    verses: IVerses[]
}

export interface IVerses {
    verse: string;
    marked: string;
    favorite: number;
}
export interface IArrowButton {
    hide?: boolean;
}

export interface ISelected {
    isSelected?: boolean;
}

export interface RenderRowProps {
    bookName: string;
    nextScreen: Function;
}

export interface ICardMark {
    colorBg: string;
}

export interface IGrid {
    id: number;
    colorBg: string;
    nextScreen?: Function
}