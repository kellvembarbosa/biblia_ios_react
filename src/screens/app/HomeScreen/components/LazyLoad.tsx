import React, { memo } from 'react'
import { View, Text } from 'react-native'
import { getVerseByIds } from '../../../../services/realm';
import { VersiculoText, Actions, VersiculoInfo, SocialCircle } from '../style';
import { FontAwesome } from '@expo/vector-icons'
import i18n from 'i18n-js';
import { useSettings } from '../../../../states/setting';
import { useTheme } from 'styled-components/native';

const LazyLoad = ({ item }: any) => {
    const [verse, setVerse] = React.useState<any>(null)
    const { fontHomeSize } = useSettings();

    const {
        colorText,
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
        async function InitData() {
            const verseLoad = await getVerseByIds(
                parseInt(item.get('bookId')),
                parseInt(item.get('chapterId')),
                parseInt(item.get('verseId'))
            );
            setVerse(verseLoad)
        }

        InitData();
    }, [])


    return verse && (
        <>
            <VersiculoText fontSize={16} scaling={fontHomeSize()}>{verse.verse.verse}</VersiculoText>
            <Actions>
                <VersiculoInfo fontSize={22} scaling={fontHomeSize()}>
                    {` ${verse.book.name} ${item.get('chapterId') + 1}:${item.get('verseId') + 1} `}
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
        </>
    )
}

export default memo(LazyLoad)
