import styled from 'styled-components/native';


export const ContainerLogin = styled.View`
  margin: 8px;
  background-color: lightblue;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.cardColor}; 
  border-radius: 8px;
  padding: 12px 0;
  flex-direction: column;
  margin: 16px 4px;
  padding: 16px 4px;
  /* shadow-opacity: 0.25;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px; */
`;
export const ContainerBtns = styled.View`
  flex-direction: row;
  margin: 12px 0;
`;

// export const TextButtonLogin = styled.Text`
//     color: ${({ theme }) => theme.colorText};
//     text-align: center;
// `

// export const ButtonRegister = styled.TouchableOpacity`
//   color: ${({ theme }) => theme.colorText};
//   background-color: ${({ theme }) => theme.primaryColor};
//   padding: 8px; 
//   border: 1px solid ${({ theme }) => theme.primaryColor}; 
//   border-radius: 8px;
//   min-width: 100px;
//   margin-left: 12px;
// `;

export const TextButtonRegister = styled.Text`
    color: ${({ theme }) => theme.colorText};
    text-align: center;
`

export const Title = styled.Text`
    font-size: 22px;
    font-family: 'Roboto-Light';
    color: ${({ theme }) => theme.colorText};
`

export const TextNormal = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Light';
    color: ${({ theme }) => theme.colorText};
    text-align: center; 
`