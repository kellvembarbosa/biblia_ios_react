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

export interface INumberVerse {
    isFirst?: boolean;
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

export interface IArrowButton {
    hide?: boolean;
}