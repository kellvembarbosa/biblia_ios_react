import { useParseQuery } from '@parse/react-native';
import React, { Suspense } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native';
import { versiculosFake } from '../../../../data/constants';
import { useSettings } from '../../../../states/setting';
import { Centered, SafeContainer } from '../../../../styles/globals';
import { Container } from '../../FavoritosScreen/style';
import { CardVersiculo, VersiculoText, Actions, VersiculoInfo, SocialCircle, Title } from '../style';
import { FontAwesome } from '@expo/vector-icons'
import i18n from 'i18n-js';
import { getVerseByIds } from '../../../../services/realm';
import LazyLoad from './LazyLoad';

export default function VersesList() {
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
        console.log("HomeScreen")
    }, [])


    const feed = Parse.Object.extend("Feed");
    const query = new Parse.Query(feed);

    const { results, isLoading } = useParseQuery(query, { enableLiveQuery: false });

    const { fontHomeSize } = useSettings();

    if (isLoading) {
        return (
            <Centered>
                <ActivityIndicator />
            </Centered>
        );
    }



    const renderItem = ({ item }: any) => {

        return (
            <CardVersiculo>
                <Suspense fallback={() => <ActivityIndicator />}>
                    <LazyLoad item={item} />
                </Suspense>
            </CardVersiculo>
        )
    }

    return (
        <SafeContainer>
            <Container>
                <FlatList
                    ListHeaderComponent={() => <Title>{i18n.t('VERSE_TITLE')}</Title>}
                    data={results}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} />
            </Container>
        </SafeContainer>
    )
}
