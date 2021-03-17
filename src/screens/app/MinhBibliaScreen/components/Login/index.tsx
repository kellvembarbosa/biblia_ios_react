import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { BtnTextPrimary, ButtonOutline, ButtonPrimary, Container, SafeContainer } from '../../../../../styles/globals'
import { ContainerBtns, ContainerLogin, TextButtonRegister, Title, TextNormal } from './style'

const Login = () => {
    const navigation = useNavigation();
    return (
        <ContainerLogin>
            <Title>
                Faça o Login ou Registro
            </Title>
            <ContainerBtns>

                <ButtonOutline onPress={() => {
                    navigation.navigate('Login');
                }} style={{ marginRight: 16 }}>
                    <BtnTextPrimary >
                        Login
                    </BtnTextPrimary>
                </ButtonOutline>

                <ButtonPrimary onPress={() => {
                    navigation.navigate('Register');
                }}>
                    <BtnTextPrimary>
                        Registrar
                    </BtnTextPrimary>
                </ButtonPrimary>

            </ContainerBtns>
            <TextNormal>
                Após o login/registro você terá acesso a mais opções e
                também manterá seus dados sincronizados em sua conta.
            </TextNormal>
        </ContainerLogin>
    )
}

export default Login
