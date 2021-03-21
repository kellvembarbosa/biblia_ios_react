import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Card, Container, InputTextDefault, SafeContainer } from '../../../styles/globals'
import getRealm, { getSearchByKeyword } from '../../../services/realm';
import styled from 'styled-components/native';
import { useBible } from '../../../states/bible';
import { BIBLE_SCHEMA } from '../../../data/schema';


interface SearchProps {
    verses: any;
}

const SearchScreen = () => {
    const [results, setResults] = React.useState<SearchProps>({} as SearchProps);
    const [searchKey, setSearchKey] = React.useState('');

    const [bibliaObject, setBibliaObject] = React.useState<any>(null)

    const {
        setBookId,
        setChapterId,
        setVerseId,

        bookId,
        chapterId,
        verseId

    } = useBible();

    React.useEffect(() => {
        async function initData() {
            const realm = await getRealm();
            const BibleDB = realm.objects(BIBLE_SCHEMA);
            setBibliaObject(BibleDB[0])
        }
        initData()
    }, [])

    React.useEffect(() => {
        async function searchFilter() {
            if (bibliaObject) {
                // const result: SearchProps = await getSearchByKeyword(searchKey);
                // setResults(result);
                const books = bibliaObject.livro;
                const resultsFilter: any[] = [];
                const results = books.filter(function (booksList: any, bookId: number) {
                    return booksList.chapters.filter((chapters: any, chapterId: number) => {

                        return chapters.verses.filter((verses: any, verseId: number) => {
                            //return false; verses.verse.includes(searchKey)
                            if (verses.verse.includes(searchKey)) {
                                resultsFilter.push({
                                    name: books[bookId].name,
                                    bookId,
                                    chapterId,
                                    verseId,
                                    verses
                                })
                            }

                            return false;
                        })
                    });
                })

                console.log(resultsFilter);
                setResults({ verses: resultsFilter });
            }
        }
        const timer = () => setTimeout(() => {
            searchFilter();
        }, 2000)
        const timerId = timer();

        return () => {
            clearTimeout(timerId);
        }
    }, [searchKey])



    return (
        <SafeContainer>
            <Container>
                <InputTextDefault
                    value={searchKey}
                    onChangeText={value => setSearchKey(value)}
                    placeholderTextColor="gray"
                    placeholder='O que deseja procurar?' />

                <FlatList
                    data={results.verses}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }: { item: any, index: number }) => (
                        <>
                            <Title style={{ marginBottom: 4 }}>Livro: {item.name}</Title>

                            <Card key={index} style={{ marginBottom: 8 }}>
                                <Title>{item.verses.verse}</Title>
                            </Card>

                        </>)} />
            </Container>
        </SafeContainer>
    )
}


const Title = styled.Text`
    color: ${({ theme }) => theme.colorText};
`;


export default SearchScreen
