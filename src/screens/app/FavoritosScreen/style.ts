import styled from 'styled-components/native';
import { ICardMark } from '../../../interfaces/types';
import { Card } from '../../../styles/globals';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
`;


export const CardBook = styled(Card)`
    flex: 1; 
    flex-direction: row; 
    justify-content: space-between;
    padding: 12px 0 12px 12px;
    align-items: center;
`

export const GenericContainer = styled.View`
  
`;


export const CardMark = styled(Card) <ICardMark>`
    flex: 1;
    flex-direction: row;
    margin-right: 8px;
    margin-bottom: 8px; 
    background-color: ${({ colorBg }) => colorBg};
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({ theme }) => theme.colorText};
    text-align: center;
    font-family: 'Roboto';
    margin-top: 4px;
`

export const TitleBook = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colorText};
    font-family: 'Roboto-Light';
`

export const TitleSection = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colorText};
    font-family: 'Roboto-Light';
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 4px;
`