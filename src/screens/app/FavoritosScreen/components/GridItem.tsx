import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'styled-components/native';
import { IGrid } from '../../../../interfaces/types';
import { CardMark } from '../style'

const GridItem = ({ id, colorBg, nextScreen }: IGrid) => {
    const { markColors } = useTheme();
    // @ts-ignore 
    return <CardMark key={id} colorBg={markColors[100 * id]} onPress={nextScreen} />
}

export default GridItem
