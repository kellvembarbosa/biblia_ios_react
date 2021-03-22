import { useRoute } from '@react-navigation/native';
import React from 'react'
import { Text } from 'react-native'
import { IVerses } from '../../../../interfaces/types';
import { getItemsByColor } from '../../../../services/realm';
import { Centered, Container, SafeContainer } from '../../../../styles/globals'
import VerseRow from '../../BibliaScreen/components/VerseRow';
import i18n from 'i18n-js';
import { useTheme } from 'styled-components/native';

function MarkScreen() {
    const { colorText } = useTheme();
    const routes = useRoute();
    const [list, setList] = React.useState<IVerses[]>([])
    const [empty, setEmpty] = React.useState(false)
    // @ts-ignore
    const { colorBg } = routes.params;

    React.useEffect(() => {
        async function initData() {
            const listDB = await getItemsByColor(colorBg);
            // console.log('listDB', listDB);
            const listVerses: IVerses[] = listDB.map((item: any) => {
                return { verse: item.verse, marked: item.marked, favorite: item.favorite }
            });


            if (listVerses.length > 0)
                setList(listVerses);
            else
                setEmpty(true);
        }
        initData();
    }, [])

    const handlerRow = () => {

    }

    return (
        <SafeContainer>
            <Container>
                {empty ?
                    (
                        <Centered>
                            <Text style={{
                                color: colorText,
                                textAlign: 'center',
                            }}>{i18n.t('NO_FOUNDS_MARKEDS')}</Text>
                        </Centered>
                    )
                    :
                    list && list.length > 0 && list.map((verse, index) => <VerseRow key={index} item={verse} index={index} openSheet={handlerRow} />)
                }
            </Container>
        </SafeContainer >
    )
}

export default MarkScreen
