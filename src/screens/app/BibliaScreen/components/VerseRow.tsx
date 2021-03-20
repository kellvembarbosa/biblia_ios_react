import React, { memo } from 'react'
import { INumberVerse, IVerseText, VerseProps } from '../../../../interfaces/types'
import styled from 'styled-components/native';
import { TextProps } from 'react-native';
import { BibliaRow } from '../style';
import { getFontSize } from '../../../../utils/fontsizes'
import { useSettings } from '../../../../states/setting';

const VerseRow = ({ item, index, openSheet }: VerseProps & { openSheet: Function }) => {
    const settings = useSettings();
    return (
        <BibliaRow onPress={() => { openSheet() }} bgColor={item.marked} key={index}>
            <VerseText fontSize={18} scaling={settings.fontBibleSize()}>
                <NumberVerse fontSize={18} scaling={settings.fontBibleSize()}>
                    {`${index + 1} `}
                </NumberVerse>
                <VerseText fontSize={18} scaling={settings.fontBibleSize()} colorBg={item.marked}>
                    {
                        item.verse
                    }
                </VerseText>
            </VerseText>
        </BibliaRow>
    )
}

const NumberVerse = styled.Text<INumberVerse & TextProps>`
    color: ${({ theme }) => theme.primaryColor};
    font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
    flex: 1;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto-Bold';
`
const VerseText = styled.Text<IVerseText & TextProps>`
    color: ${({ theme, colorBg }) => colorBg && colorBg.length > 0 ? 'white' : theme.colorText};
    font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
    margin: 3px 0;
    font-family: 'Roboto-Light';
    line-height: ${({ scaling }) => getFontSize(24, scaling)};
`

export default memo(VerseRow)

