import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Loading({ visible }) {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.modal}>
                <View style={styles.subView}>
                    <ActivityIndicator
                        size="large"
                        color={'green'}
                        animating={true}
                    />
                    <Text style={styles.message}>
                        Carregando..
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5,
        borderColor: 'transparent',
    },
    message: {
        width: 188,
        fontSize: 15,
        color: 'green',
        textAlign: 'center',
    },
    subView: {
        width: '50%',
        height: '20%',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#ffff',
        alignItems: "center",
        justifyContent: 'center',
    }
});
