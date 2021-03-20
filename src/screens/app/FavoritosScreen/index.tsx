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

function FavoritosScreen() {
    const { markColors, backgroundColor } = useTheme();
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
                                <TitleSection>Escolha um marcador para ver os versiculos marcados: </TitleSection>
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
                <TitleSection>Veja os livros favoritados: </TitleSection>
            </GenericContainer>
        )
    }

    return (
        <SafeContainer>
            <Container>
                <Title>Favoritos e Marcados</Title>
                <FlatList
                    ListHeaderComponent={() => <RenderHeader />}
                    data={listBooks}
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