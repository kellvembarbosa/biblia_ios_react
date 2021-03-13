import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { IContainerBottomSheet } from '../interfaces/types';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
`;

export const Container = styled.View`
  flex: 1;
  margin: 0px 8px;
`

export const ContainerSheet = styled.ScrollView<IContainerBottomSheet & ViewProps>`
    height: ${({ height }) => height};
    margin: 0 8px 18px 8px;
`

export const CenteredContainer = styled.View`
  flex: 1; 
  justify-content: center;
  align-items: center;
`