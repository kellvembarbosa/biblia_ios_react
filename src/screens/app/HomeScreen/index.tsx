import React, { useMemo } from 'react'
import { Actions, CardVersiculo, SocialCircle, Title, VersiculoInfo, VersiculoText } from './style'
import { SafeContainer, Container } from '../../../styles/globals'
import { versiculosFake } from '../../../data/constants'
import { FlatList, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

const HomeScreen = () => {
    const { colorText,
        isDarkTheme,
        colorSocial: {
            colorIcons,
            colorWhatsApp,
            colorTelegram,
            colorFacebook,
            colorInstagram
        }
    } = useTheme();

    React.useEffect(() => {
        console.log("HomeScreen")
    }, [])

    const renderItem = ({ item }: any) => {
        return (
            <CardVersiculo>
                <VersiculoText>{item.versiculoTexto}</VersiculoText>
                <Actions>
                    <VersiculoInfo>
                        {item.versiculoInfo}
                    </VersiculoInfo>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <SocialCircle color={colorTelegram}>
                            <FontAwesome name="telegram" size={18} color={colorIcons} />
                        </SocialCircle>
                        <SocialCircle color={colorWhatsApp}>
                            <FontAwesome name="whatsapp" size={18} color={colorIcons} />
                        </SocialCircle>
                        <SocialCircle color={colorFacebook}>
                            <FontAwesome name="facebook" size={18} color={colorIcons} />
                        </SocialCircle>
                        <SocialCircle color={colorInstagram}>
                            <FontAwesome name="instagram" size={18} color={colorIcons} />
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
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} />
            </Container>
        </SafeContainer>
    )
}

export default HomeScreen