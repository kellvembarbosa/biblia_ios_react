import React, { useState } from 'react'
import { createRef } from 'react';
import { SafeContainer, Container } from '../../../styles/globals'
import { Actions, IconLang, SelectedButton, SelectedButtonText } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useRecoilState } from 'recoil';
import { contentBottomSheetState, snapPointsState } from '../../../recoils/atoms';

const BibliaScreen = () => {
    const [Book, setBook] = useState('Gênesis')
    const [Chapter, setChapter] = useState(1)
    const [Verse, setVerse] = useState(1)
    const { colorText, cardColor } = useTheme();
    const [contentBottomSheet, setContentBottomSheet] = useRecoilState(contentBottomSheetState);
    const [snapPoints, setSnapPoints] = useRecoilState(snapPointsState);
    const sheetRef = React.useRef<BottomSheet>(null);

    const renderBottomSheet = () => (<View
        style={{
            backgroundColor: cardColor,
            padding: 16,
            height: 450,
        }}
    >
        <Text>Kellvem</Text>
    </View>)

    return (
        <>
            <SafeContainer>
                <Container>
                    <Actions>
                        <SelectedButton flex="8" onPress={() => {
                            setContentBottomSheet(
                                renderBottomSheet
                            )
                            setSnapPoints([400, 300, 0])
                            sheetRef.current!.snapTo(0)
                        }}>
                            <SelectedButtonText>{Book}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center">
                            <SelectedButtonText>{Chapter}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center">
                            <SelectedButtonText>{Verse}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center">
                            <IconLang name="language" color={colorText} />
                        </SelectedButton>
                    </Actions>
                </Container>
            </SafeContainer>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                borderRadius={10}
                renderContent={() => contentBottomSheet} />
        </>
    )
}

export default BibliaScreen
