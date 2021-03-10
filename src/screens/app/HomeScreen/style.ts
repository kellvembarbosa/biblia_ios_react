import { ViewProps } from 'react-native';
import { ISocialicons } from 'src/interfaces/types';
import styled from 'styled-components/native';

export const CardVersiculo = styled.View`
  border-radius: 6px;
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.cardColor};
  margin-bottom: 8px;
`

export const Actions = styled.View`
  width: 100%;
  padding: 4px 0; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SocialCircle = styled.View<ISocialicons & ViewProps>`
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  min-width: 28px;
  background-color: ${({ color }) => color};
  margin: 4px;
  padding: 4px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colorText};
  font-size: 24px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: 700;

`

export const VersiculoText = styled.Text`
  color: ${({ theme }) => theme.colorText};
  text-align: center;
  font-size: 18px;
  font-weight: 300;
`

export const VersiculoInfo = styled.Text`
  color: ${({ theme }) => theme.colorText};
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
`