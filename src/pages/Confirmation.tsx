import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text, 
    View
} from 'react-native'
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){
    const navigation = useNavigation();

    function handleMoveOn(){
        navigation.navigate('PlantSelect');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😁
                </Text>

                <Text style={styles.title}>
                    Prontinho
                </Text>

                <Text style={styles.subtitle}>
                    Agora vamos cuidar das suas plantinhas com a dedicação que elas merecem!
                </Text>

                <View style={styles.footer}>
                    <Button
                        title="Começar"
                        onPress={handleMoveOn}/>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        padding: 30
    }, 
    emoji: {
        fontSize: 84,
        padding: 20
    }, 
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    }, 
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingHorizontal: 10,
        color: colors.heading
    }, 
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 50
    }
});