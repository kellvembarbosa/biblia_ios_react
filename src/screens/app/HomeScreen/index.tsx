import React, { useMemo } from 'react'
import { Actions, CardVersiculo, SocialCircle, Title, VersiculoInfo, VersiculoText } from './style'
import { SafeContainer, Container } from '../../../styles/globals'
import { versiculosFake } from '../../../data/constants'
import { FlatList, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { useSettings } from '../../../states/setting'
import i18n from 'i18n-js';
import { useParseQuery } from '@parse/react-native'
import VersesList from './components/VersesList'

const HomeScreen = () => {
    return (
        <SafeContainer>
            <Container>
                <VersesList />
            </Container>
        </SafeContainer>
    )
}

export default HomeScreen