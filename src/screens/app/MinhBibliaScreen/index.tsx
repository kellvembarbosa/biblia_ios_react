import React, { Suspense } from 'react'
import { View, Switch, Text, Alert, Modal, TouchableHighlight, ActionSheetIOS, Button, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components/native';
import { SafeContainer } from '../../../styles/globals'
import { AddIcon, ContainerOption, LessIcon, OptionText, Title } from './style';
import { SettingsData, SettingsScreen } from '@taccolaa/react-native-settings-screen';
import { MaterialIcons } from '@expo/vector-icons';
import FontScaling from './components/FontScaling';
import { useSettings } from '../../../states/setting';
import { useMyTheme } from '../../../states/theme';
import { clearAllMarked } from '../../../services/realm';
import { useState } from '@hookstate/core';
import { updateMarkedState } from '../../../states/update';

const MinhBibliaScreen = () => {
    const { colorText, borderColor, backgroundColor, backgroundInput, isDarkTheme, cardColor } = useTheme();
    const setting = useSettings();
    const myTheme = useMyTheme();
    const UpdateMarked = useState(updateMarkedState)

    const settingsData: SettingsData = [
        {
            type: 'SECTION',
            header: 'Geral'.toUpperCase(),
            footer: 'Você pode alterar as opções a qualquer momento!',
            rows: [
                {
                    title: 'Termos e condições',
                    showDisclosureIndicator: true
                },

                {
                    title: 'Política de Privacidade',
                    showDisclosureIndicator: true
                },

                {
                    title: 'Limpar todas marcações',
                    showDisclosureIndicator: false,
                    renderAccessory: () => <Text style={{ color: 'gray' }} onPress={() => {
                        onPress()
                    }}>
                        Limpar
                    </Text>,
                },

                {
                    title: 'Notificações',
                    renderAccessory: () => <Switch value={setting.isNotifications()} onValueChange={() => setting.toggleNotification()} />,
                }
            ],
        },
        {
            type: 'SECTION',
            header: 'Design'.toUpperCase(),
            rows: [
                {
                    title: 'Modo escuro',
                    renderAccessory: () => <Switch value={isDarkTheme} onValueChange={() => myTheme.changeTheme()} />,
                }
            ],
        },
        {
            type: 'SECTION',
            header: 'Tipografia'.toUpperCase(),
            footer: 'Você pode aumentar em escala as fontes do app!',
            rows: [
                {
                    title: 'Página da bíblia',
                    renderAccessory: () => (
                        <Suspense fallback={() => <View />}>
                            <FontScaling
                                fontSize={setting.fontBibleSize()}
                                downSize={setting.downBibleSize}
                                upSize={setting.upBibleSize}
                            />
                        </Suspense>
                    ),
                },
                {
                    title: 'Página inicial',
                    renderAccessory: () => (
                        <Suspense fallback={() => <View />}>
                            <FontScaling
                                fontSize={setting.fontHomeSize()}
                                downSize={setting.downHomeSize}
                                upSize={setting.upHomeSize}
                            />
                        </Suspense>
                    ),
                }
            ],
        }
    ]

    const onPress = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancelar', 'Limpar'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            },
            async buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    await clearAllMarked()
                    UpdateMarked.set(u => u + 1)
                }
            }
        );


    return (
        <SafeContainer>
            <Title>Minha Bíblia </Title>
            <SettingsScreen
                data={settingsData}
                borderColor={borderColor}
                rowsStyle={{
                    backgroundColor: cardColor
                }}
                renderChevron={() => <MaterialIcons name="keyboard-arrow-right" size={26} style={{ marginRight: 8 }} color="gray" />}
                globalTextStyle={{
                    color: colorText,
                }}
                style={{
                    marginTop: 12,
                    backgroundColor: backgroundColor,
                }}
            />


        </SafeContainer>
    )
}

export default MinhBibliaScreen
