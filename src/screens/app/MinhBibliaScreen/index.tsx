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
import i18n from 'i18n-js';

const MinhBibliaScreen = () => {
    const { colorText, borderColor, backgroundColor, isDarkTheme, cardColor } = useTheme();
    const setting = useSettings();
    const myTheme = useMyTheme();
    const UpdateMarked = useState(updateMarkedState)

    const settingsData: SettingsData = [
        {
            type: 'SECTION',
            header: i18n.t('SETTINGS_GENERAL').toUpperCase(),
            footer: i18n.t('SETTINGS_FOOTER'),
            rows: [
                {
                    title: i18n.t('SETTINGS_TERMS'),
                    showDisclosureIndicator: true
                },

                {
                    title: i18n.t('SETTINGS_PRIVACY'),
                    showDisclosureIndicator: true
                },

                {
                    title: i18n.t('SETTINGS_CLEAR_MARKEDS'),
                    showDisclosureIndicator: false,
                    renderAccessory: () => <Text style={{ color: 'gray' }} onPress={() => {
                        onPress()
                    }}>
                        {i18n.t('SETTINGS_CLEAR')}
                    </Text>,
                },

                {
                    title: i18n.t('SETTINGS_NOTIFICATIONS'),
                    renderAccessory: () => <Switch value={setting.isNotifications()} onValueChange={() => setting.toggleNotification()} />,
                }
            ],
        },
        {
            type: 'SECTION',
            header: i18n.t('SETTINGS_DESIGN').toUpperCase(),
            rows: [
                {
                    title: i18n.t('SETTINGS_MODO_DARK'),
                    renderAccessory: () => <Switch value={isDarkTheme} onValueChange={() => myTheme.changeTheme()} />,
                }
            ],
        },
        {
            type: 'SECTION',
            header: i18n.t('SETTINGS_TIPOGRAFIA').toUpperCase(),
            footer: i18n.t('SETTINGS_FOOTER_RN'),
            rows: [
                {
                    title: i18n.t('SETTINGS_FT_BIBLE'),
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
                    title: i18n.t('SETTINGS_FT_HOME'),
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
                options: [i18n.t('ACTIONS_CANCEL'), i18n.t('ACTIONS_CLEAN')],
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
            <Title>{i18n.t('TAB_MYBIBLE_TITLE')} </Title>
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
