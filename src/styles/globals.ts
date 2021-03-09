import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
`;

export const Container = styled.View`
  flex: 1;
  margin: 8px;
`