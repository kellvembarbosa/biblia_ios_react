import React from 'react'
import { Actions, CardVersiculo, SocialCircle, Title, VersiculoInfo, VersiculoText } from './style'
import { SafeContainer, Container } from '../../../styles/globals'
import { versiculosFake } from '../../../data/constants'
import { FlatList, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
    const theme = useTheme();

    const renderItem = ({ item }: any) => {
        return (
            <CardVersiculo>
                <VersiculoText>{item.versiculoTexto}</VersiculoText>
                <Actions>
                    <VersiculoInfo>
                        {item.versiculoInfo}
                    </VersiculoInfo>

                    <View style={{ flexDirection: 'row', marginTop: 12 }}>
                        <SocialCircle color={theme.colorSocial.colorTelegram}>
                            <FontAwesome name="telegram" size={18} color={theme.colorText} />
                        </SocialCircle>
                        <SocialCircle color={theme.colorSocial.colorWhatsApp}>
                            <FontAwesome name="whatsapp" size={18} color={theme.colorText} />
                        </SocialCircle>
                        <SocialCircle color={theme.colorSocial.colorFacebook}>
                            <FontAwesome name="facebook" size={18} color={theme.colorText} />
                        </SocialCircle>
                        <SocialCircle color={theme.colorSocial.colorInstagram}>
                            <FontAwesome name="instagram" size={18} color={theme.colorText} />
                        </SocialCircle>
                    </View>
                </Actions>
            </CardVersiculo>
        )
    }
    return (
        <SafeContainer>
            <Container>
                <FlatList
                    ListHeaderComponent={() => <Title>Versiculos para reflexão</Title>}
                    data={versiculosFake}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} />

                <StatusBar style={theme.isDarkTheme ? "light" : "dark"} />
            </Container>
        </SafeContainer>
    )
}

export default HomeScreen