import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import userImg from '../assets/avatar_github.png'
import fonts from '../styles/fonts';


export function Header(){
    const [ userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStoredUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user ? user : '');
        }

        loadStoredUserName();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>
            <Image  
                style={styles.image} 
                source={userImg} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading, 
        fontFamily: fonts.text
    }, 
    userName: {
        fontSize: 32,
        color: colors.heading, 
        fontFamily: fonts.heading,
        lineHeight: 40
    }
});
