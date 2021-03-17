import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { useTheme } from 'styled-components/native';
import { Card, BtnTextPrimary, ButtonPrimary, Container, InputPasswordDefault, InputTextDefault, SafeContainer } from '../../../styles/globals'
import { ContainerLogin, Title } from './style'

function LoginScreen() {
    return (
        <SafeContainer>
            <Container>
                <ContainerLogin>
                    {/* <Title>Prencha os dados para Login</Title> */}
                    <Card>

                        <InputTextDefault
                            placeholderTextColor="gray"
                            placeholder='E-mail' />

                        <InputPasswordDefault
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            placeholder='Senha' />

                        <ButtonPrimary>
                            <BtnTextPrimary>
                                Entrar
                            </BtnTextPrimary>
                        </ButtonPrimary>

                    </Card>
                </ContainerLogin>
            </Container>
        </SafeContainer>
    )
}

export default LoginScreen
