import { TextProps, ViewProps } from 'react-native';
import { ITipography, ISocialicons } from '../../../interfaces/types';
import styled from 'styled-components/native';
import { getFontSize } from '../../../utils/fontsizes';

export const CardVersiculo = styled.View<ViewProps>`
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

export const Title = styled.Text<TextProps>`
  color: ${({ theme }) => theme.colorText};
  font-size: ${getFontSize(24)};
  margin-bottom: 12px;
  text-align: center;
  font-family: 'Roboto';
`

export const VersiculoText = styled.Text<ITipography & TextProps>`
  color: ${({ theme }) => theme.colorText};
  text-align: center;
  font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
  font-family: 'Roboto-Light';
  line-height: ${({ scaling }) => getFontSize(24, scaling)};
`

export const VersiculoInfo = styled.Text<ITipography & TextProps>`
  color: ${({ theme }) => theme.colorText};
  text-align: center;
  font-size: ${({ fontSize, scaling }) => getFontSize(fontSize, scaling)};
  font-weight: 800;
  font-style: italic;
  font-family: 'Roboto-BoldItalic';
`