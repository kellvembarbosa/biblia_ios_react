import React from 'react'
import { BtnTextPrimary, ButtonPrimary, Card, Container, InputPasswordDefault, InputTextDefault, SafeContainer } from '../../../styles/globals'
import { ContainerRegister, Title } from './style'

function RegisterScreen() {
    return (
        <SafeContainer>
            <Container>
                <ContainerRegister>
                    {/* <Title>Prencha os dados para Login</Title> */}
                    <Card>
                        <InputTextDefault
                            placeholderTextColor="gray"
                            placeholder='Nome completo' />

                        <InputTextDefault
                            placeholderTextColor="gray"
                            placeholder='E-mail' />

                        <InputPasswordDefault
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            placeholder='Senha' />

                        <ButtonPrimary>
                            <BtnTextPrimary>
                                Registro
                            </BtnTextPrimary>
                        </ButtonPrimary>
                    </Card>
                </ContainerRegister>
            </Container>
        </SafeContainer>
    )
}

export default RegisterScreen
