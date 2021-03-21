import React, { useEffect } from 'react'
import { createRef } from 'react';
import {
    SafeContainer,
    Container,
    ContainerSheet,
    CenteredContainer
} from '../../../styles/globals'
import {
    Actions,
    ArrowLeft,
    ArrowRight,
    ContainerArrows,
    ContainerBiblia,
    ContainerSelectBook,
    ContainerSelectChapter,
    IconLang,
    SelectButtonBook,
    SelectedButton,
    SelectedButtonText,
    SelectedVerse,
    Title,
    TitleVerseInfo
} from './style';
import { useTheme } from 'styled-components/native';
import {
    View,
    ActivityIndicator,
    FlatList,
    Text
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import VerseRow from './components/VerseRow';
import { VerseProps } from '../../../interfaces/types';
import getRealm, { addBookFavorite, setMarkedColorVerse } from '../../../services/realm';
import Parse from 'parse/react-native.js'
import { BIBLE_SCHEMA } from '../../../data/schema';
import {
    FontAwesome,
    FontAwesome5
} from '@expo/vector-icons';
import { data } from '../../../data/constants';
import { CardMark } from '../FavoritosScreen/style';
import { SocialCircle } from '../HomeScreen/style';
import { useState } from '@hookstate/core';
import { updateMarkedState } from '../../../states/update';
import i18n from 'i18n-js';
import { useParseQuery } from '@parse/react-native';
import { useBible } from '../../../states/bible';

const BibliaScreen = () => {
    const [bibliaObject, setBibliaObject] = React.useState<any>(null)


    // const [BookId, setBookId] = React.useState(0)
    // const [Chapter, setChapter] = React.useState<number>(0)
    // const [Verse, setVerse] = React.useState<number>(0)

    const {
        setBookId,
        setChapterId,
        setVerseId,
        setSelected,

        bookId,
        chapterId,
        verseId,
        selected

    } = useBible();


    // const [Selected, setSelected] = React.useState<any>()

    const {
        colorSocial: {
            colorIcons,
            colorWhatsApp,
            colorTelegram,
            colorFacebook,
            colorInstagram
        },
        colorText,
        cardColor,
        backgroundColor,
        isDarkTheme,
        markColors,
        primaryColor,
        colorFontBiblia
    } = useTheme();

    const actionSheetBookRef = createRef<ActionSheet>();
    const actionSheetChapterRef = createRef<ActionSheet>();
    const actionSheetVersesRef = createRef<ActionSheet>();
    const actionSheetVersiculoRef = createRef<ActionSheet>();
    const actionSheetVerseInfoRef = createRef<ActionSheet>();

    // const [reload, setReload] = React.useState(0);

    const [ShowModalChapter, setShowModalChapter] = React.useState(0);
    const [ShowModalVerse, setShowModalVerse] = React.useState(0);
    const UpdateMarked = useState(updateMarkedState)

    const renderVerses = ({ item, index }: VerseProps) => <VerseRow
        openSheet={() => {
            // console.log('itemString', { BookId, ChapterId: Chapter, VerseId: Verse, item });
            setSelected({ BookId: bookId(), ChapterId: chapterId(), VerseId: index, item: item });
            actionSheetVerseInfoRef.current!.setModalVisible();

        }}
        key={index}
        item={item}
        index={index} />


    const biblia = Parse.Object.extend("Biblia");
    const query = new Parse.Query(biblia);

    const { results, isLoading } = useParseQuery(query, { enableLiveQuery: false });

    useEffect(() => {
        async function initData() {
            const realm = await getRealm();
            console.log('biblia_ios', realm.schemaVersion);

            const BibleDB = realm.objects(BIBLE_SCHEMA);

            if (BibleDB.length <= 0) {

                console.log(results);
                if (results && results.length > 0) {
                    try {
                        const response = results[0];
                        // setBibliaObject(response);
                        // convert o json para o formato do schema
                        const livro = response!.get('livro').map((item: any) => {

                            const chapters = item.chapters.map((verses: any) => {
                                return { verses: verses.map((verse: any) => { return { verse } }) }
                            })

                            return {
                                name: item.name,
                                abbrev: item.abbrev,
                                chapters
                            };
                        })

                        // cria o objeto para ser inserido no banco de dados local
                        // @ts-ignore
                        const objectInsert = {
                            objectId: response!.id,
                            version: response!.get('version'),
                            lang: response!.get('lang'),
                            livro
                        }

                        let inserted
                        realm.write(() => {

                            // adicionar função de limpar antes de inserir...
                            // @ts-ignore
                            inserted = realm.create(BIBLE_SCHEMA, objectInsert);
                        });

                        setBibliaObject(objectInsert)

                        // setBook(bibliaObject.get('livro')[BookId].name)
                    } catch (error) {
                        console.log(error.messsage)
                    }
                }
            } else {
                setBibliaObject(BibleDB[0])
            }
        }
        initData()
    }, [results])

    let flatListRef: any

    const scrollToIndex = (position: number) => flatListRef.scrollToIndex({ animated: true, index: position })

    useEffect(() => {
        if (ShowModalChapter > 0) {
            setTimeout(() => actionSheetChapterRef.current?.show(), 250)
        }
    }, [ShowModalChapter])

    useEffect(() => {
        if (ShowModalVerse > 0) {
            setTimeout(() => actionSheetVersesRef.current?.show(), 250)
        }
    }, [ShowModalVerse])

    const handlerArrow = (
        action: string,
        books: number,
        chapters: number,
        verses: number) => {

        const CurrentBookId = bookId() + 1;
        const CurrentChapterId = chapterId() + 1;
        const CurrentVerseId = verseId() + 1;

        switch (action) {
            case 'next':
                // console.log('next', books, chapters, verses);
                if (CurrentChapterId < chapters) {
                    setVerseId(0)
                    setChapterId(chapterId() + 1)
                    scrollToIndex(0)
                } else if (CurrentBookId < books) {
                    setBookId(bookId() + 1)
                    setChapterId(0)
                    setVerseId(0)
                    scrollToIndex(0)
                }
                break;
            case 'previuos':
                // console.log('previuos', CurrentBookId, CurrentChapterId, CurrentVerseId);
                if (CurrentChapterId == 1 && CurrentBookId > 1) {
                    console.log('---', chapterId() - 1)
                    setVerseId(0)
                    setBookId(bookId() - 1)
                    setChapterId(bibliaObject.livro[bookId() - 1].chapters.length - 1)
                    scrollToIndex(0)
                } else if (CurrentChapterId > 1) {
                    setChapterId(chapterId() - 1)
                    setVerseId(0)
                    scrollToIndex(0)
                }
                break;
        }
    }

    const renderGridColor = ({ item, index }: any) => {
        // @ts-ignore
        const color = markColors[100 * (1 + index)];
        const selectedItem = selected();
        // console.log('selectedItem', JSON.parse());
        return (
            <CardMark
                colorBg={cardColor}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    // actionSheetVerseInfoRef.current!.hide();
                    console.log('selected().item', selectedItem)

                    setMarkedColorVerse(selectedItem, color);
                    setTimeout(() => UpdateMarked.set(u => u + 1), 150);
                }}>

                <View style={{
                    justifyContent: 'center', alignItems: 'center', height: 40, width: 40,
                    backgroundColor: color, borderRadius: 20,
                    borderWidth: selectedItem.item.marked == color ? 2 : 0,
                    borderColor: isDarkTheme ? colorText : primaryColor,
                }}>

                    {selectedItem.item.marked == color &&
                        <FontAwesome name={selectedItem.item.marked == color ? "check" : "check"} size={16} color={isDarkTheme ? colorText : 'white'} />
                    }
                </View>
            </CardMark>
        )
    }

    // const show = () => setTimeout(() => actionSheetChapterRef.current?.show(), 100)

    return (
        <SafeContainer>
            <Container>
                {!bibliaObject ?
                    <CenteredContainer>
                        <ActivityIndicator />
                    </CenteredContainer>
                    :
                    <>
                        <Actions>
                            <SelectedButton flex="8" onPress={() => {
                                actionSheetBookRef.current?.setModalVisible();
                            }}>
                                <SelectedButtonText>
                                    {bibliaObject.livro && bibliaObject.livro[bookId()].name}
                                </SelectedButtonText>
                            </SelectedButton>

                            <SelectedButton alignItems="center" style={{ marginLeft: 6 }} onPress={() => {
                                actionSheetChapterRef.current?.show();
                            }}>
                                <SelectedButtonText>
                                    {chapterId() + 1}
                                </SelectedButtonText>
                            </SelectedButton>

                            <SelectedButton alignItems="center" style={{ marginLeft: 6 }} onPress={() => {
                                actionSheetVersesRef.current?.setModalVisible();
                            }}>
                                <SelectedButtonText>{verseId() + 1}</SelectedButtonText>
                            </SelectedButton>

                            <SelectedButton alignItems="center" style={{ marginLeft: 6 }} onPress={() => { }}>
                                <IconLang name="search" color={colorText} />
                            </SelectedButton>
                        </Actions>

                        <ContainerBiblia>
                            {
                                bibliaObject.livro && <FlatList
                                    showsVerticalScrollIndicator={false}
                                    ref={(ref) => { flatListRef = ref; }}
                                    data={bibliaObject?.livro[bookId()].chapters[chapterId()].verses}
                                    renderItem={renderVerses}
                                    ListFooterComponent={<View>
                                        <Text style={{ color: backgroundColor }}>{UpdateMarked.get()}</Text>
                                    </View>}
                                    ListFooterComponentStyle={{ height: 80 }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            }
                        </ContainerBiblia>

                        <ContainerArrows>
                            <ArrowLeft hide={
                                bookId() == 0 && chapterId() == 0
                            } onPress={() => handlerArrow(
                                'previuos',
                                bibliaObject.livro.length,
                                bibliaObject.livro[bookId()].chapters.length,
                                bibliaObject.livro[bookId()].chapters[chapterId()].verses.length
                            )
                            }>
                                <FontAwesome5 name="arrow-left" size={24} color={colorText} />
                            </ArrowLeft>
                            <ArrowRight hide={
                                bibliaObject.livro.length == bookId() + 1 &&
                                bibliaObject.livro[bookId()].chapters.length == chapterId() + 1
                            } onPress={() => handlerArrow(
                                'next',
                                bibliaObject.livro.length,
                                bibliaObject.livro[bookId()].chapters.length,
                                bibliaObject.livro[bookId()].chapters[chapterId()].verses.length
                            )
                            }>
                                <FontAwesome5 name="arrow-right" size={24} color={colorText} />
                            </ArrowRight>
                        </ContainerArrows>
                    </>
                }

            </Container>

            <ActionSheet
                ref={actionSheetBookRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={6}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}

                defaultOverlayOpacity={0.5}>

                <ContainerSheet showsVerticalScrollIndicator={false} height="80%">
                    <Title style={{ paddingBottom: 12 }}>Selecione o livro: </Title>
                    {bibliaObject && bibliaObject.livro.map((item: any, index: number) => {
                        return (
                            <ContainerSelectBook
                                key={index}
                                isSelected={index == bookId()}
                                onPress={() => {
                                    setVerseId(0)
                                    setChapterId(0)
                                    setBookId(index)
                                    actionSheetBookRef.current?.hide();
                                    setShowModalChapter(ShowModalChapter + 1)
                                    scrollToIndex(0);
                                }}>

                                <SelectButtonBook>
                                    {item.name}
                                </SelectButtonBook>

                                <FontAwesome
                                    onPress={async () => {
                                        console.log('clicou em favoritos')
                                        await addBookFavorite(item)
                                        UpdateMarked.set(u => u + 1)
                                        Parse.Analytics.track('favoritou', `${item}`);
                                    }}
                                    name={item.favorite === 1 ? "star" : "star-o"}
                                    size={24}
                                    color={item.favorite === 1 ? primaryColor : colorText} />
                            </ContainerSelectBook>
                        )
                    })}
                </ContainerSheet>
            </ActionSheet>

            <ActionSheet
                ref={actionSheetChapterRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={4}
                bottomOffset={0}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.8}>

                <ContainerSheet showsVerticalScrollIndicator={false} height="auto">
                    <Title>Selecione o capítulo: </Title>
                    {bibliaObject && <FlatList
                        data={bibliaObject.livro[bookId()].chapters}
                        numColumns={6}
                        renderItem={({ item, index }) => {
                            return (
                                <ContainerSelectChapter
                                    key={index}
                                    isSelected={index == chapterId()}
                                    onPress={() => {
                                        setChapterId(index)
                                        setVerseId(0)
                                        scrollToIndex(0);
                                        actionSheetChapterRef.current?.hide();
                                        setShowModalVerse(ShowModalVerse + 1)
                                    }}>
                                    <SelectButtonBook>
                                        {index + 1}
                                    </SelectButtonBook>
                                </ContainerSelectChapter>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    }
                </ContainerSheet>
            </ActionSheet>

            <ActionSheet
                ref={actionSheetVersiculoRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={4}
                bottomOffset={0}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.8}>

                <ContainerSheet showsVerticalScrollIndicator={false} height="auto">
                    <Title>Selecione o versículo: </Title>
                    {bibliaObject && <FlatList
                        data={bibliaObject.livro[chapterId()].chapters[chapterId()].verses}
                        numColumns={6}
                        renderItem={({ item, index }) => (
                            <ContainerSelectChapter
                                key={index}
                                onPress={() => {
                                    setVerseId(index)
                                    scrollToIndex(index);
                                    actionSheetVersesRef.current?.hide();
                                }}>
                                <SelectButtonBook>
                                    {index + 1}
                                </SelectButtonBook>
                            </ContainerSelectChapter>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </ContainerSheet>
            </ActionSheet>

            <ActionSheet
                ref={actionSheetVersesRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={4}
                bottomOffset={0}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.8}>

                <ContainerSheet showsVerticalScrollIndicator={false} height="auto">
                    <Title>Selecione o versículo: </Title>
                    {bibliaObject && <FlatList
                        data={bibliaObject.livro[bookId()].chapters[chapterId()].verses}
                        numColumns={6}
                        renderItem={({ item, index }) => (
                            <ContainerSelectChapter
                                key={index}
                                onPress={() => {
                                    setVerseId(index)
                                    scrollToIndex(index);
                                    actionSheetVersesRef.current?.hide();
                                }}>
                                <SelectButtonBook>
                                    {index + 1}
                                </SelectButtonBook>
                            </ContainerSelectChapter>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </ContainerSheet>
            </ActionSheet>

            <ActionSheet
                ref={actionSheetVersesRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={4}
                bottomOffset={0}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.8}>

                <ContainerSheet showsVerticalScrollIndicator={false} height="auto">
                    <Title>Selecione o versículo: </Title>
                    {bibliaObject && <FlatList
                        data={bibliaObject.livro[bookId()].chapters[chapterId()].verses}
                        numColumns={6}
                        renderItem={({ item, index }) => (
                            <ContainerSelectChapter
                                key={index}
                                onPress={() => {
                                    setVerseId(index)
                                    scrollToIndex(index);
                                    actionSheetVersesRef.current?.hide();
                                }}>
                                <SelectButtonBook>
                                    {index + 1}
                                </SelectButtonBook>
                            </ContainerSelectChapter>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </ContainerSheet>
            </ActionSheet>

            <ActionSheet
                ref={actionSheetVerseInfoRef}
                initialOffsetFromBottom={1}
                statusBarTranslucent
                bounceOnOpen={true}
                bounciness={4}
                bottomOffset={0}
                indicatorColor={backgroundColor}
                containerStyle={{ backgroundColor: cardColor }}
                gestureEnabled={true}
                defaultOverlayOpacity={0.8}>
                <ContainerSheet showsVerticalScrollIndicator={false} height="auto">
                    {Object.keys(selected()).length > 0 && <SelectedVerse> {selected().item.verse} - {bibliaObject.livro[selected().BookId].name} {selected().ChapterId + 1}:{selected().VerseId + 1} </SelectedVerse>}

                    <TitleVerseInfo>{i18n.t('ACTIONS_SHARE')}</TitleVerseInfo>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
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

                    <TitleVerseInfo>{i18n.t('ACTIONS_SELECT_VERSE')}</TitleVerseInfo>
                    <FlatList
                        style={{ marginTop: 14 }}
                        data={data}
                        renderItem={renderGridColor}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()} />
                </ContainerSheet>
            </ActionSheet>
        </SafeContainer>
    )
}

export default BibliaScreen
