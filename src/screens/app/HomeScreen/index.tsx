import React from 'react'
import { SafeContainer, Container } from '../../../styles/globals'
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