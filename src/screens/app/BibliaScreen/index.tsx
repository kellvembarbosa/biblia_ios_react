import React, { useRef, useState } from 'react'
import { createRef } from 'react';
import { SafeContainer, Container } from '../../../styles/globals'
import { Actions, IconLang, SelectedButton, SelectedButtonText } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { contentBottomSheetState, defualtThemeState, snapPointsState } from '../../../recoils/atoms';
import ActionSheet from 'react-native-actions-sheet';
import { darkTheme, lightTheme } from '../../../styles/theme';
import { StatusBar } from 'expo-status-bar';

const BibliaScreen = () => {
    const [Book, setBook] = useState('Gênesis')
    const [Chapter, setChapter] = useState(1)
    const [Verse, setVerse] = useState(1)
    const { colorText, cardColor, backgroundColor, isDarkTheme } = useTheme();
    const [contentBottomSheet, setContentBottomSheet] = useRecoilState(contentBottomSheetState);
    const [snapPoints, setSnapPoints] = useRecoilState(snapPointsState);
    const [theme, setThemed] = useRecoilState(defualtThemeState);
    const actionSheetRef = createRef<ActionSheet>();


    let actionSheet;

    const renderBottomSheet = () => (<View
        style={{
            backgroundColor: cardColor,
            padding: 16,
            height: 450,
        }}
    >
        <Text>Kellvem</Text>
    </View>)

    // const onHasReachedTop = (hasReachedTop: any) => {
    //     if (hasReachedTop)
    //         scrollViewRef.current?.setNativeProps({
    //             scrollEnabled: hasReachedTop,
    //         });
    // };

    // React.useEffect(() => {
    //     addHasReachedTopListener(onHasReachedTop);
    //     return () => {
    //         removeHasReachedTopListener(onHasReachedTop);
    //     };
    // }, []);

    // const onClose = () => {
    //     scrollViewRef.current?.setNativeProps({
    //         scrollEnabled: false,
    //     });
    // };

    // const onOpen = () => {
    //     scrollViewRef.current?.setNativeProps({
    //         scrollEnabled: false,
    //     });
    // };

    return (
        <>
            <SafeContainer>
                <Container>
                    <Actions>
                        <SelectedButton flex="8" onPress={() => {
                            actionSheetRef.current?.setModalVisible();
                        }}
                        >
                            <SelectedButtonText>{Book}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center">
                            <SelectedButtonText>{Chapter}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center">
                            <SelectedButtonText>{Verse}</SelectedButtonText>
                        </SelectedButton>

                        <SelectedButton alignItems="center" onPress={() => {
                            setThemed(theme === darkTheme ? lightTheme : darkTheme);
                        }}>
                            <IconLang name="language" color={colorText} />
                        </SelectedButton>
                    </Actions>
                </Container>

                <ActionSheet
                    ref={actionSheetRef}
                    initialOffsetFromBottom={0.8}
                    statusBarTranslucent
                    bounceOnOpen={true}
                    bounciness={4}
                    indicatorColor={backgroundColor}
                    containerStyle={{ backgroundColor: cardColor }}
                    gestureEnabled={true}
                    defaultOverlayOpacity={0.8}
                >
                    <View style={{ height: 600 }}>
                        <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
                    </View>
                </ActionSheet>
            </SafeContainer>
        </>
    )
}

export default BibliaScreen
