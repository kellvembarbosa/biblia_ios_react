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
    padding: 8px 4px;
`;

export const BibliaRow = styled.TouchableOpacity`
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
    margin: 0 4px;
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