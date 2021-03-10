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