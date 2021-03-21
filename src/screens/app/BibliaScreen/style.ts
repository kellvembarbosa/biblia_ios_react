import { TextProps, TouchableOpacityProps, ViewProps } from 'react-native';
import { IArrowButton, IContainerBottomSheet, INumberVerse, ISelected, ISelectedButton } from '../../../interfaces/types';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { getFontSize } from '../../../utils/fontsizes';

export const Actions = styled.View`
    width: 100%; 
    flex-direction:row;
    justify-content: space-between;
    margin: 0;
`;

export const ContainerBiblia = styled.View`
    flex: 1; 
    padding: 4px 0px;
`;

export const BibliaRow = styled.TouchableOpacity<{ bgColor?: string; }>`
    background-color: ${({ bgColor, theme }) => bgColor && bgColor.length > 0 ? bgColor : theme.backgroundColor};
    border-radius: 4px;
    padding: 0px 6px;
    margin: 3px;
`


export const BibliaRowOnBible = styled.TouchableOpacity<{ bgColor?: string; }>`
    background-color: ${({ bgColor, theme }) => bgColor && bgColor.length > 0 ? bgColor : theme.backgroundColor};
    border-radius: 4px;
    padding: 2px 4px;
    margin: 2px 0px;
`

export const ContainerSelectBook = styled.TouchableOpacity<ISelected & TouchableOpacityProps>`
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
    background-color: ${({ theme, isSelected }) => isSelected ? theme.secondaryColor : theme.backgroundColor};
    padding: 12px 12px;
    border-radius: 4px;
    justify-content: space-between;
`

export const ContainerSelectChapter = styled.TouchableOpacity<ISelected & TouchableOpacityProps>`
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    background-color: ${({ theme, isSelected }) => isSelected ? theme.secondaryColor : theme.backgroundColor};
    padding: 12px 12px;
    margin: 4px;
    border-radius: 4px;
`

export const SelectedButton = styled.TouchableOpacity<ISelectedButton & ViewProps>`
    flex: ${({ flex }) => flex ?? 1};
    background-color: ${({ theme }) => theme.cardColor};
    padding: 8px;
    border-radius: 4px;
    justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
    align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
`;


export const IconLang = styled(FontAwesome)`
  padding: 4px;
  font-size: 18px;
`;

export const ArrowRight = styled.TouchableOpacity<IArrowButton & TouchableOpacityProps>`
    width: 40px;
    height: 40px;         
    background-color: ${({ theme }) => theme.primaryColor};                                  
    position: absolute;                                         
    bottom: 10px;                                                   
    right: 0px;
    justify-content: center; 
    align-items: center; 
    border-radius: 20px;
    display: ${({ hide }) => hide ? 'none' : 'flex'}; 
`
export const ArrowLeft = styled.TouchableOpacity<IArrowButton & TouchableOpacityProps>`
    width: 40px;
    height: 40px;           
    background-color: ${({ theme }) => theme.primaryColor};                                  
    position: absolute;                                         
    bottom: 10px;                                                   
    left: 0px;
    justify-content: center; 
    align-items: center; 
    border-radius: 20px;
    display: ${({ hide }) => hide ? 'none' : 'flex'}; 
`

export const ContainerArrows = styled.View`
    justify-content: space-between;
`

export const SelectedButtonText = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: ${getFontSize(18)};
`;

export const SelectButtonBook = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: ${getFontSize(22)};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: ${getFontSize(22)};
    font-weight: bold;
    padding: 8px 8px 4px 4px;
`;

export const SelectedBg = styled.View<{ bgColor: string; }>`
    color: ${({ theme, bgColor }) => bgColor ? 'white' : theme.colorText};
    margin: 6px 0px;
    border-radius: 6px;
    background-Color: ${({ theme, bgColor }) => bgColor ? bgColor : theme.cardColor};
`

export const SelectedVerse = styled.Text<{ bgColor: string; }>`
    color: ${({ theme, bgColor }) => bgColor ? 'white' : theme.colorText};
    font-size: ${getFontSize(18)};
    font-family: 'Roboto-Bold';
    padding: 8px 8px 4px 4px;
    text-align: center;
`;

export const TitleVerseInfo = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: ${getFontSize(18)};
    font-family: 'Roboto-Light';
    padding: 8px 8px 4px 4px;
    text-align: center;
`;