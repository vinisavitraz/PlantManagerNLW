import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setFocus] = useState(false);
    const [isFilled, setFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();
    
    function handleInputBlur(){
        setFocus(false);
        setFilled(!!name);
    }
    function handleInputFocus(){
        setFocus(true);
    }
    function handleInputChange(value: string){
        setFilled(!!value);
        setName(value);
    }


    async function handleSubmit(){
        if(!name) return Alert.alert('Informe seu nome.');
            
        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: ' Agora vamos cuidar das suas plantinhas com a dedicação que elas merecem!',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch{
            Alert.alert('Não foi possível salvar seu nome.');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                { isFilled ? '😁' : '😃' }
                            </Text>
                            <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
                        </View>
                        <TextInput 
                            style={[
                                styles.input,
                                (isFocused || isFilled) && {borderColor: colors.green}
                            ]} 
                            placeholder="Digite seu nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}>
                        </TextInput>
                        <View style={styles.footer}>
                            <Button 
                                title="Confirmar"
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24, 
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
});