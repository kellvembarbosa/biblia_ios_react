import { ViewProps } from 'react-native';
import { ISelectedButton } from 'src/interfaces/types';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Actions = styled.View`
    width: 100%; 
    flex-direction:row;
    justify-content: space-between;
`;

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

export const SelectedButtonText = styled.Text`
    color: ${({ theme }) => theme.colorText};
    font-size: 18px;
`;