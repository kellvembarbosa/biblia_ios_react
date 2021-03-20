import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native'
import { IBooks, IVerses } from '../../../../interfaces/types';
import { getMarksByBook } from '../../../../services/realm';
import { Centered, ContainerScroll, SafeContainer } from '../../../../styles/globals'
import VerseRow from '../../BibliaScreen/components/VerseRow';

const BookScreen = () => {
    const [list, setList] = React.useState({} as IBooks)
    const [empty, setEmpty] = React.useState(false)
    const routes = useRoute();
    // @ts-ignore
    const { abbrev } = routes.params;

    React.useEffect(() => {
        async function initData() {
            const favoriteBooks = await getMarksByBook(abbrev);

            // @ts-ignore
            const result: IBooks = {
                // @ts-ignore
                name: favoriteBooks[0].name,
                // @ts-ignore
                abbrev: favoriteBooks[0].abbrev,
                // @ts-ignore
                chapters: favoriteBooks[0].chapters
            }

            const versesList: IVerses[] = []

            result.chapters.filter((chapter) => {
                chapter.verses.filter(item => {
                    if (item.marked.length > 0) {
                        versesList.push(item)
                        return true
                    } else
                        return false
                })
                return true;
            })

            if (versesList.length == 0) setEmpty(true)


            const resultFiltred: IBooks = {
                name: result.name,
                abbrev: result.abbrev,
                chapters: [{ verses: versesList }]
            }

            setList(resultFiltred)
        }
        initData();
    }, []);

    const handlerRow = () => {

    }

    return (
        <SafeContainer>
            {empty ?
                (
                    <Centered>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                        }}>Não foi encontrado versículos marcados neste livro!</Text>
                    </Centered>
                )
                :
                <ContainerScroll>
                    {list && list.chapters && list.chapters.length > 0 && list.chapters.map((chapters, index) => chapters.verses.map((verse, index) => {
                        return <VerseRow key={index} item={verse} index={index} openSheet={handlerRow} />;
                    }))}
                </ContainerScroll>
            }
        </SafeContainer>
    )
}

export default BookScreen
