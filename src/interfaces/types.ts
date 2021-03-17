import React from "react";

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
}

export interface VerseProps {
    item: any;
    index: number;
    onPress?: Function;
}

export interface IBiblia {
    primary: boolean;
    isActive: boolean;
    version: string;
    lang: string;
    livro: any;
}

export interface IArrowButton {
    hide?: boolean;
}

export interface ISelected {
    isSelected?: boolean;
}