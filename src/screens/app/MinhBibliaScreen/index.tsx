import React, { Suspense } from 'react'
import { View, Switch, Text, Alert, Modal, TouchableHighlight, ActionSheetIOS, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native';
import { Centered, SafeContainer } from '../../../styles/globals'
import { AddIcon, ContainerOption, LessIcon, OptionText, Title } from './style';
import { SettingsData, SettingsScreen } from '@taccolaa/react-native-settings-screen';
import { MaterialIcons } from '@expo/vector-icons';
import FontScaling from './components/FontScaling';
import { useSettings } from '../../../states/setting';
import { useMyTheme } from '../../../states/theme';
import getRealm, { clearAllMarked, deleteAllDB, getBibleVersion } from '../../../services/realm';
import { useState } from '@hookstate/core';
import { updateMarkedState } from '../../../states/update';
import i18n from 'i18n-js';
import { useParseQuery } from '@parse/react-native';
import { BIBLE_SCHEMA } from '../../../data/schema';
import { useBible } from '../../../states/bible';
import { CommonActions, useNavigation } from '@react-navigation/native';

const MinhBibliaScreen = () => {
    const { colorText, borderColor, backgroundColor, isDarkTheme, cardColor } = useTheme();
    const setting = useSettings();
    const bibleHook = useBible();
    const myTheme = useMyTheme();
    const navigation = useNavigation();
    const UpdateMarked = useState(updateMarkedState);
    const [bibleVersion, setBibleVersion] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false);

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
                    title: i18n.t('SETTINGS_VERSION_BIBLE'),
                    showDisclosureIndicator: false,
                    renderAccessory: () => <Text style={{ color: 'gray' }} onPress={() => {
                        changeVersion();
                    }}>
                        {/* {i18n.t('SETTINGS_CLEAR')} */}
                        {bibleVersion.toUpperCase()}
                    </Text>,
                }
                // ,

                // {
                //     title: i18n.t('SETTINGS_NOTIFICATIONS'),
                //     renderAccessory: () => <Switch value={setting.isNotifications()} onValueChange={() => setting.toggleNotification()} />,
                // }
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

    const changeVersion = () => {

        const listOptions = results!.map((item: any, index: number) => {
            return `${item.get('version')} - ${item.get('lang')}`.toUpperCase();
        });

        const options = [...listOptions, i18n.t('ACTIONS_CANCEL')];
        return ActionSheetIOS.showActionSheetWithOptions(

            {
                options: options,
                destructiveButtonIndex: options.length,
                cancelButtonIndex: options.length
            },

            async buttonIndex => {
                switch (buttonIndex) {
                    case options.length:
                        console.log('cancelar')
                        break;
                    default:
                        setModalVisible(true);
                        setBibleVersion(options[buttonIndex]);
                        await installNewVersion(options[buttonIndex]);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Biblia' }]
                        });
                        setTimeout(() => {
                            UpdateMarked.set(u => u + 1)
                        }, 500)
                        break;
                }
            }
        );
    }


    const bible = Parse.Object.extend("Biblia");
    const query = new Parse.Query(bible);

    const { results, isLoading } = useParseQuery(query, { enableLiveQuery: false });

    React.useEffect(() => {
        async function initData() {
            const bible = await getBibleVersion();
            setBibleVersion(`${bible.version} - ${bible.lang}`);
        }
        initData();
    }, [])

    async function installNewVersion(versionString: string) {

        const realm = await getRealm();
        const BibleDB = realm.objects(BIBLE_SCHEMA);

        const bibleNew = Parse.Object.extend("Biblia");
        const queryNew = new Parse.Query(bibleNew);

        const version = versionString.toLowerCase().split(' - ')
        await deleteAllDB();

        queryNew.equalTo('version', version[0]);
        queryNew.equalTo('lang', version[1]);
        console.log('installNewVersion', bibleVersion.toLowerCase(), 'version', version[0], 'lang', version[1]);

        if (BibleDB.length <= 0) {
            // const { results, isLoading } = useParseQuery(query, { enableLiveQuery: false });

            const response = await queryNew.first();

            // console.log(response);

            if (response) {
                try {
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

                    return true;
                } catch (error) {
                    console.log(error.messsage)
                }
            }
        }
    }


    return (
        <SafeContainer>
            <Title>{i18n.t('TAB_MYBIBLE_TITLE')} </Title>
            {isLoading ?
                <Centered>
                    <ActivityIndicator />
                </Centered>
                :
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
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={{ ...styles.centeredView, backgroundColor, opacity: 0.8 }}>
                    {/* <View style={{ ...styles.modalView, backgroundColor }}> */}

                    <ActivityIndicator />
                    {/* <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight> */}
                    {/* </View> */}
                </View>
            </Modal>
        </SafeContainer>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default MinhBibliaScreen
