import React, { memo } from 'react'
import { INumberVerse, IVerseText, VerseProps } from '../../../../interfaces/types'
import styled from 'styled-components/native';
import { TextProps } from 'react-native';
import { BibliaRow } from '../style';
import { getFontSize } from '../../../../utils/fontsizes'
import { useSettings } from '../../../../states/setting';

const VerseRow = ({ item, index }: VerseProps) => {
    const settings = useSettings();
    return (
        <BibliaRow key={index}>
            <VerseText fontSize={18} scaling={settings.fontBibleSize()}>
                <NumberVerse fontSize={18} scaling={settings.fontBibleSize()}>
                    {`${index + 1} `}
                </NumberVerse>
                <VerseText fontSize={18} scaling={settings.fontBibleSize()}>
                    {item.verse}
                </VerseText>
            </VerseText>
        </BibliaRow>
    )
}


const NumberVerse = styled.Text<INumberVerse & TextProps>`
    color: ${({ theme }) => theme.primaryColor};
    font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
    margin: 8px;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto-Bold';
`
const VerseText = styled.Text<IVerseText & TextProps>`
    color: ${({ theme }) => theme.colorText};
    font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
    margin-bottom: 12px;
    font-family: 'Roboto-Light';
    line-height: ${({ scaling }) => getFontSize(24, scaling)};
`

export default memo(VerseRow)

