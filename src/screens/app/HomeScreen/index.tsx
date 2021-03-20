import React, { useMemo } from 'react'
import { Actions, CardVersiculo, SocialCircle, Title, VersiculoInfo, VersiculoText } from './style'
import { SafeContainer, Container } from '../../../styles/globals'
import { versiculosFake } from '../../../data/constants'
import { FlatList, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { useSettings } from '../../../states/setting'
import i18n from 'i18n-js';

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

    const { fontHomeSize } = useSettings();

    const renderItem = ({ item }: any) => {
        return (
            <CardVersiculo>
                <VersiculoText fontSize={16} scaling={fontHomeSize()}>{item.versiculoTexto}</VersiculoText>
                <Actions>
                    <VersiculoInfo fontSize={22} scaling={fontHomeSize()}>
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
                    ListHeaderComponent={() => <Title>{i18n.t('VERSE_TITLE')}</Title>}
                    data={versiculosFake}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} />
            </Container>
        </SafeContainer>
    )
}

export default HomeScreen