import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeContainer, Container } from '../../../styles/globals';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import RenderRow from './components/RenderRow';
import { GenericContainer, TitleSection, Title, CardMark } from './style';
import GridItem from './components/GridItem';
import { capData, data } from '../../../data/constants';
import { getFavoriteBooks } from '../../../services/realm';
import { useState } from '@hookstate/core';
import { updateMarkedState } from '../../../states/update';
import i18n from 'i18n-js';

function FavoritosScreen() {
    const { markColors, backgroundColor, colorText } = useTheme();
    const navigation = useNavigation();
    const [listBooks, setListBooks] = React.useState<Realm.Results<any>>();
    const UpdateMarked = useState(updateMarkedState)

    React.useEffect(() => {
        async function initData() {
            const favoriteBooks = await getFavoriteBooks();
            setListBooks(favoriteBooks);
        }
        initData();
    }, [])

    const RenderHeader = () => {
        return (
            <GenericContainer>
                <FlatList
                    ListHeaderComponent={() => {
                        return (
                            <GenericContainer>
                                <TitleSection>{i18n.t('SUBTILE_SECTION_MARKEDS')} </TitleSection>
                            </GenericContainer>
                        )
                    }}
                    numColumns={3}
                    data={data}
                    renderItem={({ item }) => <GridItem
                        id={item.id}
                        colorBg={item.colorBg}
                        // @ts-ignore
                        nextScreen={() => navigation.navigate('MarkInterna', { colorBg: markColors[100 * item.id] })} />}
                    keyExtractor={(item, index) => item.id.toString()}
                />
                <TitleSection>{i18n.t('SUBTILE_SECTION_BOOKS')}</TitleSection>
            </GenericContainer>
        )
    }

    return (
        <SafeContainer>
            <Container>
                <Title>{i18n.t('PAGE_TITLE_FAVORITES')}</Title>
                <FlatList
                    ListHeaderComponent={() => <RenderHeader />}
                    data={listBooks}
                    ListEmptyComponent={() => <View>
                        <Text style={{
                            color: colorText,
                            textAlign: 'center',
                        }}>{i18n.t('NO_FOUNDS_BOOKS_FAV')}</Text>
                    </View>}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: 8 }} />}
                    renderItem={({ item }) => <RenderRow
                        bookName={item.name}
                        nextScreen={() => navigation.navigate('BookInterna', { bookName: item.name, abbrev: item.abbrev })} />}
                    keyExtractor={(item, index) => index.toString()} />

                <Text style={{
                    color: backgroundColor,
                    fontSize: 1
                }}>
                    b: {UpdateMarked.get()}
                </Text>
            </Container>
        </SafeContainer>
    )
}

export default FavoritosScreen