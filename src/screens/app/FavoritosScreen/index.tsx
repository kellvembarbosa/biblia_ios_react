import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useState } from '@hookstate/core';
import { SafeContainer, Container, Card } from '../../../styles/globals';
import styled, { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
function FavoritosScreen() {

    const { colorText, borderColor } = useTheme();
    const data = [
        {
            id: 1,
            colorBg: 'red'
        },
        {
            id: 2,
            colorBg: 'orange'
        },
        {
            id: 3,
            colorBg: 'yellow'
        },
        {
            id: 4,
            colorBg: 'green'
        },
        {
            id: 5,
            colorBg: 'lightblue'
        },
        {
            id: 6,
            colorBg: '#3F62F5'
        }
    ]

    const capData = [
        {
            id: 1,
            verseText: 'Teste',
            verseInfo: '22: 5'
        },
        {
            id: 2,
            verseText: 'Teste',
            verseInfo: '22: 5'
        },
        {
            id: 3,
            verseText: 'Teste',
            verseInfo: '22: 5'
        },
        {
            id: 4,
            verseText: 'Teste',
            verseInfo: '22: 5'
        }
    ]

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
                    renderItem={({ item }) => gridItem(item)}
                    keyExtractor={(item, index) => item.id.toString()}
                />
                <TitleSection>Veja os livros favoritados: </TitleSection>
            </GenericContainer>
        )
    }

    const renderItem = (item: any) => {

        return (
            <CardBook key={item.id}>
                <TitleBook>{item.verseText}</TitleBook>
                <MaterialIcons name="keyboard-arrow-right" size={26} style={{ marginRight: 8 }} color='GradleDynamicVersion' />
            </CardBook>
        )
    }


    const gridItem = (item: any) => {

        return (
            <CardMark key={item.id} colorBg={item.colorBg} />
        )
    }

    return (
        <SafeContainer>
            <Container>
                <Title>Favoritos e Marcados</Title>
                <FlatList
                    ListHeaderComponent={() => <RenderHeader />}
                    data={capData}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: 8 }} />}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </Container>
        </SafeContainer>
    )
}


export const GenericContainer = styled.View`
  
`;


interface ICardMark {
    colorBg: string;
}

export const CardBook = styled(Card)`
    flex: 1; 
    flex-direction: row; 
    justify-content: space-between;
`

export const CardMark = styled(Card) <ICardMark>`
    flex: 1;
    flex-direction: row;
    margin-right: 8px;
    margin-bottom: 8px; 
    background-color: ${({ colorBg }) => colorBg};
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({ theme }) => theme.colorText};
    text-align: center;
    font-family: 'Roboto';
    margin-top: 4px;
`

export const TitleBook = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colorText};
    font-family: 'Roboto-Light';
`

export const TitleSection = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.colorText};
    font-family: 'Roboto-Light';
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 4px;
`


// const FavoritosCount = () => {
//     const Favoritos = useState(FavoritosState);
//     return (
//         <Text style={{ color: 'white' }}>Numero de favoritos { Favoritos.get()} </Text>
//     )
// }

export default FavoritosScreen

