import { BlurView } from 'expo-blur';
import React from 'react'
import { View, Text, StyleSheet, PlatformColor } from 'react-native'
import Dialog from "react-native-dialog";
import { useTheme } from 'styled-components/native';

const DialogClear = ({ visible, cancel, action }: { visible: boolean, cancel: Function; action: Function }) => {
    const { backgroundColor, colorText, borderColor } = useTheme();

    return (
        <Dialog.Container visible={visible}
            // blurComponentIOS={blurComponentIOS}
            buttonSeparatorStyle={{
                backgroundColor: borderColor
            }}
            contentStyle={{
                backgroundColor: backgroundColor,
            }}
            headerStyle={{
                backgroundColor: backgroundColor,
            }}>
            <Dialog.Title style={{ color: colorText }}>Limpar marcações</Dialog.Title>
            <Dialog.Description style={{ color: colorText }}>
                Deseja limpar todos os versículos marcados?
                </Dialog.Description>
            <Dialog.Button label="Cancelar" onPress={() => cancel()} />
            <Dialog.Button label="Limpar" color='red' onPress={() => action()} />
        </Dialog.Container>
    );
}

export default DialogClear
