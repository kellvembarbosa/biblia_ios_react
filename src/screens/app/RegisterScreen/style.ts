import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';


export const Title = styled.Text`
  color: ${({ theme }) => theme.colorText};
  font-size: 18px;
  font-family: 'Roboto-Bold';
  text-align: center;
  margin-bottom: 16px;
`;

export const ContainerRegister = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

