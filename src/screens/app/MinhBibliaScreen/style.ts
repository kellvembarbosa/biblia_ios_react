import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Title = styled.Text`
  color: ${({ theme }) => theme.colorText};
  font-size: 24px;
  text-align: center;
  font-family: 'Roboto';
  margin-top: 12px;
`;

export const OptionText = styled.Text`
  color: #999;
  margin-right: 6px; 
  font-size: 18px;
`;

export const ContainerOption = styled.View`
  flex-direction: row;
`;

export const LessIcon = styled(MaterialIcons)`
  color: gray;
  font-size: 24px;
`;

export const AddIcon = styled(MaterialIcons)`
  color: gray;
  font-size: 24px;
`;