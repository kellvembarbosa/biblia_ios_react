import React from 'react'
import { INumberVerse, VerseProps } from '../../../../interfaces/types'
import styled from 'styled-components/native';
import { TextProps } from 'react-native';
import { BibliaRow } from '../style';

const VerseRow = ({ item, index }: VerseProps) => {
    return (
        <BibliaRow key={index}>
            <VerseText>
                <NumberVerse isFirst={false}>
                    {`${index + 1} `}
                </NumberVerse>
                <VerseText>
                    {item.verse}
                </VerseText>
            </VerseText>
        </BibliaRow>
    )
}


export const NumberVerse = styled.Text<INumberVerse & TextProps>`
    color: ${({ theme }) => theme.primaryColor};
    font-size: ${({ isFirst }) => isFirst ? '44px' : '22px'};
    margin: 8px;
    flex: 1;
    justify-content: center;
    align-items: center;
`
export const VerseText = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: 20px;
    margin-bottom: 12px;
`

export default VerseRow
