import { TextInputProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { IContainerBottomSheet } from '../interfaces/types';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
`;

export const Container = styled.View`
  flex: 1;
  margin: 8px 8px 0px 8px;
`;

export const ContainerScroll = styled.ScrollView`
  flex: 1;
  margin: 8px 8px 0px 8px;
`;
export const Centered = styled.View`
  flex: 1; 
  justify-content: center;
  align-items: center;
`

export const ContainerSheet = styled.ScrollView<IContainerBottomSheet & ViewProps>`
    height: ${({ height }) => height};
    margin: 0 8px 18px 8px;
`;

export const CenteredContainer = styled.View`
  flex: 1; 
  justify-content: center;
  align-items: center;
`;

export const ButtonPrimary = styled.TouchableOpacity`
  margin-top: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primaryColor};
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const BtnTextPrimary = styled.Text`
  color: ${({ theme }) => theme.colorText};
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const ButtonOutline = styled.TouchableOpacity`
  color: ${({ theme }) => theme.colorText};
  border: 1px solid gray;

  min-width: 100px;
  margin-top: 16px;
  border-radius: 6px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const InputTextDefault = styled.TextInput<TextInputProps>`
  color: ${({ theme }) => theme.colorText};
  border-width: 0px;
  padding: 14px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.backgroundInput};
`;

export const InputPasswordDefault = styled.TextInput<TextInputProps>`
  color: ${({ theme }) => theme.colorText};
  border-width: 0px;
  padding: 14px 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.backgroundInput};
`;

export const Card = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.cardColor};
  padding: 22px 16px;
  border-radius: 4px;
  width: 100%;
`;