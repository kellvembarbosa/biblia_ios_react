import React from 'react'
import { RenderRowProps } from '../../../../interfaces/types';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Card } from '../../../../styles/globals';

const RenderRow = ({ bookName, nextScreen }: RenderRowProps) => {
    return (
        // @ts-ignore
        <CardBook onPress={nextScreen}>
            <TitleBook>{bookName}</TitleBook>
            <MaterialIcons name="keyboard-arrow-right" size={26} style={{ marginRight: 8 }} color='gray' />
        </CardBook>
    )
}

export const CardBook = styled(Card)`
    flex: 1; 
    flex-direction: row; 
    justify-content: space-between;
    padding: 12px 0 12px 12px;
    align-items: center;
`

export const TitleBook = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colorText};
    font-family: 'Roboto-Light';
`

export default RenderRow
